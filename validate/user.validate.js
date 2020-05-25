module.exports.postCreate = function (req, res, next) {
  var errors = {};
  if (!req.body.name) {
    errors.name = 'Name is required.';
  }
  if (!req.body.phone) {
    errors.phone = 'Phone is required.';
  }
  if (Object.keys(errors).length > 0) {
    res.render('users/create', {
      errors: errors,
      valuesInput: req.body,
    });
  }
  next();
};
