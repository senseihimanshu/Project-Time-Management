function paginator(model) {
  return async (req, res, next) => {
    console.log(req.query, '---------');
    const criteria = JSON.parse(req.query.criteria);
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit);
    const columns = JSON.parse(req.query.columns);
    const sort = JSON.parse(req.query.sort);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const dataSize = await model.find(criteria).count({});

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

    try {
      results.results = await model
        .find(criteria, columns)
        .sort(sort)
        .limit(limit === -1 ? dataSize : limit)
        .skip(startIndex);

      req.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).send({
        success: false,
        payload: {
          message: e.message
        }
      });
    }
  };
}

module.exports = paginator;
