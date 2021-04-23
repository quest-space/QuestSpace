import React from "react";
import CardsContainer from "./CardsContainer";
import JumbotronWithTabs from "./JumbotronWithTabs";
import MainNavbar from "./MainNavbar";
import PageFooter from "./PageFooter";
import QSAdminNavbar from "./QSAdminNavbar";
import JumbotronWithTabsQSAdmin from "./JumbotronWithTabsQSAdmin";

const QSAdminHomepage = () => {
  const [tab, setTab] = React.useState("home");
  return (
    <div>
      <QSAdminNavbar setTab={setTab} />
      <JumbotronWithTabsQSAdmin setTab={setTab} />
      <h1 align="center">idhar cards ayien ge</h1>
      {/*<CardsContainer setTab={setTab} tab={tab} />*/}
      <PageFooter />
    </div>
  );
};

export default QSAdminHomepage;
