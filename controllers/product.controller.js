// var db = require('../db');
var Product = require('../models/product.model');
module.exports.index = async function (req, res) {
  //---------- lowdb -----------
  // var page = parseInt(req.query.page) || 1;
  // var perPage = 8;
  // var start = (page - 1) * perPage;
  // var end = perPage * page;
  // var limitPage = 3;
  // var amountOfPage = Math.ceil(db.get('products').value().length / 8);
  // var arrPage = [];
  // for (var i = 1; i <= amountOfPage; i++) {
  //   arrPage.push(i);
  // }
  // var pageLoad = arrPage.slice(
  //   page - 2 >= 0 ? page - 2 : page - 1,
  //   page + limitPage - 1
  // );
  // res.render('products/index', {
  //   products: db.get('products').value().slice(start, end),
  //   pageLoad: pageLoad,
  // });

  var products = await Product.find();
  res.render('products/index', {
    products: products,
  });
};
