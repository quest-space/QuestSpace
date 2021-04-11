import React from "react";
import CardsContainer from "./CardsContainer";
import JumbotronWithTabs from "./JumbotronWithTabs";
import MainNavbar from "./MainNavbar";

const ParticipantHomepage = () => {
  const [tab, setTab] = React.useState('home')
  return (
    <div>
      <MainNavbar />
      <JumbotronWithTabs setTab={setTab}/>
      <CardsContainer tab={tab}/>
    </div>
  );
};

export default ParticipantHomepage;
