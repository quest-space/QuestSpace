import React from "react";
import CardsContainer from "./CardsContainer";
import JumbotronWithTabs from "./JumbotronWithTabs";
import MainNavbar from "./MainNavbar";
import PageFooter from "./PageFooter"


const ParticipantHomepage = () => {
  const [tab, setTab] = React.useState('home')
  return (
    <div>
      <MainNavbar setTab={setTab} />
      <JumbotronWithTabs setTab={setTab} />
      <CardsContainer setTab={setTab} tab={tab}/>
      <PageFooter />
    </div>
  );
};

export default ParticipantHomepage;
