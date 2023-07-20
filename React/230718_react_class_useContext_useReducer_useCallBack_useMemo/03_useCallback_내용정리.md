

## [react hook 함수] useCallBack 함수 




### 포인트 

```
1. '메모제이션' 기법 

2. 메모제이션은 '최적화' 에서 필수적으로 사용됨 ⭐⭐⭐ 
	- 필수적으로 익히자.

3. 그러면, 왜 최적화에 도움이 되나? 
	- 타겟 변수가 변화하지 않으면, 연산하지 않음 
	- 그 이유는, 동일한 연산 또는 값이 나오는 경우엔, 기존 메모리에 저장된 걸 사용해서, 메모리를 아낌. 
	- 메모리를 아끼다가, ⭐타겟 변수가 변경될 때만 계산⭐ 하게 됨 ⭐⭐⭐⭐⭐ 그래서, 최적화에 도움이 됨. 

```

<br>

### 필기 및 소스 코드 

> https://bit.ly/3DjAP4E (깃 주소)
> C:\Users\user11\Desktop\kga\studynote\React\230718_react_class_useContext_useReducer_useCallBack_useMemo\test\src\callback (로컬)

<br>

### 셋팅 

```
[라이브러리 임포트]
import React, { useCallback, useState } from 'react'
```

<br>

### 작동 흐름 

```
- useCallback 을 사용하면 
1) 내가 원하는 함수 가 
2) 특정 변수가 변화할 때만! 움직이게 할 수 있음. 

- 동일한 계산(연산) 이고, 동일한 값이면, 추가적인 연산을 하지 않고, 메모리에 갖고 있게 됨. 
- 메모리에 저장된 것과 다른 경우에만, 메모이제이션 콜백을 반환해서 사용한다. 
- 따라서, 메모리를 아낄 수 있어서, 최적화에 도움이 된다. 

```
![](https://i.imgur.com/hR3eKlV.png)



