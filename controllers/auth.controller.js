var md5 = require('md5');
var User = require('../models/user.model');

module.exports.login = function (req, res) {
  res.render('auth/login');
};

module.exports.postLogin = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne({ email: email });

  var errors = {};

  if (!email) {
    errors.email = 'Vui long nhap dia chi email';
    res.render('auth/login', {
      errors: errors,
    });
    return;
  }

  if (!user) {
    errors.email = 'Dia chi email khong hop le';
    res.render('auth/login', {
      errors: errors,
      email: email,
    });
    return;
  }

  if (!password) {
    errors.password = 'Vui long nhap password';
    console.log(errors.hasOwnProperty('email'));
    res.render('auth/login', {
      errors: errors,
      email: email,
    });
    return;
  }

  var hashedPassword = md5(password);
  if (user.password !== hashedPassword) {
    errors.password = 'Password khong hop le';
    res.render('auth/login', {
      errors: errors,
      email: email,
    });
    return;
  }
  res.cookie('userId', user.id, {
    signed: true,
  });
  res.redirect('/users');
};
