var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
var upload = multer({ storage: storage });

var validate = require('../validate/user.validate');
var userController = require('../controllers/user.controller');

router.get('/', userController.index);
router.get('/cookie', function (req, res, next) {
  res.cookie('user-id', 12345);
  res.send('cookie page');
});

router.get('/search', userController.search);

router.get('/create', userController.create);

router.get('/:id', userController.getUser);
// POST METHOD
router.post(
  '/create',
  upload.single('avatar'),
  validate.postCreate,
  userController.postCreate
);

module.exports = router;
