import { useEffect, useState } from "react";
import axios from "axios";

import abi from "./abi/myNFT.json"; // ✅ 배포 후, artifacts 안에 있는 metadata 파일의 abi 의 [] 값만! 가져와서 붙어야 함

import useWeb3 from "./hooks/web3.hook";

const App = () => {
  const [tempCA, setTempCA] = useState(
    "0xd9145CCE52D386f254917e481eB44e9943F39138"
  ); // ✅ CA 하드코딩
  // ✅ 추가로, abi 하드 코딩 하다가 -> udataABI 기능을 NFT controller 에 만듦

  const [file, setFile] = useState(null);
  const [NFTDescription, setNFTDescription] = useState()

  const [ABIdata, setABIdata] = useState();

  const { user, web3 } = useWeb3();
  const [contract, setContract] = useState(null);

  const [mintImageHash, setMintImageHash] = useState();

  const [loginUserAccount, setLoginUserAccount] = useState();

  const [ metaDataDescription , setMetaDataDescription] = useState()

  const [network, setNetwork] = useState(null);
  const [accounts , setAccounts] = useState();
  const [currentAccount , setCurrentAccount] = useState();

  // abi 상태 관리 | 📛📛 여기에 좀 문제가 있음 
      // abi 상태 업데이트 요청 #📛📛📛 수정중
      // useEffect(() => {
      //   updateABI(ABIdata);
      // }, []);

      // 현재값과 이전값을 비교해서, 상태 업데이트 요청 하기 #📛📛📛
        // const updateABI = async (ABIdata) => {
        //   try {
        //     const newABI = await axios.get("http://localhost:7000/nft/updateABI", {
        //       withCredentials: true,
        //     });
        //     console.log("abi 업데이트", newABI.data);

        //     if (ABIdata !== newABI.data) {
        //       setABIdata(newABI.data);
        //     }
        //   } catch (error) {
        //     console.log(error);
        //   }
        // };


    // 🔹 로그인 환경(메타마스크 & 세폴리아) 체크 👉 accounts 가져오고 👉 network, accounts 상태 업데이트  
    useEffect( () => {
      checkConfigNgetAccounts()
    } , [network])    

    // 🔹 [업데이트 된 상태 사용] 현재 current account 추출
    useEffect( () => {
      getCurrnetAccount()
    } , [accounts]) // 이 순간 살짝 input, output 느낌

        // 로그인 환경(메타마스크 & 세폴리아) 체크 👉 accounts 가져오고 👉 network, accounts 상태 업데이트 정의
        const checkConfigNgetAccounts = async () => {
            // 메타마스크 설치 및 네트워크 확인  👉 network 상태 업데이트 
            await checkConfig()
            // 현재 이더리움 내 계좌 주소들(accounts) 가져와서 👉 allAccounts 상태 업데이트 
            await getAccounts()
        }

        // 메타마스크 설치 여부 👉 세폴리아 네트워크 여부 확인 👉 network 상태 업데이트  
        const checkConfig = async () => {

          try {
            // 자격 요건 확인 
                // 메타마스크 설치 여부 확인 : 미설치시, 메타마스크 설치 유도 (eth_requestAccounts 메소드에 의해 : 이건, getAccounts 에 있음. ) 
                if(!window.ethereum){
                  alert("메타마스크 설치 하세요~🙌")     
                } 

                // if(!window.ethereum.on){
                //   alert("메타마스크 로그인 하세요")
                // }

                // 로그인 네트워크 확인 : 세폴리아 여부 확인 후, 세폴리아로 변경 요청
                if(window.ethereum.on){
                  window.ethereum.on("chainChanged" , (chainId) => {
                    console.log("chainChanged | 어떤 네트워크로 접속했는지 확인!" , chainId)
                    
                    // 세폴리아 네트워크가 아닐 경우, 변경 요청
                    if(chainId !== '0xaa36a7'){
                        // [참고] 0x539 ( 0x539 == 가나쉬 네트워크 체인 id 임. 왜냐면, 가나쉬에 접속할 때, npx ganache-cli --chain.chainId 1337 --chain.networkId 1337 로 터미널에 입력하는데, 여기에서 1337 == 0x539 이기 때문) 
                        // 세폴리아 chainId (11155111 == 0xaa36a7 | 출처 : https://chainlist.org/chain/11155111)
                        
                        switchNet()
                    }
                  })
                }
            
          } catch (error) {
            console.log(error)
          }
        }

        // CF. 세폴리아 네트워크로 변경요청하는 기능 | checkConfig 에서 사용 
        const switchNet = async () => {
          try {
            // 메타마스크에 해당 네트워크로 변경해달라고 요청 | ⭐ 성공적으로 변경하면 null 을 반환하게 됨 ⭐
            const net = await window.ethereum.request({ 
              jsonrpc : "2.0" , 
              method : "wallet_switchEthereumChain",    // wallet_switchEthereumChain : 'params 에 넣은 네트워크로, 변경을 요청' 하게 하는 메소드
              params : [{chainId : "0xaa36a7"}]    // 
            })
      
            // net 값이, 정상적으로 없으면(null 이면), 해당 네트워크에, 있다는 뜻! 
            setNetwork(net || true);    
              // [의미] net 값이 있으면 그 값인 null을 사용하고, 없으면 true를 사용하라 | 한번 네트워크 검사하기 위한 것 ✅✅     
            
          } catch (error) {
            console.log(error)
          }
        };

        // 현재 이더리움 내 계좌 주소들(accounts) 가져오기 👉 accounts 상태 업데이트 
        const getAccounts = async () => {

            try {
              if(window.ethereum.request){
                // 이더리움에 접속한 모든 계정 주소 반환
                    const eth_accounts = await window.ethereum.request({
                      method : "eth_requestAccounts"
                    });
        
                    setAccounts(eth_accounts)
              }
                  
            } catch (error) {
                console.log(error)
            }
        }

        // 현재 current account 추출 함수 
        const getCurrnetAccount = () => {
          if(accounts){
            setCurrentAccount (accounts[0])
          }
        }
        



      // // '모든 계정' 이 갖고 있는 
      // const getAccountsInfo = await Promise.all(
      //   accounts.map( async(account) => {
      //     // 순회하고 있는 계정에 있는 토큰 가져오기
      //     const token = await getToken(account)
      //     const ETHtoken = await getETHToken(account)
      //     return {account , token , ETHtoken}
      //   } )
      // )

      // // setToken(await getToken(getAccountsInfo[0]) )  // ERC20 토큰 잔액
      // // setETHToken(await getETHToken(getAccountsInfo[0]) )  // 이더리움 잔액
      // setAccountsInfo(getAccountsInfo)
      //       // getAccountsInfo = [ { account : "0x12312312312" , token: 1000, ETHtoken : 1000 } , { } ... ]     



  // 🔹 abi, CA 주소 가져와서 👉 contract 상태변수 업데이트 하기
  useEffect(() => {
    const getContract = async () => {
      if (web3 != null && !contract) {
        if (contract) return;

        const DJ_NFT = await new web3.eth.Contract(
          abi,
          tempCA, // ✅ 배포된 CA 주소
          { data: "" }
        );

        setContract(DJ_NFT);
      }
    }
    
    getContract()

  }, [web3]);



  //🔹'로그인 유저 account' 상태 업데이트 후 👉 "renderMetaData" 상태 업데이트 하기 | 렌더 되는 요소인 imageHash, metaDataDescription 상태 업데이트 
      // '로그인 유저 account' 상태 업데이트 요청
      useEffect(() => {
        const updateLoginUserAccount = async () => {
        
          const loginUserAccount = await getLoginUserAccount();
          
          setLoginUserAccount(loginUserAccount);
        };
        updateLoginUserAccount();
      }, []);


      // '로그인 유저 account' 상태 업데이트 완료 후 로직 : loginUserAccount 의 URIs 가져와서 👉 렌더 되는 요소인 imageHash, metaDataDescription 상태 업데이트 
      useEffect(() => {
        const renderMetaData = async (loginUserAccount) => {
          console.log("loginUserAccount 🏷🏷 " , loginUserAccount)
          const ownersURIs = await getOwnerURIs(loginUserAccount);
          console.log("ownersURIs 🌴🌴" , ownersURIs)

          // currentUserMetaDataJSON 는 , 현재, 방금 올린 NFT 만 반환
          const currentUserMetaDataJSON = await getCurrentUserMetaData(ownersURIs)
          console.log("currentUserMetaDataJSON📌" , currentUserMetaDataJSON)

          if(currentUserMetaDataJSON && currentUserMetaDataJSON.image){
            setMintImageHash(currentUserMetaDataJSON.image)
          }

          if(currentUserMetaDataJSON && currentUserMetaDataJSON.description){
            setMetaDataDescription(currentUserMetaDataJSON.description)
          }
        }

        renderMetaData(loginUserAccount);

      }, [loginUserAccount]);

      // mintImageHash 가 잘 나오는지 체크 
      useEffect( () => {
        console.log("mintImageHash👉👉" , mintImageHash)
      } , [mintImageHash])


          // 현재 로그인 계정 조회
          const getLoginUserAccount = async () => {
            try {
              // 현재 메타마스크 로그인한 계정
              const accounts = await window.ethereum.request({
                method: "eth_requestAccounts", // 메타마스크에 연결된 계정 조회
              });
  
              // 현재 로그인 계정 = accounts[0] = accounts 중 첫 번째
              const loginUserAccount = accounts[0];
              // [출처] https://docs.metamask.io/wallet/tutorials/react-dapp-local-state/
              console.log("🙌🙌loginUserAccount" , loginUserAccount)
              return loginUserAccount;
              
            } catch (error) {
              console.log(error)
            }
          };

          // 현재 로그인 유저의 보유URIs 조회
          const getOwnerURIs = async (loginUserAccount) => {

            try {
              console.log("🐣🐣loginUserAccount" , loginUserAccount)
              console.log("🙆‍♂️🙆‍♂️" , contract)
              if (loginUserAccount && contract && contract.methods) {
                const ownersURIs = await contract.methods
                  .getOwnerURIs(loginUserAccount)
                  .call();
                console.log("✍✍current 지갑 주소의 메타데이터(URIs) ownersURIs", ownersURIs);
                return ownersURIs
              }
            } catch (error) {
              console.log(error)
            }

          };

          // 현재 로그인 유저의 metaData json 가져오기
          const getCurrentUserMetaData = async (ownersURIs) => {

            try {
              console.log("ownersURIs 🤸‍♂️🤸‍♂️" , ownersURIs)
              const tempLength = ownersURIs.length;
              // console.log("현재 로그인 지갑 주소의 메타데이터(URIs)", ownersURIs);
              // console.log("tempLength", tempLength);
              
            // 여기에 해당 url 에 접근해서, json 객체 가져와서, image 키에 있는 값 보여주는 코드
            if(ownersURIs){
              const metaData = await axios.get(
                `https://ipfs.io/ipfs/${ownersURIs[tempLength - 1]}` // tempLength - 1 : 가장 최신 ERC721 토큰
              );
              console.log("metaData", metaData);
    
              const currentUserMetaDataJSON = await metaData.data;
              console.log("metaDataJSON", currentUserMetaDataJSON);
    
              return currentUserMetaDataJSON
            }
              
            } catch (error) {
              console.log(error)
            }

          }



  // 🔹 이미지 + 텍스트 민팅 하기 
      // 이미지 파일 보내고 -> 이미지에 대한 jsonHash 값 받기
      const saveMetaDataJSON = async (imageJSON) => {
        try {
          console.log("imageHash", imageJSON.data.IpfsHash);

          const formData = { 
            IpfsHash: imageJSON.data.IpfsHash,
            description : NFTDescription
          };
          console.log("formData", formData);

          // metaData json 해시값 받기
          const _metadataJson = await axios.post(
            "http://localhost:7000/nft/saveMetaDataJSON",
            formData,
            {
              withCredentials: true,
            }
          );
          console.log("_metadataJson.data.updatedData", _metadataJson.data.updatedData);

          _metadataJson.data.success
            ? alert("이미지 파일 해시 & 텍스트를, metadata json 에 저장 성공")
            : alert("이미지 파일 해시 & 텍스트를, metadata json 에 저장 실패");

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
          console.log("💎💎", typeof metaDataJson);
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


      // 민팅
      const minting = async (metadataHash) => {
        console.log("@minting | metadataHash 찍히니?", metadataHash);
        const resultMint = await contract.methods.minting(metadataHash).send({
          from: user.account, // msg.sender 값이 from 으로부터 나옴
        });

        return resultMint;
      };

      // 이미지 업로드
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

          const metadataJson = await saveMetaDataJSON(imageJSON);
          console.log("metadataJson ✅✅", metadataJson);

          const metadataHash = await sendMetadataToPinata(metadataJson);
          console.log("metadataJSON", metadataHash);

          const resultMint = await minting(metadataHash);
          console.log("resultMint 민팅 완료 결과 ", resultMint);
          console.log("resultMint 민팅 완료 : blockHash ", resultMint.blockHash);

          // await getOwnerURIs(loginUserAccount)
        } catch (error) {
          console.log(error);
        }
      };



  return (
    <>
      <div> 현재 로그인 지갑 주소 : {loginUserAccount} </div>

      <label> IPFS 에 파일 업로드 </label>

      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      ></input>

      <label> NFT description </label>
      <input
        type="text"
        onChange = { (e) => {
          setNFTDescription(e.target.value)
        }}
      >
      </input>

      <button onClick={upload}> 파일 업로드 </button>

      <div>
        <img
          src={`${mintImageHash}`}
          style={{ width: "300px", height: "auto" }}
        />
        <p> NFT description : {`${metaDataDescription}`} </p>

      </div>
    </>
  );
}

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
