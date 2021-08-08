import React from "react";
import ReactDOM from "react-dom";

require('purecss');

class Brew extends React.Component {
  render() {
    return (<div style="visible: none;">Hello {this.props.name}</div>);
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Brew name="wordzz" />, mountNode);