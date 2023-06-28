const router = require("express").Router();
const {isLogin} = require("../middleware/login");
const {borderMain} = require('../controllers/borderController');

router.get('/',isLogin,borderMain);

module.exports = router;