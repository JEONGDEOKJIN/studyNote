

class CryptoModule {

    // 해시값(16진수) 을 2진수로 바꾸는 식
    static hashToBinary(hash : string) : string {

        let binary : string = ""

        // 해시 문자열을 '2글자씩' 가져와서 반복 -> 왜 2글자씩 가져오는 거지❓❓❓ 
        for (let i = 0; i < hash.length; i+=2) {

            // 반복문에서 i를 2씩 증가! 
            const hexByte = hash.substr(i , 2);
                // 현재 인덱스에서 2개 가져온다.

            // 16진수를 바이트 10진수로 변환
            const dec = parseInt(hexByte , 16);

            // 10진수를 2진 문자열로 변환 | 8자리로 패딩(8자리씩 맞춘다!)
            const binaryByte = dec.toString(2).padStart(8 , "0")

            // 현재의 2진 바이트를 최종 이진 문자열에 추가 
            binary += binaryByte;
            
        }

        return binary
    }
    // [이 코드의 특징]
        // hashToBinary 메소드 = static 으로 선언했음 -> so, 바로, 전역적으로 사용 가능
        // 언제 사용해? 
            // 다른 곳에서 import 해서 사용 할 때 ⭐⭐⭐ 
}

export default CryptoModule;