



exports.ipfsHashUpdate = async (req, res) => {

    const fs = require("fs")
    const path = require("path")


    try {
        console.log("req.body.ipfsHash" , req.body)
        console.log("req.body.ipfsHash" , req.body.IpfsHash)


        path.join(__dirname , 'NFTjson' , 'DJ_NFT.json')



    } catch (error) {
        console.log(error)
    }
}

