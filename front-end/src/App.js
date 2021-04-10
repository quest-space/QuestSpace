import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './logos/logo.svg';
import './css/App.css';
import LandingPage from "./components/LandingPage"
import SignUpPage from "./components/SignUpPage"
import SignInPage from "./components/SignInPage"
import Cards from "./components/Cards"

const App = () => {
  return (
    <Router>
      <Switch>
        
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/card" component={Cards} />
        <Route exact path="/" component={LandingPage} />
        

      </Switch>
    </Router>
  )
}

export default App;
