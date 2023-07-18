


import React, { useMemo, useState } from 'react'


const Memo = () => {
    const [count , setCount] = useState(0);
    const [count2 , setCount2] = useState(0);
    
    const handleCount = () => {
        console.log("나 count");
        setCount(count + 1);
        // setCount2(count + 1);   // 이렇게 하면 주시하고 있는 값이 바뀌기 때문에 계속 찍힘 ⭐⭐⭐⭐⭐⭐⭐⭐
    }
        
    const handleCount2 = useMemo(() => {
        console.log("나 count 2")
        return (count2 + 1)
    } , [count2])
    // count2 를 주시하고 있다가, 값이 변하면, 새로운 값으로, 업데이트!!!!!!!!!!!! ⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
    
    // useMemo 사용 안 한 경우 ⭐⭐ 이거 하고 useMemo 사용한거랑 비교
        // const handleCount2 = () => {
        //     console.log("나 count 2")
        //     return (count2 + 1)
        // }
        // count2 를 주시하고 있다가, 값이 변하면, 새로운 값으로, 업데이트!!!!!!!!!!!! ⭐⭐⭐⭐⭐⭐⭐⭐⭐ 


    {/* 
            주시할 값을 주고, 
            컴포넌트가 바뀔지 안 바뀔지를 우리가 관리

            즉, 컴포넌트의 리렌더링을 관리하고 싶을 때 ⭐⭐⭐⭐⭐⭐ 
            부모컴포넌트가 리렌더링 되면, 자식 컴포넌트가 리렌더링 되는데, 
            만약, 부모 컴포넌트 안에 자식 컴포넌트가 많으면, 다 리렌더링 될 것. 
            부모 컴포넌트 안에 자식 컴포넌트가 매우 많으면, 전부 리렌더링 될 텐데 
            그러면, 페이지가 최적화가 되지 않음. 

            이때 useMemo 를 사용해서 
            주시할 값을 2번째 매개변수로 전달(count2)
        
        */}
        

  return (

    <div>
        <p> Memo </p>
        <button onClick={handleCount} > 더하기 </button>
            {/* 더하면 -> 리렌더링 되어서 -> 다시 그리게 될 것 */}
        <p> count : {count} </p>
        <p> handleCount2 : {handleCount2} </p>
        
    </div>
  )
}

export default Memo