import {createSlice , createAsyncThunk } from "@reduxjs/toolkit"

import axios from 'axios' // axios 설치 

// createSlice 메서드를 사용해서, create 함수를 가지고 있는 객체를 만듦
export const countSlice = createSlice({
    
    // Slice 함수 구분 이름
        // 이름으로 구분하기 위해서 사용
    name : "count"  , 

    // 초기값 
    initialState : {num : 0}, 
    reducers : {
        add : (state) => {
            // state 에 이전 상태가 매개변수로 들어온다. 
            state.num += 1;
        }, 
        remove : (state) => {
            state.num -= 1;
        } 
    }

})


// api 가 따로 없으니, 날씨 api 썼던 것 가져온다 ⭐⭐⭐ 
export const temp = createAsyncThunk("/temp" , async(name) => {
    // axios 설치 
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ebac80908ace01c984f9989655759128`)
    
    const { data } = resp;
    
    console.log(data);

    return data;

})


// createSlice 메서드를 사용해서, create 함수를 가지고 있는 객체를 만듦
export const countSlice2 = createSlice({
    
    // Slice 함수 구분 이름
        // 이름으로 구분하기 위해서 사용
    name : "count2"  , 

    // 초기값 
    initialState : {num : 0 , value : "나 상태"}, 

    // 동기적인 작업을 처리 한다. 
    reducers : {
        add2 : (state) => {
            // state 에 이전 상태가 매개변수로 들어온다. 
            state.num += 1;
        }, 
        remove2 : (state) => {
            state.num -= 1;
        }
    }, 

    // 비동기 처리는 여기에서 작성해라! 라고 만들어짐 
    extraReducers : ( builder ) => {
        // extraReducers 의 builder 매개변수로 받고, case 를 추가 하는데, 
        // 상태의 케이스를 추가
            // 로딩중, 완료 케이스, 실패 케이스 등록
            // 상태 케이스를 등록 해준다. 
        
            // builder.addCase()
                // 케이스 추가 

        // 로딩중 케이스 
        builder.addCase(temp.pending, (state , action) => {
            // action : 어떤 타입이로, 어떤 payload 가 전달되었는지 들어온다. 
            state.value = "로딩중임"
        })

        // 완료 되었을 때 케이스
        builder.addCase(temp.fulfilled, (state , action) => {
            state.value = "완료"
            state.num += 1;
        })

        // 실패 했을 때 케이스 
        builder.addCase (temp.rejected, (state, action) => {
            state.value =  "실패";
        })

    } 
    
        // 이렇게 해라~ 라고 만든 것 임 ⭐

})

    // https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ebac80908ace01c984f9989655759128

// 액션 함수를 내보내서, dispatch 로 전달해서, action 발생 시킬거임! 
    export const {add, remove} = countSlice.actions;
    // add 라는 걸 dispatch 로 던지면, 이제, 상태가 변경되는 것 임. 
    // countSlice 에서 받아와서, 내보내줌 
    
// countSlice 내보낸 객체를 reducer 메뉴판 공간에 전달 
    export const {add2, remove2} = countSlice2.actions;