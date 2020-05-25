var mongoose = require('mongoose');
var transferSchema = new mongoose.Schema({
  accountId: String,
  userId: String,
  amount: Number,
});

var Transfer = mongoose.model('Transfer', transferSchema, 'transfers');

module.exports = Transfer;
