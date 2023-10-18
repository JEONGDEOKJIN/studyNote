import { useEffect, useState } from "react";
import axios from "axios";

import abi from "./abi/myNFT.json"; // ✅ 배포 후, artifacts 안에 있는 metadata 파일의 abi 의 [] 값만! 가져와서 붙어야 함

import useWeb3 from "./hooks/web3.hook";

const App = () => {
  const [tempCA, setTempCA] = useState(
    "0x6888769AE309e725fA4bE5A0CDd72B26934D9Ec1"
  ); // ✅ CA 하드코딩
  // ✅ 추가로, abi 하드 코딩 하다가 -> udataABI 기능을 NFT controller 에 만듦

  const [file, setFile] = useState(null);

  const { user, web3 } = useWeb3();
  const [contract, setContract] = useState(null);
  const [hash, setHash] = useState(null);
  const [test, setTest] = useState(null);

  // abi 업데이트
  useEffect(() => {
    updateABI();
  }, [tempCA]);

  // abi 업데이트
  const updateABI = async () => {
    const response = await axios.get("http://localhost:7000/nft/updateABI", {
      withCredentials: true,
    });
    console.log("abi 업데이트", response);
  };

  // contract 상태변수 저장(set) 하기
  useEffect(() => {
    if (web3 != null) {
      if (contract) return;

      const DJ_NFT = new web3.eth.Contract(
        abi,
        tempCA, // ✅ 배포된 CA 주소
        { data: "" }
      );

      setContract(DJ_NFT);
    }
  }, [web3]);

  // 이미지 파일 보내고 -> 이미지에 대한 jsonHash 값 받기
  const saveImageJSON = async (imageJSON) => {
    try {
      console.log("imageHash", imageJSON.data.IpfsHash);

      const formData = { IpfsHash: imageJSON.data.IpfsHash };
      console.log("formData", formData);

      // 이미지 파일 보내고 -> 이미지에 대한 jsonHash 값 받기
      const _metadataJson = await axios.post(
        // "http://localhost:7000/nft/ipfsHashUpdate",
        "http://localhost:7000/nft/saveImageJSON",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("imageHash🙌🙌", _metadataJson.data.updatedData);

      _metadataJson.data.success
        ? alert("이미지 파일 해시를, NFT json 에 저장 성공")
        : alert("이미지 파일 해시를, NFT json 에 저장 실패");

      const metadataJson = _metadataJson.data.updatedData;

      return metadataJson;
    } catch (error) {
      console.log(error);
    }
  };

  // 메타데이터를 피나타로 전송
  const sendMetadataToPinata = async (metaDataJson) => {
    try {
      console.log("metaDataJson 🙌🙌", metaDataJson);
      console.log("💎💎" , typeof(metaDataJson))
      
      // const strMetadataJson = JSON.stringify(metaDataJson);
      // console.log("strMetadataJson⭐⭐", strMetadataJson);
      
      // const parsedMetadataJson = JSON.parse(strMetadataJson);
      console.log("parsedMetadataJson 🙌🙌", metaDataJson);
      // console.log("💎💎" , typeof(parsedMetadataJson))


      const _metadataHash = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metaDataJson, // #❓ 이걸 바로 넘겨도 되나?
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: "3fa874b39e5e7eaf8ec5",
            pinata_secret_api_key:
              "48546889d754d9dabdf61a749d0b89b54aef072d51892041ce57afd10e5be902",
          },
        }
      );
      console.log("_metadataHash", _metadataHash);
      const metadataHash = _metadataHash.data.IpfsHash;

      return metadataHash;
    } catch (error) {
      console.log(error);
    }
  };

  const minting = async (metadataHash) => {
    console.log("@minting | metadataHash 찍히니?", metadataHash);
    // const _tokenId = tempTokenId; // ✅ 응? 토큰 id 를 하드코딩? ❓❓❓❓❓ | 교수님 코드는?
    await contract.methods.minting(metadataHash).send({
      from: user.account, // msg.sender 값이 from 으로부터 나옴
    });
  };

  const upload = async () => {
    const fileData = new FormData();

    // input 태그에 넣은 파일
    fileData.append("file", file);
    console.log("fileData", fileData);

    try {
      const imageJSON = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          // [url 주소👉] https://docs.pinata.cloud/reference/post_pinning-pinfiletoipfs
          // 옵션값 | 헤더 내용 | 업로드에 대한 권하니 있는지 확인 | 파일 내용이 form 데이터 라는 걸 알려주고
          // 데이터 형식을 알려줘서, 뭔가 처리할 수 있게
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "3fa874b39e5e7eaf8ec5",
            pinata_secret_api_key:
              "48546889d754d9dabdf61a749d0b89b54aef072d51892041ce57afd10e5be902",
          },
        }
      );
      console.log("imageJSON", imageJSON); // 값 확인 ✅

      const metadataJson = await saveImageJSON(imageJSON);
      console.log("metadataJson ✅✅", metadataJson);

      const metadataHash = await sendMetadataToPinata(metadataJson);
      console.log("metadataJSON", metadataHash);

      await minting(metadataHash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label> IPFS 에 파일 업로드 </label>

      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      ></input>

      <button onClick={upload}> 파일 업로드 </button>
    </>
  );
};

export default App;

/*
  react 에서 파일 생성하고 
  IPFS 에 업로드 하고 

  객체 만들기 전에 이미지 주소 먼저 올리고, 
  해시 주소 가지고, 

  NFT 이름 입력 
  NFT 설명 입력 
  NFT 이미지 올리고 

  새로운 NFT 민팅


  즉, 

  여기에, 
  JSON 바꿀 수 있게 해서
  즉, 파이리 넣으면, 파이리 NFT 나오고, 
  피카츄 넣으면, 피카츄 NFT 나오고, 
*/
