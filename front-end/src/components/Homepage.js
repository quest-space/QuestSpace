import React from "react";
import CardsContainer from "./CardsContainer";
import JumbotronWithTabs from "./JumbotronWithTabs";
import MainNavbar from "./MainNavbar";
import InitialNavbar from "./InitialNavbar";

const Homepage = () => {
  return (
    <div>
      <MainNavbar />
      <JumbotronWithTabs />
      <CardsContainer tab="My Quests"/>
    </div>
  );
};

export default Homepage;
