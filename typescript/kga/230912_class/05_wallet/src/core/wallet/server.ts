// 지갑 서버 
// $ npx ts-node ./src/core/wallet/server.ts  이걸로 실행~ 

import express from "express";
import { Wallet } from "./index";
import path from "path";
import fs from 'fs';

// import cors from ''
const app = express();
app.use(express.urlencoded({extended : false}));
app.use(express.json());    // 파싱할 수 있게❓❓


// 지갑 페이지 접속 했을 때
    // 서버에서 바로 뿌려줄 것 임 | cors 피하려고 
    app.get('/' , (req, res) => {
        const page = fs.readFileSync(path.join(__dirname, "/view/index.html") , "utf8");
            // 이렇게 가져오고 -> 인코딩은 utf-8 로 가져와서 -> 페이지 그려주기 
            // http://localhost:4000/ 여기로 들어가서 확인 
        res.send(page);
    })

// 지갑을 생성했을 때, 생성 요청
    app.post("/newWallet" , (req , res) => {
        // 요청이 바로 오면, new Wallet 으로 지갑을 바로 생성
        // console.log("new Wallet()" , new Wallet())
        res.json(new Wallet())
    });

// 지갑 정보 불러오기
    app.post("/walletList" , (req, res) => {
        console.log("hello")
        const list = Wallet.getWalletList();    // 폴더 안에 있는 파일을 문자열로 보내주
        res.json(list);
    })

// 해당 지갑 주소로 지갑 찾기 
    app.post("/walletSelect" , (req, res) => {
        const {account} = req.body;
        const privateKey = Wallet.getWalletPrivateKey(account)
        res.json(new Wallet(privateKey));
    })

// 대기상태
    app.listen(4000 , () => {
        console.log("server on~")
    })

