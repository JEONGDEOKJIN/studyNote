
# ERC 721 - NFT 

## NFT | 대체 불가능한 토큰 Non-fungible Token

- 고유의 값을 가지고 있어서 -> 대체 불가능 
- 토큰의 내용이 대체 불가능한 것이 아니라, 토큰 자체가 고유의 값을 갖고 있어서, 대체 불가능, 이라는 뜻
- NFT를 생성했을 때, 내용이 같아도, 각각 고유성을 갖고 있어서, 대체 불가능 하다는 의미 


# NFT
``` JS
const nft = {
    tokenId = "0x123123123", // 토큰의 ⭐⭐고유 식별자⭐⭐
    url : "https://nfturl.com/data.json"  // 이 안에 '어떤 파일' 을 담을지를, 여기에 넣는다. | NFT 에 어떤 내용을 담을지, 객체 파일의 경로로
        // json : 파일의 경로를 넣을 수 있음. | json 객체가 들어감 
}
```

# url NFT 의 내용 | json 에 들어가는 것 
``` json 
{
    "name" : "NFT 의 이름" , 
    "description" : "NFT의 설명", 
    "image" : "이미지 경로 : NFT에 포함할 이미지 경로" ,
    "attribute" : [
        // 원하는 추가 속성 ex) 랜덤으로 뽑았을 때 레어한 정도
    ]
}

// 이것을 어디에 올리냐면, 
    // ipfs 에 저장 
        // 노드 p2p 방식으로 저장 
        // 탈중앙화로 저장됨 
        // db 에 올려도 되긴 하는데, 그러면, 중앙화지. 
        // 확인하려면, 오픈씨에서 볼 수 있음. 
```
- 즉, 
url의 객체의 내용을 DB에 저장해도, 우리가 NFT 민팅을 할 수 있는데, 
그러면, 탈중앙화라고 보기 힘들기 때문에, 
분산 파일 시스템인, IPFS 에, 객체의 내용을 저장하고, 이미지도 저장하고, URL 을 전달해서, 
NFT를 조회하면, 그 분산파일 시스템에 저장된 객체의 내용으로, NFT 를 보여주는 것


### IPFS 에 업로드 했을 때의 특징
IPFS 에 저장하면 -> 노드에 보내고, 그때 나오는 URL 은 '고유의 해시값' 을 가짐 
똑같은 파일을 올려도, 해시값이 다름 
분산 파일 시스템에 올리면 -> 조회 할 수 있지만, 수정 삭제가 안 돼⭐⭐⭐ -> SO, 보안성이 좋아진다. ⭐⭐⭐⭐⭐⭐ 

- 분산 네트워크, 중앙화 서버가 없이, 여러 노드들이 분산 네트워크에 파일을 저장한다. 
    - 즉, 안정성, 무결성 및 보안 유지, 가 가능해진다. | #📛📛📛📛📛📛 
    - 업로드 하면, 파일의 경로는 '해시 기반의 고유한 주소' 를 갖는다. | ⭐⭐⭐⭐⭐ 
    - NFT 에 담을 객체의 내용을, IPFS 저장소에 저장하고, URL 값을 NFT 객체에 담아놓는다. 
    - 분산 파일 시스템에 데이터를 저장하는 프로토콜, P2P 네트워크, 



### 오픈재플린에서 erc 721 내용 받아서, nft 민팅 해보기 

``` sh
npm i @

```


#### erc 20 내용 확인 - 폴더로 직접 가서 적음 

``` 
abstract contract ERC721 is Context, ERC165, IERC721, IERC721Metadata, IERC721Errors {
    using Strings for uint256;

    // Token name | 토큰 이름 
    string private _name;

    // Token symbol | 토큰 단위
    string private _symbol;

    // 토큰 권한 소유자 
    /* 
        - ERC20 의 경우 : '개수' 가 중요
        {
            "ox123123123" : 100000개
        }

        - ERC721 의 경우 : '누가 갖는지, 소유권' 이 중요 | so, 토큰을 조회하면, 누가 갖는지 확인이 가능 
        {
            1번 토큰 : "0x123124124" (해당 주소가 갖고 있다), 
            2번 토큰 : "0x123124124" (해당 주소가 갖고 있다), 
            3번 토큰 : "0x123124124" (해당 주소가 갖고 있다), 
        }

    */

    // '지갑이 소유한 NFT 가 몇개 있는지' 내용을 담을 mapping 객체 
    // 0x1231254 이 지갑이 소유하고 있는 NFT 가 몇개 있는지! 
    mapping(uint256 tokenId => address) private _owners;

    // 지갑이 위임 받은 토큰의 소유권을 확인할 수 있는 객체
        /*
            1번 토큰 : "0x123124124" (1번은 111 한테 있는데, 1번에 대해서 위임 받았다. | 소유권을 따로 있는 것 임), 
        */
    mapping(address owner => uint256) private _balances;

    // 지갑이 토큰의 권한을 받은 내용이 승인되었는지 여부 | TRUE, FALSE 로 나옴 
    /*
        {
            "1번 지갑" : {
                "2번 지갑" : true | 1번 지갑이, 2번 지갑에게, 소유권 이전 했다, 라는 것
            }, 
        }
        [소유자 주소][위임 받은 주소]
    */
    mapping(uint256 tokenId => address) private _tokenApprovals;


    mapping(address owner => mapping(address operator => bool)) private _operatorApprovals;

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */

    // 인터페이스 내용을 확인 | ERC721로, 표준을 맞춰서, NFT 를 발행했는지 검증 | 반환값이 bool 값임. | 발행된게 맞는지를 검증
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC165, IERC165) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-balanceOf}.
     */

    // 지갑의 주소를 가지고, NFT 몇 개 발행했는지 조회하는 함수 | 이것들은 막 뜯어보면서 작업
    function balanceOf(address owner) public view virtual returns (uint256) {
        if (owner == address(0)) {
            revert ERC721InvalidOwner(address(0));
        }
        return _balances[owner];
    }

    /**
     * @dev See {IERC721-ownerOf}.
     */
    

    // 토큰의 아이디를 매개변수로 받아서, 토큰의 아이디로 매핑되는 주소를 확인해서, 토큰의 소유자가 누구인지 반환하는 함수
    function ownerOf(uint256 tokenId) public view virtual returns (address) {
        return _requireOwned(tokenId);
    }

    /**
     * @dev See {IERC721Metadata-name}.
     */

    // NFT 의 이름을 반환
    function name() public view virtual returns (string memory) {
        return _name;
    }

    /**
     * @dev See {IERC721Metadata-symbol}.
     */
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */

    // NFT 는 고유값 갖고 있는 토큰 ⭐⭐⭐⭐⭐⭐ 
    // 내용 자체는 대체 불가능하지 않음 ⭐⭐⭐⭐⭐⭐ | 
    function tokenURI(uint256 tokenId) public view virtual returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string.concat(baseURI, tokenId.toString()) : "";
    }

    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overridden in child contracts.
     */

    //  어떤 내용의 객체를 보여주는지 확인할 때, 디폴트 경로가 뭔지를 지정해놓고, baseURI 함수로 호출해서, 디폴트 경로 넣어주고, 
    // ID 넣어서, 어떤걸 보여줄지
    // 예를 들어서, 이렇게 경로가 들어옴 | 여기 까지가 IPFS 의 폴더 경로 | 토큰 ID 로 호출하면 
    // 업로드한 IFPS 파일의 주소(해시값) 을 '상태변수' 에 담아놓으면 
        // EX) const imgArr = ["첫번째 해시값" , "두 번째 해시값"]
    // http://nft01/imgArr[token]
        // 오픈씨에 token 아이디에 맞는 객체를 가져와서, 뿌려준다. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
        // '토큰이 갖는 고유값'이 중요하다. | 내용이 대체 불가능한게 아님  ⭐⭐⭐⭐⭐
    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

```



---


# pinata 

### 사용 이유 
- ipfs 에 직접 올리지 않고, 피나타를 사용해서 올릴 것 임 
- ipfs provider 로 피나타를 사용 
- 직접 파일 업로드 하고 -> 업로드한 파일의 '해시 주소' 를 갖고 올 것 임 ⭐⭐⭐ 
- 이 해시주소로 IPFS 에 업로드된 파일을 다운로드 하거나, 확인 할 수 있다. ⭐⭐⭐⭐⭐ 




# 리믹스 
```
remixd -s.

```


---
---


# 추가 개념 설명 | NFT 마켓 | 
