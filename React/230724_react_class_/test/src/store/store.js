
import {configureStore} from "@reduxjs/toolkit";
import { countSlice, countSlice2 } from "../features/countSlice";


// 저장소 생성
export const store = configureStore(
    {
        reducer : {
            // 가게 만들어서 메뉴판 전달 
            count : countSlice.reducer, 
                // 객체가 아니라, 
                // countSlice 안에 있는 reducer 를 전달해야 함 ⭐⭐

            count2 : countSlice2.reducer, 

        } , 
        // middleware : 
            // 미들웨어 함수 사용했었는데, 지금은 이제 키값을 읽어서 해줌 
            // 더 사용이 편해짐 
    }
)