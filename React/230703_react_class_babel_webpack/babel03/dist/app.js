class App extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, "list 01\uBC88"));
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

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render( /*#__PURE__*/React.createElement(App, null));
