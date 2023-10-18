// [처음 셋팅] npm init -y
// 라이브러리 설치 : npm i express mysql2 sequelize cors

const nftRouter = require("./routers/nftRouter")
const cors = require("cors")

const express = require("express");


const app = express();

app.use(cors({
    origin : ["http://localhost:3000"],
    credentials : true,
}));






// 백에서, 파싱된 값 가져오게 하려면 
app.use(express.json());


app.use("/nft" , nftRouter)


app.listen( "7000" , () => {
    console.log("서버 열림 🙌 | 7000 | ")
} )