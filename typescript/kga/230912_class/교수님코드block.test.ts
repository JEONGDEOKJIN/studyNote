// 테스트 코드를 작성하면 시간이 오래걸리긴하지만
// 코드의 품질을 좀더 올릴수있다.

// 단위별로 테스트르를 진행해서 디버깅을 하고 코드를 작성할수 있기 때문에

// 1 단계 코드를 실행하고 2 단계 코드를 실행하고 절차적으로 테스트를 우리가 진행을 해볼수가 있다.

import Block from "@core/block/block";
import Chain from "@core/chain/chain";

import { GENESIS } from "@core/config";

// describe : 테스트들의 그룹화 그룹을 지정할수 있다
// 첫번째는 그룹의 명 이름 어떤 테스트 그룹인지.
// 두번째 매개변수로 테스트들을 실행시키는 콜백 함수
// describe("block 테스트 코드 그룹", () => {
//     // 테스트들의 단위를 어떻게 작성하냐
//     // 하나의 테스트 단위 첫번째 매개변수에는 테스틑 이름 명
//     // 두번째 매개변수는 테스트의 동작을 가지고있는 콜백함수.
//     it("제네시스 블록 테스트", ()=>{
//         console.log(GENESIS);
//     })

// })

// describe : 테스트 코드의 그룹 단위
describe("block 검증", ()=>{
    let newBlock : Block;
    let newBlock2 : Block;
    let newChain : Chain;
    let newChain2 : Chain;

    // it 테스트할 코드의 최소 단위
    it("블록 추가", () => {
        const data = ["Block 1"];
        newBlock = Block.generateBlock(GENESIS, data, GENESIS);
        // 블록의 난이도에 따른 마이닝을 동작해서 
        // 조건에 맞을때까지 연산을 반복한뒤에 생성된 블록을 newBlock에 받아온다.
        // 이전 블록은 GENESIS(최초 블록)
        console.log(newBlock);
        const data2 = ["Block 2"]
        newBlock2 = Block.generateBlock(newBlock, data2, GENESIS);
        console.log(newBlock2)
    })

    it("블록 유효성 검증", () => {
        const isValidBlock = Block.isValidNewBlock(newBlock, GENESIS);
        if(isValidBlock.isError) {
            //expect : toBe : 값이 맞는지 확인할때
            // 성공한결과가 맞는지 확인할때 사용하는 코드
            // true false 비교해서 맞는지 확인
            return expect(true).toBe(false);
        }
        expect(isValidBlock.isError).toBe(false);
    })

    it("블록 체인 추가", () => {
        newChain = new Chain();
        newChain.addToChain(newBlock);

        
        console.log(newChain.get());


        console.log(newChain.getBlockByHash(newBlock.hash));
    })

    it("네트워크 체인 비교(롱기스트 체인 룰)", () => {
        newChain2 = new Chain();
        newChain2.replaceChain(newChain.get());
        console.log(newChain2.get());
    })

    it("이전 10번째 블록 or 최초 블록", ()=>{
        // 현재 블록을 생성한다 가정하고
        // 현재 블록이 생성된 시간이 이전 10번째 블록으로부터 얼마나 걸렸는지
        // 확인을하고 블록의 정해진 생성 주기보다 빠르면 난이도를 올리고 아니면 내린다.

        for (let i = 0; i < 100; i++) {
            let block = Block.generateBlock(newChain.latestBlock(),["block"] ,newChain.getAdjustmentBlock());
            newChain.addToChain(block);
        }
        console.log(newChain.getAdjustmentBlock());
    })
})

// 지갑 구성
// 개인키, 공개키, 서명
// 지갑 주소 / 계정 만들기

// 개인키와 공개키와 서명을 이용한 신원 인증 방식은 분산원장이라는 이해가 필요

// 분산원장 : 장부를 모두가 관리 하는것. 데이터의 합의 기술

// crypto, elliptic, crypto-js

// npm i -D crypto
// npm i -D elliptic @types/elliptic
// npm i -D crypto-js @types/crypto-js

import { randomBytes } from "crypto"
import elliptic from "elliptic"
import { SHA256 } from "crypto-js";

const ec = new elliptic.ec("secp256k1");

// secp256k1은 비트코인과 이더리움에서 사용되는 알고리즘
// 키 생성 및 디지털 서명(너가 이걸 한게 맞는지 검증하기 위해 영수증), 주소 생성
// 타원 곡선의 별명

// 전달하는 사람과 받는사람등 모든 사람들은 공통적으로 타원곡선의 한점을 알고있어야하는데
// 이점을 타원곡선의 기준점 G라고 부릅니다.

// 타원곡선의 기준점 좌표가 뭐냐에 따라 타원곡선에 별명을 붙여준다.

// 비트코인과 이더리움에서 사용되는 타원곡선 별명은 secp256k1임

// y^2 = x^3 + ax + b
// 이 방정식에 만족하는 곡선

// a가 0, b가 7 기준점 G는 x및 y좌표를 16진수로 표현한것
// 02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798

// y^2 = x^3 + 7

// A가 트랜젝션 만들고 서명을 만들고(영수증)
// 본인들 볼펜이 하나씩 있어서 (개인키)
// 볼펜 준비 타원곡선의 지정 범위내의 값으로 정한 (1 ~ n - 1 까지의 정수 범위)(범위내의 정수)
// secp256k1의 n은 1.157920892373162e+77값 (과학 표기법)
// 16진수로 변환하면 FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141에서 -1 해서
// 즉 1 ~ FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140까지의 숫자 
// 범위중에 하나를 사용하는것.

// 개인키를 하나 임시로 지정을 해보면
// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140

// 전자 서명을 만들때
// 2개의 서명이 필요하다.

// 서명 r : 트랜잭션을 보낼때 개인키 처럼 정수를 뽑아서 이값을 k라고 합니다. 서명 r = k * G(기준점)

// 서명 s :  공식 == k⁻¹ = (z + r * private key) mod n  k를 역수 계산 z + r * 개인키 나머지 n
// k = 서명 r을 만들때 뽑은 랜덤 값
// z = 만든 트랜잭션 정보
// r = 서명 r
// 개인키 = 범위에서 지정하고 본인만 알고있는 개인키
// mod n = n으로 나눈 나머지

// 중요한건 서명 s를 만드는데 개인키를 사용했다는 개념

// w 동일한 서명을 만들지 않기위해서 임의의 값을 추가 nonce 값이라고 보면됨
// w = s⁻¹ mod n
// U1 = z * w mod n
// U2 = r * w mod n
// U1 * G + U2 + 공개키 값을 구해서 서명 r과 같은지 비교 해서 검증

// 이거를 전부 이해할 필요가 없고
// 중요한 중심만 이해를 하면된다 개인키로 서명을 만든거고
// 이 서명을 가지고 공개키를 통해서 서명을 검증할수 있다.

// 데이터 전송
// 1. 트랜잭션 생성
// 2. 개인키 생성
// 3. 서명 r, 서명 s 생성

// 데이터 수신
// U1 * G + U2 + 공개키 이 식으로 값을 구해서 서명 r과 비교(검증)