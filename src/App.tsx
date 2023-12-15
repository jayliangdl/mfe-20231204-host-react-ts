import React from "react";
import ReactDOM from "react-dom";
import MyButton from "remoteReactTs/MyButton";
import VanillaMyVueJSButton from "remoteVueJs/VanillaMyVueJSButton"

import "./index.css";

const AppReactTsComponentInReactTs = () => (
  <div className="container">
    <div>Name: host</div>
    <MyButton/>
  </div>
);

// const AppVueJsComponentInReactTs = () => (
//   <div className="container" id="container1">
//   </div>
// );

ReactDOM.render(<AppReactTsComponentInReactTs />, document.getElementById("DivReactTsComponentInReactTs"));
VanillaMyVueJSButton(document.getElementById("DivVueJsComponentInReactTs"),{initnum:10,initstep:1})
