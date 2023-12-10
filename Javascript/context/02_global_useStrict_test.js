'use strict'

// 1) use strict 를 안 한 경우
    console.log(this)
        // {} 

    console.log( this == global)
        // false

        
// 2) 'use strict 한 경우
    console.log(this)
        // {} 

    console.log( this == global)
        // false

/*
    동일 한데? 
        음... 어려운데? 

Node.js 환경에서 `'use strict'` 모드의 동작에 대해 설명드리겠습니다. 일반적으로 `'use strict'` 모드에서는 함수가 어떻게 호출되었는지에 따라 `this` 값이 달라질 수 있습니다. 그러나 전역 실행 컨텍스트의 경우, Node.js의 특정 동작 때문에 `this`의 값이 조금 다르게 나타날 수 있습니다.

1. **Node.js의 전역 컨텍스트**: Node.js에서 전역 스코프에서 `this`를 사용할 경우, 이는 빈 객체를 가리키는 것으로 나타납니다 (`{}`). 이는 Node.js가 모듈을 처리하는 특별한 방식 때문입니다. Node.js에서 각 파일은 별도의 모듈로 취급되며, 전역 스코프는 실제로 모듈의 스코프입니다. 따라서 `this`는 전역 객체 (`global`)가 아닌 현재 모듈의 `exports` 객체를 가리키게 됩니다.

2. **'use strict' 모드**: 일반적으로 `'use strict'` 모드에서 함수 내부에서 `this`를 사용하면 `undefined`로 설정됩니다. 하지만 이것은 함수가 "자유로운" 상태에서 호출될 때 적용됩니다. 즉, 메소드나 생성자가 아닌 일반 함수에서 `this`를 참조할 때입니다. 전역 컨텍스트에서는 `'use strict'`가 선언되어도 `this`가 `undefined`로 설정되지 않고, 여전히 모듈의 `exports` 객체를 가리킵니다.

따라서, 여러분이 경험하신 것처럼 Node.js 환경에서 전역 스코프에서 `'use strict'`를 사용하더라도 `this`는 `undefined`가 아닌 빈 객체 (`{}`)를 가리키는 것이 정상입니다. 이는 Node.js의 모듈 시스템과 전역 스코프의 독특한 처리 방식 때문에 발생하는 것입니다.
*/
