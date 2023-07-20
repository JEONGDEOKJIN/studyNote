## [react hook 함수] useContext 


### useContext 가 필요한 이유
```
- react 는 '단방향' 임. (그래서, 부모가 props 로 데이터를 전송해주지 않으면, 자식은 아무것도 못 함)

- 그래서, '전역 상태' 를 관리하는 방식이 필요함. 

- '전역 상태 관리 방식' 으로서 reducer, store 방식도 있음. (어떤 것을 사용할지는 개발자의 판단에 따라 다름)

- 지금은, react hook 함수로서 전역 상태 할 수 있는 방법을 배울 것 임. hook 함수 중 하나로 useContext 를 배움 
```

### 셋팅 방법 

- import 하기 
```
import React , {createContext , useContext} from 'react'
```

- 객체 생성 
```
const Global = createContext()
    // createContext() 함수를 호출해서 Global 객체 생성
    // context 객체 생성
```

- 전체 참고 코드 
> 👉 https://bit.ly/3DktguC (깃주소)
> 👉 내 로컬 주소 (context 파일 안에 있음.) :  
>C:\Users\user11\Desktop\kga\studynote\React\230718_react_class_useContext_useReducer_useCallBack_useMemo\test\src\context 




### 전체 흐름

```
- 포인트 
1. 부모(context 컴포넌트) 컴포넌트에서 1) obj 만들고 2) value 에 담아서 3) Global.Provider 로 4) 직계 자손 한명(Context01)에게 '꽂아준다.'

2. 부모의 자식들은, 직접 받지 않아도 사용할 수 있다. 
	ex) Context02 는 직접 obj 를 받지 않았는데 사용 가능 ⭐⭐⭐
```

![](https://i.imgur.com/zUi89IE.png)


### 중요 포인트 

``` js
1. 처음 꽂아줄 때는, 'value' 라는 정해진 이름을 써야 함
<Global.Provider value={ obj }>

2. Context02 는 obj 를 직접 전달 받지 않아도, Context01 의 자식 이라는 이유로 obj 에 접근 가능 (전역 객체 처럼 사용 가능)

3. redux 에서 변경되고 👉 '일부만 변경된 경우' 사용 할 수 있음. 
```



