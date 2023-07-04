
import { Component } from "react";
    // import {Mycom , Mycom2} from "../components/Mycom";

import Mycom3 from "../components/Mycom3";
    // 1) 여러개일 경우 > 받을 때, 이렇게 구조분해할당! 으로 해줘야 함!
    // 2) 한 개만 받을 때는 > 구조분해 할당 안 해줘도 됨!!!!! 
import Header from "../components/Header";
// import Body from "../components/Body";
import Footer from "../components/Footer";


export default class Main extends Component {
    render() {
        return(
            <>
                
                <Header />

                {/* 메인 페이지 <br /> */}
                {/* <Mycom name="첫번째 컴포넌트" Cname="red" />
                <Mycom name="두번째 컴포넌트" Cname="blue"  /> */}
                {/* <Mycom2   /> */}

                <Footer />


                <Mycom3  newnum = {1}  newnum2 = {2}    />

            </>
        )
    }
}