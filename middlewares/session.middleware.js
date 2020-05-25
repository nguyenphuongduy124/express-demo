var shortid = require('shortid');
var db = require('../db');
var Session = require('../models/session.model');
module.exports = async function (req, res, next) {
  if (!req.signedCookies.sessionId) {
    var id = shortid.generate();
    res.cookie('sessionId', id, {
      signed: true,
    });
    // db.get('sessions')
    //   .push({
    //     id: id,
    //   })
    //   .write();
    Session.insertMany([{ id: id }]);
  } else {
    // check cart' exist;
    var sessionId = req.signedCookies.sessionId;
    var cart = db
      .get('sessions')
      .find({ id: sessionId })
      .get('cart', 0)
      .value();
    if (cart === 0) {
      res.locals.cart = cart;
    } else {
      var totalItem = Object.values(cart).reduce(function (a, b) {
        return a + b;
      }, 0);
      res.locals.cart = totalItem;
    }
  }

  next();
};
