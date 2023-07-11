
// 날씨 관련 상태 업데이트 리듀서 함수 

let init = {
    weatherData : {  } , 
}

function reducer (state = init , action) {

    const {type, payload} = action

    switch (type) {
        case "GET_WEATHER":
            
            return {...state , weatherData : payload} ;
    
        default:
            return state;
    }
}

export default reducer