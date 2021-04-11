import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './logos/logo.svg';
import "./css/App.css";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import ParticipantHomepage from "./components/ParticipantHomepage";
import Header from "./components/Header";
import InitialNavbar from "./components/InitialNavbar";
import QuestDetails from "./components/QuestDetails";
import HostHomepage from "./components/HostHomepage";
import Round from "./components/Round";
import RoundDetails from "./components/RoundDetails";
import ViewProfile from "./components/ViewProfile";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/participanthomepage" component={ParticipantHomepage} />
        <Route path="/hosthomepage" component={HostHomepage} />
        <Route path="/round" component={Round} />
        <Route path="/navbar1" component={InitialNavbar} />
        <Route path="/quest" component={QuestDetails} />
        <Route path="/rounddetails" component={RoundDetails} />
        <Route path="/viewprofile" component={ViewProfile} />
        <Route path="/header" component={Header} />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
