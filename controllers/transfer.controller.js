var shortid = require('shortid');
// var db = require('../db');
var Transfer = require('../models/transfer.model');

module.exports.create = function (req, res, next) {
  res.render('transfer/create', {
    csrfToken: req.csrfToken(),
  });
};

module.exports.postCreate = async function (req, res, next) {
  var data = {
    id: shortid.generate(),
    amount: parseInt(req.body.amount),
    accountId: req.body.accountId,
    userId: req.signedCookies.userId,
  };

  // db.get('transfers').push(data).write();
  await Transfer.insertMany([data]);
  res.redirect('/transfer/create');
};
