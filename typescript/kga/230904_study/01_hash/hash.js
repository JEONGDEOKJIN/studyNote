


// 데이터 무결성을 보장하기 위해 그리고 블록의 연결 구조를 구성하기 위한 SHA256 해시 함수 사용  
    const {SHA256} = require("crypto-js")

    /* [SHA256 이해]
        [특징]
            - 256비트로 구성됨. 64자리 문자열로 암호화 해줌
            - '어떠한 input' 을 넣어도, '동일한 길이의 출력' 을 생성 -> 다양한 입력에 대해 '고유한 값' 을 가질 확률이 높아짐. 
            - '고유한 값' 을 갖는게 중요한가? 고유한 값을 갖게 하는데 있어, 동일한 길이의 출력이 미치는 영향은? 
            - 이걸 알기 위해 우선 '데이터 무결성' 에 대해 공부하자
            
        [데이터 무결성(Data Integrity)]
            [의의]
                - 데이터 '전송, 저장 등' 의 과정에서, '데이터가 손상되지 않았음!' 을 의미하는 성질 
                - ex) 파일 전송, 이메일 전송과정에서, 원본 파일과 수신자가 받은 파일이 똑같아! 

            [필요성]
                - 만약, 전송 중 데이터가 손실된다면, 내가 보고 있는 파일에 대한 '신뢰도' 가 없어질 것

            [무결성 확보에 있어 해시함수의 역할]
                - 해시함수는 '어떠한 input' 이 입력되어도, '동일한 output' 을 내놓는다. 
                - 그로 인해 
                    1) 철자 하나가 변경되는 것 같이, 조그마한 변화에도, 큰 output 차이를 낸다. -> 그래서, 변경여부 탐지에 용이하다. 
                    2) 또한, 출력값으로 부터, 입력길이를 유추하기 힘들기 때문에, 보안에서 유리하다. (이건 보조적)
                    3) 그리고, 해시값은 ⭐'고유(디지털 지문)'⭐ 하다. 
                        - 다만, '중복' 이 일어날 수 있는데, 이를 '해시 충돌' 이라고 한다. 다만, 현대적인 SHA256 에서는, 거의 없음.  

        [해시 함수를 사용하여 '이 파일이 전송 중에, 변경된건가?' 를 판단하는 과정 ]
            1) 데이터 생성자(A, 덕진)는 '원본 데이터 파일 ex) 09월학습일지' 를 작성하고 -> '해시 함수' 에 넣어서 -> ⭐'고유한 해시값(디지털 지문)'⭐ 을 얻는다. 
            2) 데이터 생성자(A, 덕진)는 '원본 데이터' 와 '해시값' 을 데이터 수신자(B, 학습일지를 받는 사람) 에게 전달한다. 
            3) 이때, '전달하는 행위' 에서 '원본 데이터의 변경' 이 발생할 수도 있다. 
            4) 이에 수신자(B) 는 자신이 받은 '원본 데이터' 가 '덕진이 실제로 보낸 데이터와 맞는지' 확인하고 싶어 한다. 
            5) 따라서, 수신자(B) 는 '자신이 원본데이터라고 받은 원본데이터'를 '해시 함수' 에 넣고, 해시값은 얻는다. 
            6) 수신자(B)는 'A로부터 받은 해시값' 과 '스스로 계산한 해시값' 이 일치하는지 확인한다. 
            CF. 해시함수는 조그마한 input 의 변화에도, 큰 output 차이를 내기 때문에, 파일이 조금만 수정되어도, 다르다고 판단할 수 있게 된다.

        [궁금한 것]
        - '블록체인을 암호화 한다.'는게 무슨 의미야? 
            - 'SHA256 으로 블록체인 암호화 하기' 라는 필기를 수업 시간에 했는데, 이 과정에서 블록체인으로 암호화 하는 것은 아니고, 
            - SHA256 은 1) 데이터 무결성 보장 2) 블록 연결 구조를 구성 하는 역할을 한다. 이 점을 염두! 
    */


        const str = "안녕하세요";
        const str2 = "안녕하세요123123123123";
        const str3 = "12312389987897127398273981273123717389127317231231293712319231293719872313123912931923123987239";

        // 해시값 뽑기
        console.log("해시결과" , SHA256(str))
        console.log("해시결과2" , SHA256(str2))
        console.log("해시결과3" , SHA256(str3))
            /*
                해시결과 {
                    words: [
                        745025934,   891908369,
                        910543815,   677503468,
                        603229531, -1436574912,
                        1609407965,  -896975180
                    ],
                    sigBytes: 32
                    }
            */

        // 문자열로 만들기
            console.log("해시결과. 문자열로 만들기" , SHA256(str).toString())
                // words 배열의 각 하나의 숫자 덩어리는 10진수 -> 각각 16진수로 변환해서 -> 문자열로 합침
                // 2c68318e + 35297111 + 3645cbc7 + 2861e1ec + 23f48d5b + aa5f9b40 + 5fed9ddd + ca893eb4
                // 2c68318e352971113645cbc72861e1ec23f48d5baa5f9b405fed9dddca893eb4
            console.log("해시결과. 문자열로 만들기" , SHA256(str).length)
