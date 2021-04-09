import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './logos/logo.svg';
import "./css/App.css";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import Homepage from "./components/Homepage";
import MainNavbar from "./components/MainNavbar";
import InitialNavbar from "./components/InitialNavbar";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/homepage" component={Homepage} />
        <Route path="/Navbar1" component={InitialNavbar} />
        <Route path="/Navbar2" component={MainNavbar} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
