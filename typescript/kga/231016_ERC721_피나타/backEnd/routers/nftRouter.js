const router = require("express").Router();

const { ipfsHashUpdate } = require("../controllers/nftController")
const { saveMetaDataJSON } = require("../controllers/nftController")
const { updateABI } = require("../controllers/nftController")


// router.post("/ipfsHashUpdate" , ipfsHashUpdate)   
// post 이 맞나? 
// 왜 post 지? 
router.post("/saveMetaDataJSON" , saveMetaDataJSON)   


router.get("/updateABI" , updateABI)   



module.exports = router;