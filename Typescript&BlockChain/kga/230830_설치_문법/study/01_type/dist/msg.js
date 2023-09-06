"use strict";
// // js 방식 
//     const msg = 'hello javascript';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // ts 방식  
//     const msg2 : string = 'hello typescript';
//     console.log(msg2);
//     export default msg2
const userService_1 = __importDefault(require("./user/userService"));
const testMessage2 = "hello world";
console.log(userService_1.default);
console.log(testMessage2);
