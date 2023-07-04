// 이거 꿀팁⭐⭐⭐ 
// ES7 react/redux 익스텐션
    // ES7+ React/Redux/React-Native snippets 이거 설치 
    // rcc 누르면 -> 클래스 컴포넌트가 만들어짐 
    // rafc -> 이건 함수 컴포넌트


    // import React, { Component } from 'react'
    
    // export default class Mycom3 extends Component {
    //   render() {
    //     return (
    //       <div>나는 컴포넌트 3</div>
    //     )
    //   }
    // }
    


// ---------------------- 실습중 👇👇👇👇👇👇👇 ------------------------- 

// 라이프사이클 생명주기 ⭐⭐⭐⭐⭐⭐⭐ 
    // 다 그려지고 -> componentDitmount 가 실행됨 
    // 그러다가 변화하면 -> componentdidupdate 가 찍힘 


// ----------- 함수형 컴포넌트 👇👇👇👇👇👇 --------------------

// 함수형 컴포넌트 만든 이유 
    // 클래스 컴포넌트 이후 직관성 때문에 만들어짐 
    // 옛날 코드들은 클래스 컴포넌트로 개발되어 있을 가능성이 높음. -> so, 클래스 컴포넌트 볼 수 있어야 


// rafce : 리액트 arrouw function component export 의 줄임말 | 그 익스텐션 설치하면 쓸 수 있음.


// 함수형 컴포넌트에서 state 와 props 값은 어떻게 관리해야 하나 
    // react hook 이 나옴 
        // use state, useEffect 라는 hook 이 있음. 
            // useState 는 상태값을 만들어 준다. 상태값을 수정할 때, 사용할 메서드를 만들어준다. 
            // useEffect 는 '라이프사이클' 을 지원한다. 
                // componentDidMount 같은 거 

    import React, { useEffect, useState } from 'react'

    // 함수형 컴포넌트의 props 값은, 함수의 매개변수로 전달된다. 
        // 1) num 으로 전달했으니까, num
        // 2) 구조분해할당해서 바로 상관해도 됨.
    const Mycom3 = ( {newnum , newnum2} ) => {

        // 1) console.log(props.newnum) 
            // 그냥, props 로 쓰는 경우 
        // 2) 여러개 전달해서 구조분해할당 쓰는 경우 | 여러개 값을 구조분해할당을 가져올 수 있음. 
            console.log(newnum, newnum2)

        // count 변수 선언 
        let count = 0;
            // 처음부터 컴포넌트를 다시 읽는다. -> 그래서 count 는 계속 0 으로 선언되고, 초기화 되고 -> 그 다음 다시 1 이 된다. 
            // 즉, 리렌더링 되면, '다시 처음부터 코드를 읽는과정' 에서 '변수가 초기화' 된다 -> 그래서, 계속 1 이 나옴 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

        // useState
            // 첫 번째 반환값 = 상태변수, 이게 변하면, -> 리랜더링 된다.  
            // 두 번째 반환값 = 상태변수를 업데이트할 setState 함수.
                // so, num 값을 변경할 때, setNum 함수를 이용해서 변경! 
                // 예전엔, name 만 변경하기 어려웠어   
                // now, 상태값을 줘서, num 이 변경되었을 때, 
                // 이 함수로만 수정해라! ✅✅ 라는거 

        // userState 매개변수로 전달한 값이 초기값
            // 숫자, 문자열, 모두 가능 
            const [num , setNum] = useState(0);
            const [active , setActive] = useState(false)


        // useEffect 
            // 라이프사이클 함수
            // useEffect 의 첫 번째 매개변수로 '함수' 를 전달하고, 두 번째 매개변수로 '배열' 을 전달한다.  
            // 첫 번째로 전달한 함수가 -> 두 번째 배열을 확인하고 -> 조건에 따라서 실행시킴. 
            // 첫 번째로 전달한 함수를, 두 번째 매개변수의 상태를 확인하고, 실행시킨다. 
            // []  빈 배열을 전달한 경우, componentDidMount 를 의미
            // [num] : 배열에 전달된 값이 수정된 경우에 실행. -> componentDidMount, componentDidUpdate 두 개 모두 실행됨
            useEffect( () => {
                console.log("componeneDidMount")
            } , [] )
                // 빈배열일 경우, 초기에 한번, 실행

            useEffect( () => {
                // 제어문을 사용해서 만들어주면 된다. 
                console.log(" componeneDidMount, componentDidUpdate,")
                console.log("상태(state) : " , num)  //  ⭐⭐⭐⭐⭐ 여기는 딜레이 되잖아? 이거는 곧바로 나오고? ❓❓❓ 📌📌📌📌📌 
                    // component update 안에 넣어야 , 바로 찍힌다. ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
                    // 상태가 변화한 이후의 값을 사용하는 라이프 사이클 함수 
                console.log("나는 num")
            } , [num] )
                // 업데이트 마다 실행됨 
                // 빈 배열이면 -> did mount 
                // 뭔가 있으면 => update 

                // '배열에 전달한 값' 을 주시함 
                    // so, update 때 num 이 변경되면 -> 이 num 을 갖고 있는 업데이트 함수만 실행된다. 

            useEffect(() => {
                console.log("나는 active")
            } , [active])
                // active 가 변경된 경우엔, active 를 주시하고 있는 놈만 실행된다. 

            // then, 여러가지 값을 주시하게 하려면? 
                // 배열에 여러가지 값을 전달하고, 둘 중, 하나만 변해도, 업데이트 함수 실행됨. 
            useEffect(() => {
                console.log("num 이나 active 가 변경 됐어!")
            }, [num, active])

            function clickHandler() {
                console.log("클릭됨")       // 클릭할 때 마다, 증가되는 
                // 상태를 변경 👉 리액트는 컴포넌트를 다시 그림(render) 다시 하고 -> 그 다음 componentDidUpdate 가 다시 실행됨 
                // 상태값을 사용하는 이유
                    // 이전의 상태값이 보관이 됨. 
                    // 그래서, 상태값이 계속 유지가 됨. 
                setNum(num + 1);
                count ++;
                console.log("일반변수 : " , count);
                    // 응? 근데 계속 1 이네? 
                    // 리액트는 다시 그려짐 
                    // 처음부터 컴포넌트를 다시 읽는다. -> 그래서 count 는 계속 0 으로 선언되고, 초기화 되고 -> 그 다음 다시 1 이 된다. 
                    // 즉, 리렌더링 되면, '다시 처음부터 코드를 읽는과정' 에서 '변수가 초기화' 된다 -> 그래서, 계속 1 이 나옴 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
                    // 그러면, 유지하고 싶은 값은 어디에 보관? 
                        // 그냥 변수가 아니라, '상태값' 에 보관!!!!!!!!!!!!!!!! ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
                console.log("상태(state) : " , num) // ⭐⭐⭐⭐⭐ 여기는 딜레이 되잖아? ❓❓❓ 📌📌📌📌📌 
                    // 상태가 변화가 되면, 바로 확인을 못 함 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
                    // componentDidUpdate ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 
                    // 즉, 상태값을 수정하고, 바로 값을 사용하면 안 돼 / 이전 값이 나옴 / 왜 이전값이 나와❓❓❓❓❓❓ 
            }

            function activeHandler() {
                setActive(!active);
            }

            return (
                <div>
                    <button onClick={clickHandler} > 클릭 </button> 
                    <button onClick={activeHandler} > 활성화/비활성화</button> 
                </div>
            )
    }
    
    export default Mycom3



// props 는 어떻게 받아? 
    // 그냥 매개변수로 우선 넣어주면 돼 