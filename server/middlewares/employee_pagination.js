function createCriteria(type, input) {
  if (type === "employee") {
    return input === ""
      ? {}
      : {
          $or: [
            {
              name: { $regex: `^${input.toLowerCase().trim()}`, $options: "i" }
            },
            {
              role: { $regex: `^${input.toLowerCase().trim()}`, $options: "i" }
            }
          ]
        };
  }

  if (type === "project") {
    return input === ""
      ? {}
      : {
          $or: [
            {
              projectName: {
                $regex: `^${input.toLowerCase().trim()}`,
                $options: "i"
              }
            }
          ]
        };
  }
}

function Paginator(model, type) {
  return async (req, res, next) => {
    const input = req.query.searchInput || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || -1;
    const columns = req.query.columns;
    const sort = req.query.sort;
    const isSortDecreasing = parseInt(req.query.isSortDecreasing);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const criteria = createCriteria(type, input);

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
        .find(criteria, { [columns]: 0 })
        .sort({ [sort]: isSortDecreasing })
        .limit(limit !== -1 && limit )
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

module.exports = Paginator;
