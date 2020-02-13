module.exports = options => {
  const inflection = require('inflection');
  return async (req, res, next) => {
    const modelName = inflection.classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
