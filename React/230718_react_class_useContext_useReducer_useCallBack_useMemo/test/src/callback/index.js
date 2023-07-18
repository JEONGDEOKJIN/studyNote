// 메모이제이션 기법 

// '동일한 연산' 을 할 때, 이전에 연산된 값을 메모리에 저장해서, 동일한 연산을 줄이는 기법 
// 실행속도를 빠르게 해주는 기술! 이다. 

function Memo(n) {
    return str(n)
}
    // memo 가 리렌더링 되면, 해당 함수가 계속 호출이 됨 
    

function str(n){
    return `${n}`
    }


    // 메모를 많이 하면 -> 스택에 계속 쌓여서 느려지게 될 것 
    // 이걸 메모리에 저장하는 식으로 바꿔보면!? 
    // 이제 메모이제이션 기법을 사용해보자 👇👇👇👇👇👇👇👇 


// memo 이 부분을 메모리 영역으로 쓴다. 
// 이 영역에 있으면, -> 호출하지 않게 한다 
    
// 메모리 
    let memo = {};

    function Memo2(n){
        let result;

        // 메모리에 값이 있는지 확인 
        // n in memo 키값이 있는지 확인 | 근데 이것도 결국, 가지고 있는거 아니야❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓❓ 
            // memo 객체에, "a" 값이 있으면, 
            // 매개변수로 n 에 "a" 값이 있으면 true 를 반환. 

        if(n in memo) {
            // 연산을 안 함. 
            // 동일작업 연산 X 
            result = memo[n];
        } else {
            result = str2(n);
            memo[n] = result;   // 동일한 연산이 들어오면, 이걸 하지 않게
        }
        return result

    }

    function str2(n){
        return `${n}`
    }