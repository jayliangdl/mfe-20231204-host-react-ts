import React from "react";
import ReactDOM from "react-dom";
import MyButton from "remoteReactTs/MyButton";

import "./index.css";

const App = () => (
  <div className="container">
    <div>Name: host</div>
    <MyButton/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
