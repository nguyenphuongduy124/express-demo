// var db = require('../db');
var User = require('../models/user.model');

module.exports.requiredAuth = async function (req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect('/auth/login');
    return;
  }

  // var user = db.get('users').find({ id: req.signedCookies.userId }).value();
  var user = await User.findById(req.signedCookies.userId);

  if (!user) {
    res.redirect('/auth/login');
    return;
  }

  res.locals.user = user;

  next();
};
