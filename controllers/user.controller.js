var shortid = require('shortid');
var db = require('../db');
var User = require('../models/user.model');

module.exports.index = async function (req, res) {
  res.render('users/index', {
    // users: db.get('users').value(),
    users: await User.find(),
  });
};

module.exports.search = async function (req, res) {
  var q = req.query.q;
  var matchedUsers = await User.find({ name: { $regex: q, $options: 'i' } });
  res.render('users/index', {
    users: matchedUsers,
  });
};

module.exports.create = function (req, res) {
  console.log(req.cookies);
  res.render('users/create');
};

module.exports.getUser = async function (req, res) {
  var id = req.params.id;
  var user = await User.findById(id);
  res.render('users/view', {
    user: user,
  });
};

module.exports.postCreate = async function (req, res) {
  req.body.avatar = req.file.path.split('/').slice(1).join('/');
  req.body.id = shortid.generate();
  await User.insertMany(req.body);
  res.redirect('/users');
};
