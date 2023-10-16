const loginRouter = require("./loginRouter")
const { itemUpload } = require("../controllers/itemUploadController")


router.post("/upload" , itemUpload);


module.exports = { loginRouter }