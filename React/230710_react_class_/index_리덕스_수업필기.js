// 🔹 리덕스 
    // 쉽게 생각하면, 그냥 값 전달 


// 🔹 store, action, 리듀서 가 있음. 

// 🔹 store 
    // 상태가 관리되는 오직 하나의 공간
    // 컴포넌트와 별개로, store 라는 메모리 공간이 있어서,
    // '필요한 상태값'을 담아둔다. 

    // 컴포넌트에서, '전역으로 상태값'이 필요할 때, 'store 에 접근'해서, 데이터를 가져온다. 


// 🔹 action
    // store 에 전달할 데이터를 자칭 액션을 사용해서, '스토어에 데이터를 보낸다'.
    // action 은 자바스크립트 '객체 형식' 으로 만들어져 있다. 
    // 1) dispatch 함수를 사용해서, 인자(매개변수) 로, action 을 전달하면, 
    // 2) 리듀서가 호출되면서, 매개변수로 action 을 받게 되고 
        // dispatch(action) 이렇게 하면 => 리듀서가 호출되면서, 리듀서에 액션을 전달한다.


// 🔹 리듀서 
    // dispatch 함수를 통해, action 을 '리듀서 함수' 에 전달한다. 
    // 1) '리듀서 함수' 는 인자값(매개변수)으로, 전달받은 action 이 뭔지 보고 
    // 2) store 에 상태를 업데이트 할지 여부를 결정한다. 
        // store 는 최종 상태가 있는 곳 
        // action 관리는 리듀서 
    
    // 백반집 = 스토어 
    // 메뉴 = REDUCTION 
    // 주문 = ACTION 



// 🔹 리덕스란 
    // 리액트에서 사용할 수 있는 하나의 라이브러리 
    // 리액트는 자식 컴포넌트에 props 로 전달받은 값을 사용하는데 
    // 다른 컴포넌트와 데이터 공유를 직접 하기 불가능함. 

    // 그래서, '공유해야 할 데이터' 를 공유받는 자식 컴포넌트들이 사용할 때,  '
    // 공통적인 부모' 개념으로 '스토어' 를 만들어서, 
    // 데이터를 공유할 수 있도록 만들어 준 것.

    // 리액트의 데이터 흐름은 '단방향', 이라서, 
    // 이러한 단점을 보완하기 위해 만들어짐. 

    // 리액트는 view 가 장점인데, 단방향이면, 이거 관리하는 것도 힘듦. 
    // 리덕스는 사용하면 좋은데, 많이 어려워 함. 
    // 초반에 어려워 함. 

    // 쉽게 말하면 
        // 데이터를 직접 부모에게 받는게 아니라, 
        // 컴포넌트가 직접, 전역 상태를 담은 스토어에
        // 값을 요청하고, 값을 전달 받을 수 있다. 

    // '직접' 이라는게 뭐지? 
        // 스토어에 있는 데이터를 변수에 값을 넣는 것 처럼, 바로 바꿀 수는 없음. 
        // dispatch 라는 함수를 사용해서, 값을 전달할 수 있다. 


// 🔹 리덕스의 동작 구조 
    // 컴포넌트에서 -> userDispatch 라는 훅 함수를 사용 -> Action 이 실행됨 -> 리듀서가 action 을 캐치함 -> 리듀서가 업데이트 여부를 결정함 
    // 업데이트 할거면, store 에 업데이트 함 

    // 컴포넌트가 action 보내고 -> reducer 가 전달받고 -> reducer 가 업데이트 할지 여부 체크하고 -> store 값 최신화(store에 업데이트 한다.) 시켜준다. -> 사용자는 이 최신화된 걸 받아서 쓸 수 있다. 

    // 다시     
        // 1) "김볶 주문할게요~ 김볶 주세요~" 
            // dispatch(action)?????? | 주문하고 싶은걸 action 에 담아? 
            // 컴포넌트가 김볶을 주문한다
            // 컴포넌트가 action 보내기
            // 그러면, action 은 보내고 싶은 데이터 ?
            // 
        // 2) reducer 가 주문을 확인함 
            // 네에~ 김볶 주문 확인이요~ (리듀서가 action 을 캐치)
        
        // 3) 리듀서가 업데이트 여부를 결정함 

        // 4) 리듀서가 store 에 업데이트 함 

        // 5) 컴포넌트는 업데이트 된 걸 씀

// 🔹 메뉴, 메뉴판, 
    // action 은 동작할 기능, 이름, 행동 (== 메뉴 이름)
    // reducer 함수를 실행해서 , 내가 동작할 기능을 조건문으로 작성해둔 파일 == (메뉴판)
    // 컴포넌트가 어떤 action 을 실행시킬지, reducer 함수로 받고, store 에 값을 최신화시킨다. 
    // store 의 값이 바뀌면, '전역 상태'를 가져오고 있는 '컴포넌트들이 리렌더링' 된다. 


// 🔹 설치 명령어 
    // npm install redux
        // 리덕스만 설치 
        // 설치 폴더 : 리액트 폴더로 들어가서 설치 

    // npm install react-redux
        // 리액트에서 리덕스 쓸 수 있게 도와주는 라이브러리 

    // provider 로 감싸줘서 자식이 사용할 수 있게 해줌 
        // import { Provider } from 'react-redux';
        // 이렇게 하면 store 에 접근할 수 있게 해줌 
        // store 를 props 로 전달해야 함 
        // store props 는 자식 컴포넌트에 store 값을 주입해준다. 
        // redux 폴더 만들고 > store .js 만든다. 
        // 만든걸 index.js 에서 props 로 전달 



// 🔹 토이프로젝트 : 리액트, 리덕스가 어떻게 돌아가는지! 
    // 메인 페이지 -> 로그인 페이지 -> 음식 주문 페이지 -> 마이 페이지 

    // 주문한 음식들은 마이 페이지에 보이고, 
    // 로그인을 해야지, 음식 주문 페이지로 갈 수 있음. 
    // 로그인을 해야지, 마이 페이지로 갈 수 있음. 
    
    // react-router, react-redux

    // 포인트 
        // 컴포넌트를 여러개 써서, 전역상태를 바꾸고, 가져오는거! 
        // props 값 전달하지 말고 하기! 