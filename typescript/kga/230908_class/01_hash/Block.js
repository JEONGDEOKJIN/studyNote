// 최초의 블록 제네니스 블록 

const merkle = require("merkle");
const {SHA256} = require("crypto-js")

// 블록 헤더 클래스 
// 블록의 헤더 내용 
// 블록의 버전 
// 블록의 높이 
// 블록의 생성 시간 
// 이전 해시값 

// 등등 

class Header { 
    constructor(_height, _previousHash){
        // 블록의 버전 
        this.version = Header.getVersion();

        // 블록의 높이 
        this.height = _height

        // 블록 생성 시간 
        this.timestamp = Header.getTimestamp();

        // 블록의 해시값
        // 최초 블록은 이전 블록이 없으니까 그냥 0으로 대체
        this.previousHash = _previousHash || "0".repeat(64)
    }

    // static 으로 메서드 선언하면, 전역으로 사용할 수 있고 😥😥😥
    // 이 클래스로 객체를 생성 
        // 즉, 동적할당 했을 때, 이 메서드가 그 객체에 생성되지 않는다. 
    getName(){

    }
        // 이건 동적할당 할 때 마다 생김 
    // static 으로 메소드를 선언하면 전역으로 사용가능 
    // 이 클래스로 객체를 생성, 즉 동적할당했을 때 이 메소드가 그 객체에 생성 되지 않음 
    static getVersion(){
        return "1.0.0"
    }  
        // 동적할당 할 때 마다 생기고 
        // 한번만 된다? ❓❓❓ ⭐⭐⭐⭐⭐
    
    static getTimestamp(){
        return new Date().getTime()
    }


}


// 블록 class 
class Block { 
    // 동적할당한 height, data 헤더객체와 내용을 받아서 생성
    constructor(_header , _data){
        this.version = _header.version;
        this.height = _header.height;
        this.timestamp = _header.timestamp  
        this.previousHash = _header.previousHash // 이전 헤더 객체에서 받는다.
        this.data = _data;
        this.merkleRoot = Block.getMerkleRoot(_data);
        
        // 블록의 해시 
            // 모든 내용을 해시화 시킨게, 블록의 해시 
            this.hash = Block.createBlockHash(_header, Block.getMerkleRoot(_data))
            // 즉, 블록의 모든 내용을 해시화 시킨게, 블록의 해시

    }

    static getMerkleRoot(_data){
        const merkleTree = merkle("sha256").sync(_data)
        return merkleTree.root()
    }

    static createBlockHash(_header, _merkleRoot){

        // _header 는 오브젝트 임 
        // 이 오브젝트 안 에 있는 value 를 다 뺄거야 
        const values = Object.values(_header)       // _header 안에 있는 value 를 모두 뺀다.
        // join 으로 배열을 문자열로 합치고, 구분점은 빈 문자열
        const data = values.join("") + _merkleRoot       // 가져온 걸 하나의 문자열 로 합침
    
        return SHA256(data).toString();
    
    }
}

// 블록을 생성해보자 
// 블록에 담을 데이터는 더미 데이터로
// 블록 기사 내용을 담아보자. 
    // 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks' | 원하는 문자열을 데이터로 써도 됨

    const data = ['The Times 03/Jan/2009 Chancellor on brink of second bailout for banks']

// 블록 헤더 객체 생성 
    // 첫 번째 블록이니까, height 는 0 을 주고 객체 생성
    const header = new Header(0)
        // {version : '', 
        // 등등이 들어가 있음.
        // height = 몇 번째 블록인지 알려주는. 첫 번째가 0 으로 시작  
        // }

    // 생성한 헤더 객체로 이제, 블록을 생성
    const block = new Block(header, data)
        // 위에 만든 더미 data 를 넣는다. 

    console.log(block)
        // 블록도 객체다


    
const header2 = new Header(1, block.hash);
    // 이번 버전 블록의 hash 가 들어온다. 
    // height = 몇 번째 블록인지 알려주는. 첫 번째가 0 으로 시작 

const block2 = new Block(header2 , ["두 번째 블록 데이터 "])
console.log(block2)
    // 머클 루트 블록의 내용이 검증된 내용인지를 확인
    // 이전 해시값이 들어온다. 음. 