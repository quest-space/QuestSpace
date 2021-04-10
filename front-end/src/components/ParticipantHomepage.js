import React from "react";
import CardsContainer from "./CardsContainer";
import JumbotronWithTabs from "./JumbotronWithTabs";
import MainNavbar from "./MainNavbar";

const ParticipantHomepage = () => {
  return (
    <div>
      <MainNavbar />
      <JumbotronWithTabs />
      <CardsContainer tab="My Quests"/>
    </div>
  );
};

export default ParticipantHomepage;
