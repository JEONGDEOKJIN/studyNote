import React, { useCallback, useState } from 'react'


// 공식 문서에 useCallBack 은 '메모이제이션 콜백을 반환' 한다는 내용이 있음. 
    // 메모이제이션 을 사용하기 위해 사용 
    // 최적화 하기 위해 사용 할 것 ⭐⭐⭐⭐⭐⭐ 
export const Callback = () => {

    const [count , setCount] = useState(0);
    const [count2 , setCount2] = useState(0);

    const handleCount = useCallback( () => {
        setCount( count + 1 );
    } , [count2]);
        // 첫 번째 매개변수 : 콜백함수를 전달하고, 
        // 두 번째 매개변수 : 배열을 전달한다. 
            // 이 배열에 들어가는 값이, 주시하는 값
            // 이 값이 바뀌었는지, 안 바뀌었는지 보고, 변경된 내용을 반환
            
        // count2 가 변했을 때, 콜백함수가 반환되게 한다. 


    const handle2Count2 = useCallback( () => {
        setCount2(count2 + 1);
    } , [count2])
        // count2 가 변하면 -> setCount2 가 변하니까
        // count2 가 변하기 전 까지는 '메모이제이션 콜백' 을 반환 한다 

  return (
    <div>
        <div>
            <h1> 첫번째 카운트 : {count} </h1>
            <p>나는 count2 가 변하지 않으면 안 변해!!! 메모리제이션된 콜백이다. </p>
            <button onClick={handleCount} > count </button>
        </div>
        <div>
            <h1> 두 번째 카운트 : {count2} </h1>
            <button onClick={handle2Count2} > count2 </button>
        </div>
    {/* 
        count 2 가 변해야지만 count 1 이 변함 
        계속 복잡한 연산, 계산이 있고, 그 연산이 동일한 값을 내보내는 경우, 
        메모이제이션 기법으로, 둉일한 연산일 경우, 
        메모리에 가지고 있다가, 
        사용하는 기법. 
        다른 결과가 필요할 경우에만, 
        다시 메모이제이션 콜백을 반환해서, 사용하는 것. 
        
        동일한 연산이면 반복하지 않을 것 
        최적화에 도움! 
    
    */}
        
    </div>
  )
}

export default Callback