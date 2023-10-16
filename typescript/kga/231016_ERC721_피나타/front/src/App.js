import { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);


  const sendIpfsHash = async (responseFromPinata) => {

    console.log("😸responseFromPinata", responseFromPinata)
    const formData = { IpfsHash :  responseFromPinata.data.IpfsHash}   
    console.log("formData" , formData)
    
    
    const result = await axios.post( 
        "http://localhost:7000/nft/ipfsHashUpdate", 
        formData, {
        withCredentials : true
      })
    console.log("result" , result)

  }


  const upload = async () => {
    const fileData = new FormData();
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

      console.log("IpfsHash" , responseFromPinata.data.IpfsHash);
      sendIpfsHash(responseFromPinata)



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
