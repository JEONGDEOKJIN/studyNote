


### 기본 개념 
```
// 🔹 SCSS
    // 스타일드 컴포넌트를 사용할 것 
        // 장점 
            // 클래스 명이 겹치지 않는다. 
            // 스타일에 관련되어서, props 로 값을 전달해서, 스타일 값을 적용할 수 있다.

        // 특징 
            // SCSS 를 다뤄봤으면, 친숙할 것 
            // 동적으로 할 수 있어 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

    // SCSS 설치 
        // npm i styled-components 
        // src > components 폴더 > layout 폴더 > loginBox 폴더
```







### 포인트 

1. 하나의 폴더에 다 몰아넣는다는 느낌으로 작업 

- 로그인 박스에 대해서는 이렇게 하나로 모아서 한다⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

![](https://i.imgur.com/GsMmVih.png)



2. 동적으로 만들기

- 동적으로 하려면? ⭐⭐⭐⭐⭐⭐ 
	- props 를 넘겨주는 방식으로 작성 
	- Login.styled.js 로 넘어가서 작성 

![](https://i.imgur.com/tyPb53c.png)
width 가 있으면 props width 를 넣고 
없으면 디폴트로 500px 를 전달 

- 이렇게 하면 width 안 넘어감 
![](https://i.imgur.com/WjXZED0.png)



3. 정리 
```
1. 하나의 컴포넌트라는 것. 
2. props 등의 값으로, 조건문 처리, 가 가능하다는 것. 
3.     width :  ${(props) => props.width  || "500px" } ;

4. 이건 모르겠음. 
    & .login-title {
        color : white;
        font-size : 20px;
    }
    
```

