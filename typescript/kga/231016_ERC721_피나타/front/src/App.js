import { useEffect, useState } from "react";
import axios from "axios";

import abi from "./abi/myNFT.json"; // ✅ 배포 후, artifacts 안에 있는 metadata 파일의 abi 의 [] 값만! 가져와서 붙어야 함

import useWeb3 from "./hooks/web3.hook";

const App = () => {
  const [file, setFile] = useState(null);

  const { user, web3 } = useWeb3();
  const [contract, setContract] = useState(null);
  const [hash, setHash] = useState(null);
  const [test, setTest] = useState(null);
  useEffect(() => {
    if (web3 != null) {
      if (contract) return;

      const DJ_NFT = new web3.eth.Contract(
        abi,
        "0x74c3309CD93952B7A98e94486B6FdB9846B3116b", // ✅ 배포된 CA 주소
        { data: "" }
      );

      setContract(DJ_NFT);
    }
  }, [web3]);

  const saveImageHashOnNFTjson = async (responseFromPinata) => {
    try {
      console.log("😸responseFromPinata", responseFromPinata);
      const formData = { IpfsHash: responseFromPinata.data.IpfsHash };
      console.log("formData", formData);

      const result = await axios.post(
        "http://localhost:7000/nft/ipfsHashUpdate",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("🙌🙌", result.data.updatedData);
      const temp = JSON.stringify(result.data.updatedData);

      let nft = {
        pinataContent: {
          // "name" : result.data.updatedData.name
          temp,
        },
        pinataMetadata: {
          name: "pinnie.json",
        },
      };

      result.data.success
        ? alert("이미지 파일 해시를, NFT json 에 저장 성공")
        : alert("이미지 파일 해시를, NFT json 에 저장 실패");

      // 서버에서 변경된 JSON 을 받아서, return
      setHash(result.data.updatedData);
      return result.data.updatedData;
    } catch (error) {
      console.log(error);
    }
  };

  const sendNftJsonToPinata = async (updatedNftJson) => {
    // const fileData = new FormData();
    // FormData : 웹 API 의 한 부분 | 서버로 전송하기 위해, Key - value 쌍의 형태로 데이터를 쉽게 생성할 수 있게 해줌

    // updatedNftJson 을 file 형식으로 변환하기
    // const jsonString = JSON.stringify(updatedNftJson);

    // 문자열 데이터를 'Blob' 으로 변환 | Blob (바이너리 형식의 객체)
    // const jsonBlob = new Blob([jsonString], { type: "application/json" });

    // Blob을 fileData 에 추가하기 | 파일 이름 = "DJ_NFT.json"
    // fileData.append("file", jsonBlob, "DJ_NFT.json");

    try {
      // console.log("updatedData", FormData);
      const parseHash = JSON.parse(hash);
      console.log(parseHash);
      const nftJsonHashFromPinata = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFSs",
        parseHash,
        {
          headers: {
            "Content-Type": "application/json",
            pinata_api_key: "b8e7bb04e0fb15447f49",
            pinata_secret_api_key:
              "1416afc9a4221c05aa9b112f77b8ee2444c8497f30bb596058201132085902f5",
          },
        }
      );

      console.log("nftJsonHashFromPinata", nftJsonHashFromPinata);

      return nftJsonHashFromPinata;
    } catch (error) {
      console.log(error);
    }
  };

  const mappingTokenIdHashUri = async (nftJsonHashFromPinata) => {
    const uri = `"${nftJsonHashFromPinata.data.IpfsHash}"`;
    console.log(typeof uri);
    console.log("uri", uri);
    const _tokenId = 77; // ✅ check

    await contract.methods.setTokenURI(_tokenId, uri).send({
      from: user.account, // ❓이걸 꼭 써야 하나?
    });
  };

  const minting = async (nftJsonHashFromPinata) => {
    console.log("실행되니?");
    const _tokenId = 77; // ✅ 응? 토큰 id 를 하드코딩? ❓❓❓❓❓ | 교수님 코드는?
    await contract.methods.minting(_tokenId).send({
      from: user.account, // msg.sender 값이 from 으로부터 나옴
    });
  };

  const upload = async () => {
    const fileData = new FormData();

    // input 태그에 넣은 파일
    fileData.append("file", file);

    try {
      const responseFromPinata = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          // [url 주소👉] https://docs.pinata.cloud/reference/post_pinning-pinfiletoipfs

          // 옵션값 | 헤더 내용 | 업로드에 대한 권하니 있는지 확인 | 파일 내용이 form 데이터 라는 걸 알려주고
          // 데이터 형식을 알려줘서, 뭔가 처리할 수 있게
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: "b8e7bb04e0fb15447f49",
            pinata_secret_api_key:
              "1416afc9a4221c05aa9b112f77b8ee2444c8497f30bb596058201132085902f5",
          },
        }
      );
      // console.log("IpfsHash" , responseFromPinata.data.IpfsHash);  // 값 확인 ✅

      const updatedNftJson = await saveImageHashOnNFTjson(responseFromPinata);
      console.log("updatedNftJson ✅✅", updatedNftJson);

      const nftJsonHashFromPinata = await sendNftJsonToPinata(updatedNftJson);

      await mappingTokenIdHashUri(nftJsonHashFromPinata);

      await minting();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tc();
  }, []);
  const tc = () => {
    ta();
    tb();
  };
  const ta = () => {
    setTest("123");
  };

  const tb = () => {
    console.log("tets--------------------", test);
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
