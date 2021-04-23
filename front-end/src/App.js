import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './logos/logo.svg';
import "./css/App.css";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import ParticipantHomepage from "./components/ParticipantHomepage";
import Header from "./components/Header";
import HostHomepage from "./components/HostHomepage";
import Round from "./components/Round";
import RoundDetails from "./components/RoundDetails";
import QuestDetails from "./components/QuestDetails";
import Quest from "./components/Quest";
import QuestEnrolled from "./components/QuestEnrolled";
import QSAdminHomepage from "./components/QSAdminHomepage";
import QSAdminSignIn from "./components/QSAdminSignIn";
import Search from "./components/Search";
import PopularQuests from "./components/PopularQuests";
import RoundLeaderboard from "./components/RoundLeaderboard";
import HostRound from "./components/HostRound";
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/qsadminsignin" component={QSAdminSignIn} />
        <Route exact path="/qsadminhomepage" component={QSAdminHomepage} />
        <Route
          exact
          path="/participanthomepage"
          component={ParticipantHomepage}
        />
        <Route exact path="/hosthomepage" component={HostHomepage} />
        <Route exact path="/round" component={Round} />
        <Route exact path="/qa" component={QuestEnrolled} />
        <Route exact path="/rounddetails" component={RoundDetails} />
        <Route exact path="/questdetails" component={QuestDetails} />
        <Route exact path="/header" component={Header} />
        <Route exact path="/viewprofile" component={ViewProfile} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route
          exact
          path="/participanthomepage/quest/:questID/round/:roundID"
          component={Round}
        />
        <Route
          exact
          path="/participanthomepage/quest/:questID/"
          component={Quest}
        />
        <Route
          exact
          path="/hosthomepage/quest/:questID/round/:roundID"
          component={HostRound}
        />
        <Route exact path="/searchresults" component={Search} />
        <Route exact path="/popularquests" component={PopularQuests} />
        <Route
          exact
          path="/participanthomepage/quest/:questID/round/:roundID/leaderboard"
          component={RoundLeaderboard}
        />
        <Route exact path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

export default App;
