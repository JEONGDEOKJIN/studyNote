// exports.ipfsHashUpdate = async (req, res) => {
//   const fs = require("fs");
//   const path = require("path");

//   try {
//     console.log("req.body.ipfsHash", req.body);
//     console.log("req.body.ipfsHash", req.body.IpfsHash);

//     // 1️⃣ 이미지 json 처리
//         // 이미지 json 파일경로
//         const pathToImgJson = path.join(
//         __dirname,
//         "..",
//         "..",
//         "front",
//         "src",
//         "NFTjson",
//         "DJNFT_image2.json"  // ✅ image 파일 수정
//         );

//         // 해당 json 파일 읽기
//         const imageJson = JSON.parse(fs.readFileSync(pathToImgJson, "utf8"));

//         // 해당 json 파일의 image 키 에 hash 값 넣기
//         imageJson.image = `https://coffee-managing-crow-891.mypinata.cloud/ipfs/${req.body.IpfsHash}`;

//     // 2️⃣ metadata json 처리
//             // 변경된 내용 저장
//             fs.writeFileSync(pathToImgJson, JSON.stringify(imageJson, null, 2));
//             console.log(imageJson);
//     // 프론트 response
//     res.status(200).send({
//       success: true,
//       message:
//         "해당 IPFS hash값이, NFT json 파일의 image 키값에, 업데이트 성공",
//       updatedData: imageJson, // 변경된 json 바로 프론트에 전달
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.updateABI = async (req, res) => {
  // artifacts 폴더 > MyNFT_metadata.json 의 abi키의 값을 > src abi myNFT.json 으로 옮기기
  const fs = require("fs").promises; // FileSystem 모듈을 비동기로 사용하기 위해 promises를 사용합니다.

  // ABI 값을 복사하는 함수

  try {
    // MyNFT_metadata.json 파일 읽기
    const metadataContent = await fs.readFile(
      "./../artifacts/MyNFT_metadata.json",
      "utf-8"
    );
    const metadata = JSON.parse(metadataContent);

    // src > abi > myNFT.json 파일 읽기
    const abiContent = await fs.readFile(
      "./../front/src/abi/myNFT.json",
      "utf-8"
    );
    const abiFile = JSON.parse(abiContent);

    // abi 값을 가져와서 복사하기 | ✅ 여기에 있는 abiFile 정확한지!!!
    if (metadata && metadata.output && metadata.output.abi)
      abiFile.abi = metadata.output.abi;

    // 수정된 내용을 다시 src abi myNFT.json 파일로 쓰기
    await fs.writeFile(
      "./../front/src/abi/myNFT.json",
      JSON.stringify(abiFile, null, 2)
    );

    console.log("ABI 값을 복사 성공 | @updateABI");

    res.status(200).send({
      success: true,
      message: "ABI 값이 성공적으로 복사되었습니다",
      //   updatedData : abiFile
    });
  } catch (error) {
    console.error("ABI 값을 복사하는 데 실패했습니다.", error);
  }
};

exports.saveMetaDataJSON = async (req, res) => {
  const fs = require("fs");
  const path = require("path");

  try {

    // // 🔹 ranking 데이터 가져오기 
    // console.log("loginUserAccount" , req.body.loginUserAccount)
    // const getOwnerTokenMetaData = async (loginUserAccount , contract) => {


    //   try {

    //     console.log("🐣🐣loginUserAccount" , loginUserAccount)
    //     console.log("🙆‍♂️🙆‍♂️" , contract)
    //     if (loginUserAccount && contract && contract.methods) {
    //       const ownersMetaData = await contract.methods
    //         .getOwnerTokenMetaData(loginUserAccount)
    //         .call();
    //       console.log("✍✍current 지갑 주소의 메타데이터(URIs) ownersMetaData", ownersMetaData);
          
    //       if(ownersMetaData) {
    //         const latestToken = ownersMetaData[ownersMetaData.length -1]
    //         console.log( "latestToken.metaData.ranking" , latestToken.metaData.ranking) 
            
    //         return latestToken.metaData.ranking
    //       }
    //     }
        
    //   } catch (error) {
    //     console.log(error)
    //   }
    // };
    // await getOwnerTokenMetaData(req.body.loginUserAccount , req.body.contract)


    
    // 1️⃣ image json 처리
          console.log("req.body.ipfsHash", req.body);
          console.log("req.body.ipfsHash", req.body.IpfsHash);
      
      // 해당 경로에 가서 파일 들고오기
      const pathToImgJson = path.join(
        __dirname, "..", "..", "front", "src", "NFTjson",
        "DJNFT_image2.json" // ✅ image 파일 수정
      );
      console.log("pathToImgJson", pathToImgJson);

      // 해당 json 파일 읽기
      const imageJson = JSON.parse(fs.readFileSync(pathToImgJson, "utf8"));
      console.log("imageJson", imageJson);

      // 해당 json 파일의 image 키 에 hash 값 넣기
        // imageJson.image = `https://coffee-managing-crow-891.mypinata.cloud/ipfs/${req.body.IpfsHash}`
      console.log("req.body.IpfsHash", req.body.IpfsHash);
      imageJson.image = `${req.body.IpfsHash}`;
      

      // 변경된 내용 저장 | 이미지를 DJNFT_image.json 에 저장
      fs.writeFileSync(pathToImgJson, JSON.stringify(imageJson, null, 2));
      console.log("해당 json 파일의 image 키 에 hash 값 넣기", imageJson);


    // 2️⃣ metadata Json 처리
      // 해당 경로에 가서 파일 들고오기
      const pathToMetadata = path.join(
        __dirname, "..", "..","front", "src",
        "NFTjson",
        "DJNFT_metadata3.json" // ✅ metadata 파일 수정
      );

      // metaData.json 파일 읽기
      const metadataJson = JSON.parse(fs.readFileSync(pathToMetadata, "utf8"));
      console.log("metadataJson 읽기", metadataJson);

      // pinataMetadata 키의 값인 하위 객체의 key 값인 name에 DJNFT_image.json 내용 저장
        if (metadataJson.pinataMetadata) {
          // 피나타 api 에 따라, imageJson 의 파일 이름을 저장 ✅ | https://docs.pinata.cloud/reference/post_pinning-pinjsontoipfs
          metadataJson.pinataContent.image = `https://ipfs.io/ipfs/${imageJson.image}`;
          metadataJson.pinataContent.description = `${req.body.description}`;
          metadataJson.pinataContent.ranking = `${req.body.ranking}`; // ❓❓❓ solidity pure 에서 어떻게? 
          metadataJson.pinataMetadata.name = "DJNFT_metadata1020.json"; // ✅ image 파일 수정
          // metadataJson.pinataOptions.cidVersion = 1; // [📛주의] cidVersion = 1 이면, openSea 에서 처리를 안 해줌. ⭐⭐


        // DJNFT_metadata.json 에 변경된 내용 저장
        await fs.writeFileSync(
          pathToMetadata,
          JSON.stringify(metadataJson, null, 2)
        );
        console.log(" DJNFT_metadata.json 에 변경된 내용 저장 ", metadataJson);
      }

    // 3️⃣ 프론트 response
    res.status(200).send({
      success: true,
      message:
        "해당 IPFS hash값이, NFT json 파일의 image 키값에, 업데이트 성공",
      updatedData: metadataJson, // 변경된 json 바로 프론트에 전달
    });
  } catch (error) {
    console.log(error);
  }
};
