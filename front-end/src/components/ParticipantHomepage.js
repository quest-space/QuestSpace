import React from "react";
import CardsContainer from "./CardsContainer";
import JumbotronWithTabs from "./JumbotronWithTabs";
import MainNavbar from "./MainNavbar";
import PageFooter from "./PageFooter"


const ParticipantHomepage = (props) => {

  const [tab, setTab] = React.useState(props.location ? (props.location.state ? props.location.state.tab : 'home') : 'home');

  return (
    <div>
      <MainNavbar setTab={setTab} />
      <JumbotronWithTabs setTab={setTab} tab={tab} />
      <CardsContainer setTab={setTab} tab={tab} />
      <PageFooter />
    </div>
  );
};

export default ParticipantHomepage;
