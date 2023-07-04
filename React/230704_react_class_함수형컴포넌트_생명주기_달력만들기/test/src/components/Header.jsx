
import React  , {useState, useEffect} from "react"
import Title from "./Title"
import HamburgerBtn from "./HamburgerBtn"
import DayOfWeek from "./DayOfWeek"
import Body from "./Body"
import WeekendShow from "./WeekendShow"


const Header = () => {

    // state 저장 및 변경 
    const [isOpen , setBodyActive] = useState(false);
        // 첫 번째 반환값 : 상태변수. | 상태변수가 변하면 리렌더링 된다. 
        // 두 번째 반환값 : 상태 변수를 업데이트할 setState 함수. 
        // [적용]
            // state 초기값으로 isOpen 변수에 false 를 저장해둠 
            // 변경할 때는 setState 함수인 setActive 로 변경

    const [isWeekend, setWeekend] = useState(false)


    function HamburgerHandler () { 
        setBodyActive(!isOpen)
        console.log("body 햄버거 버튼, 클릭 여부 data 확인중 👉 " , isOpen)
    }

    function weekendShow() {
        setWeekend(!isWeekend)
    }

    return(
    <>
        <div className="header_container" > 
            
            <div className="nav_container"  >
                <Title />

                <div className="buttons">

                    <div onClick={HamburgerHandler} >
                        <HamburgerBtn />
                    </div>

                    <div onClick={weekendShow} >
                        <WeekendShow   />
                    </div>

                </div>

            </div>

            <div className="dayOfWeek_container" >
                <DayOfWeek  isWeekendClicked = {isWeekend} />
            </div>

        </div>

        <Body isClicked = {isOpen}  isWeekendClicked = {isWeekend}  />
        
    </>
    )
}

export default Header

