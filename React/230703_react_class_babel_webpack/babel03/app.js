
class App extends React.Component {
    render() {
        return(
            <ul>
                <li>
                    list 01번
                </li>
            </ul>
        )
    }
}



// class App extends React.Component {
//     render() {
//         return (
//             <ul>
//                 <li>
//                     list 01 번
//                 </li>
//             <ul/>
//         )
//     }
// }



const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)