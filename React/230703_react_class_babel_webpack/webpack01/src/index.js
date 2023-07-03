// 이게 진입점! 이 될 것 임 

const home = require("./pages/home")

console.log(home.name);

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(React.createElement("div" , null , home.name));
    // 가운데는 null 요소는 '옵션!' 임. 
