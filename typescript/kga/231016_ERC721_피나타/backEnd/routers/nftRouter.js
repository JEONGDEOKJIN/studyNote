const router = require("express").Router();

const { ipfsHashUpdate } = require("../controllers/nftController")

router.post("/ipfsHashUpdate" , ipfsHashUpdate)   
    // post 이 맞나? 
    // 왜 post 지? 

module.exports = router;