import React from "react";
import CardsContainer from "./CardsContainer";
import JumbotronWithTabs from "./JumbotronWithTabs";
import MainNavbar from "./MainNavbar";

const Homepage = () => {
  return (
    <div>
      <MainNavbar />
      <JumbotronWithTabs />
      <CardsContainer />
    </div>
  );
};

export default Homepage;
