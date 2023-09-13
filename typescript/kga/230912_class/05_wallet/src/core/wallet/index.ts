import { randomBytes } from "crypto";

import elliptic from "elliptic"
import { SHA256 } from "crypto-js";

import fs from "fs"      // 파일 불러올 때 사용 
import path from 'path' // 파일 불러올 때 '경로' 편하게

// '지갑 클래스' 만들고, 페이지에서 지갑 생성을 한번 확인 해보기 

// elliptic 인스턴스 생성
const ec = new elliptic.ec("secp256k1");
    // 이게 그 그래프 가져오는 거 였나❓❓❓ 


// 경로 지정할 때 '디폴트 경로' 
    const dir = path.join(__dirname , "../../data")        // 현재 폴더 까지(dirname)
        // 이곳에 기본적으로 지갑 파일 저장

// 지갑 클래스 생성 
export class Wallet {
        public account : string;
        public privateKey : string;
        public publicKey : string;
        public balance : number;        // 잔액 표시용

        constructor(privateKey : string = ""){

            // 생성단계에서, 개인키 값이 없으면, 만들어서 넣자
            this.privateKey = privateKey || this.getPrivateKey()
                // 전달한 값 따로 없으면, 개인키를 따로, 랜덤 생성해서 넣을 것 임

            this.publicKey = this.getPublicKey();
            this.account = this.getAccount();
            this.balance = 0

            if(privateKey == "")
            Wallet.createWallet(this); 
                // 동적할당을 해서, 생성된 지갑의 내용을 파일로 만든다. 

        }

        // 생성된 지갑을 전부 다 불러오는 
        static getWalletList() : string[]{
            console.log("hello2")
            // readdirSync 폴더를 읽어서, 안에 있는 파일 이름을, 문자열로 가져온다.  
            const files : string[] = fs.readdirSync(dir);
            console.log("files" , files)
            return files;
        }

        // data 폴더 안에, 해당하는 지갑 주소를 찾아서, 반환
        static getWalletPrivateKey(account : string) : string {
            const fileName = path.join(dir , account)   // 클릭한 경로 까지
            const fileContent = fs.readFileSync(fileName);
            return fileContent.toString();
                // privateKey 로 Wallet 을 만들어서 
        }
        

        public getPrivateKey() : string {
            return randomBytes(32).toString("hex");
        }

        public getPublicKey() : string{
            // 개인키로 공개키를 만들자
            const keyPair = ec.keyFromPrivate(this.privateKey)
            return keyPair.getPublic().encode("hex" , false)
        }

        public getAccount() : string {
            return `0x${this.publicKey.slice(26).toString()}`
        }

        // 지갑을 생성하면, 지갑을 보관
            // 데이터 폴더에 파일로 저장해둘 예정
        static createWallet(myWallet : Wallet){
            // fs 모듈로 파일 생성 
            
            // 지갑을 생서앟면, 주소를 저장할 것. 
            // 주소 안에는 개인키 넣어보기
            const fileName = path.join(dir , myWallet.account)
            const fileContent = myWallet.privateKey;
        
            fs.writeFileSync(fileName , fileContent);
        }


    }