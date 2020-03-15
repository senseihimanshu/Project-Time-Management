function Paginator(model) {
    return async(req, res, next) => {
  console.log(req.query, 'Abha Rana');
  if(req.query['empId']){
    req.paginatedResults = await model.find();
    next();
    return;
  }
      
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
          results.results = await model.find({},{}).sort({ name: (JSON.parse(req.query.desc) ? 1 : -1) }).limit(limit).skip(startIndex);
         
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
  