import React from "react";
import CardsContainerQS from "./CardsContainerQS";
import PageFooter from "./PageFooter";
import QSAdminNavbar from "./QSAdminNavbar";
import JumbotronWithTabsQSAdmin from "./JumbotronWithTabsQSAdmin";

const QSAdminHomepage = () => {
  const [tab, setTab] = React.useState("pending");
  return (
    <div>
      <QSAdminNavbar setTab={setTab} />
      <JumbotronWithTabsQSAdmin setTab={setTab} />
      {/* <h1 align="center">idhar cards ayien ge</h1> */}
      {/*<CardsContainer setTab={setTab} tab={tab} />*/}
      <CardsContainerQS tab = {tab}/>
      <PageFooter />
    </div>
  );
};

export default QSAdminHomepage;
