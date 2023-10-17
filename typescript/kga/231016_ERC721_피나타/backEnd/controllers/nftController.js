



exports.ipfsHashUpdate = async (req, res) => {

    const fs = require("fs")
    const path = require("path")

    try {
        console.log("req.body.ipfsHash" , req.body);
        console.log("req.body.ipfsHash" , req.body.IpfsHash);

        // NFT json 파일경로 
        const pathToJson = path.join(__dirname, '..', '..', 'front', 'src', 'NFTjson', 'DJ_NFT.json');

        // 해당 json 파일 읽기 
        const targetJsonData = JSON.parse(fs.readFileSync(pathToJson, 'utf8'));
        
        // 해당 json 파일의 image 키 에 hash 값 넣기
        targetJsonData.image = `https://coffee-managing-crow-891.mypinata.cloud/ipfs/${req.body.IpfsHash}`
        
        // 변경된 내용 저장 
        fs.writeFileSync(pathToJson, JSON.stringify(targetJsonData, null, 2));
        console.log(targetJsonData)
        // 프론트 response 
        res.status(200).send({ 
            success: true, 
            message: '해당 IPFS hash값이, NFT json 파일의 image 키값에, 업데이트 성공',
            updatedData : targetJsonData,       // 변경된 json 바로 프론트에 전달
        });


    } catch (error) {
        console.log(error)
    }
}

