function Paginator(model) {
    console.log("in emp  paginator")
      return async(req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const results = {};
    
        const dataSize = await model.find({},{}).count({});
    
        if (endIndex < dataSize) {
          results.next = {
            page: page + 1,
            limit: limit
          };
        }
    
        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit
          };
        }
    
        results.dataSize = dataSize;
    
        try{
            //Now has become specific to only timesheetAPI
            //In future try to remember that the criteria must be a key from request!!!!!!!
            console.log(req.query.desc);
            results.results = await model.find({},{}).sort({ projectName: (JSON.parse(req.query.desc) ? 1 : -1) }).limit(limit).skip(startIndex);
            console.log(results);
            req.paginatedResults = results;
            next();
        } catch(e){
            res.status(500).send({
                success: false,
                payload: {
                    message: e.message
                }
            });
        }
      };
    }
    
    module.exports = Paginator;
    