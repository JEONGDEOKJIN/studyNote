import React from 'react'

import { useLocation, useParams, useSearchParams } from 'react-router-dom'

    // useLocation
        // hook 함수 | 현재 브라우저의 url 위치값을 가져오는데 사용 

    // useParams 
        // hook 함수 
        // url 에 params 값을 접근하는데 사용 
        // params 값을 객체 형태로 가져올 수 있음. 

    // useSearchParams
        // url 에 ? 붙여서, 검색값을 가져왔었어 
        // hook 함수. url 의 쿼리값을 가져올 때 사용 
        // 문자열을 해석해서, 쿼리 매개변수 값을 가져온다. 

    

import { Header } from '../components'

const Detail = () => {

    // DB 에서 값을 받았다는 전제! 
    let temp = [ { num : 10, name : "셔츠" } , { num : 20, name : "바지" } , { num : 30, name : "모자" } , { num : 40, name : "장갑" } ]
        // search 할 때 filter 돌려도 되고 ⭐⭐⭐⭐⭐⭐ 

    const location = useLocation();
    console.log(location);
        // 현재 url 정보가 보임 / path, state 등 

    const params = useParams();
    console.log(params)
        // 이렇게 나오는 이유는 라우터에서 그렇게 설정했기 때문에 
        // useParams 는 파라미터를 객체로 편하게 뽑아줌!!!!! 

    const [query, setQuery] = useSearchParams();
    // console.log(query)
    // 쿼리에서 get 메서드. 쿼리문의 키로 값을 가져올 수 있음. 
        // id 에서 검색했는지, 
    console.log(query.get("a"))
    console.log(query.get("id"))
    // http://localhost:3000/detail/2/20/%EB%B0%94%EC%A7%80?id=11111111 이렇게 하면 -> value 인 11111111 이 나옴 
    console.log(query.get("num"))
        // http://localhost:3000/detail/2/20/%EB%B0%94%EC%A7%80?num=3333333 -> 값인 3333333

    return (
    <div>
        
        {/* ⭐⭐⭐⭐⭐⭐ 데이터 베이스에서 값을 가져와서 이런 식으로 값을 뿌려주면 됨!!  */}
        <Header name = {"상세페이지"} >   </Header>
        <div>  { temp && temp[params.id].num  } 번 </div>
        <div> 이름 { temp && temp[params.id].name  }  </div>
        
    </div>
    )

}

export default Detail