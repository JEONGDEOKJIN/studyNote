
import React from "react";

import {createRoot} from "react-dom/client";
    // react 버전 18 부터, 
    // react-dom/client 에서 createRoot 메소드를 사용하라고 권장함. 


import App from "./app"

const root = createRoot(document.querySelector("#root"))

root.render(<App />)

// 그려줄 컴포넌트가 필요 
