import styled from "styled-components"



export const LoginBoxInput = styled.button `
    border : 2px solid red;
    width : 200px; 
    height : 50px;
`
    // 선언이 되고 나서 사용해야 하기 때문에 위로 올림 ⭐⭐⭐⭐⭐⭐ 
    // 이 다음 & ${LoginBoxInput} 이렇게 사용됨 


// 만들고 싶은 태그 div 에 스타일을 적용시켜서, 내보내자 
export const LoginBoxWrap = styled.div `
    border : 1px solid;
    background-color : blue;
    width :  ${(props) => props.width  || "500px" } ;  
        // props 값 받아서 쓰는 경우 
        /* 있으면 props 값 , 없으면 500px 보여줘라 */

    height : 500px;

    & .login-title {
        color : white;
        font-size : 20px;
    }

    & ${LoginBoxInput} {
        background-color : red
    }   
        /* 스타일 컴포넌트 안에 있는거 안에 적용할 때 */

`
    // [vscode-styled-components 익스텐션 설치]
        // 여기 문자로 뜨면 vscode-styled-components 익스텐션 설치 ⭐⭐⭐ 

    // [& .login-title 해석]
        /* $ : 현재 스타일을 적용받고 있는 것 대상  */
        // 한칸 띈다 : 자식으로 들어가게 된다. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
        // login-title : 이게 이제 자식으로, login-title 이름을 가진 태그에 들어가게 된다. 


