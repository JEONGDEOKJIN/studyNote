
import React from 'react'

// import {img01 , img02, img03} from "../img"
    // img 폴더 까지 하면 -> index.js 로 가서 -> 가져온다. 


const Block = ({data , name, result}) => {

    let temp = " ";     
        // 이 순간 이 값은 증발하게 된다 ⭐⭐⭐⭐⭐⭐⭐ | 필요한 이유는 컴퓨터랑 유저랑 다른 결과가 필요
    if (name === "유저") {
        temp = result;
    } else {
        // result == "무승부면", 문제 없음. 그냥 놔둬도 됨. 
        // result == "이겼음" 이면 -> 반대로 졌다! 를 보여줘야 함. 
        // result == "졌다" 면 -> 이겼다 로 보여줘야 함. 
        if(result != "")
        temp = result === "무승부" ? "무승부" : result === "이겼음" ? "졌음" : "이겼음"
    }

    return (
    <div className='block'>
        <div> {name} </div>
        {/* 리액트에서 이미지 import 하는 방법 */}


        {/* 조건부 렌더링 ⭐⭐⭐⭐⭐⭐⭐ 
            값이 없으면 -> 터지기 때문에, && 써서 많이 사용하게 됨. 
            즉, 값이 있으면 -> 값을 사용해~ 라는 구문 
            옵션 체이닝! data?img -> 이것도 많이 사용됨 
            */}
        <img src={data && data.img} alt="" />
        {/* <img src={img02} alt="" /> */}
        {/* <img src={img03} alt="" /> */}

        <div> {temp} </div>

    </div>
    )
}
// ✅ 이미지를 import 해서 가져와야 제대로 들어가진다. 


export default Block