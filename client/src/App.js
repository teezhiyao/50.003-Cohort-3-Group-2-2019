import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home, Auth, Loggedin } from "./pages";
import { Login, Register } from "./containers/Auth";
import HeaderContainer from "./containers/Base/HeaderContainer";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Route exact path="/" component={Home} />
        <Route path="/Loggedin" component={Auth} />
        <Route path="/" component={Loggedin} />
      </div>
    );
  }
}

export default App;
