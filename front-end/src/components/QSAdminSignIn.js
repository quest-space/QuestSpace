import React from "react";
import PageFooter from "./PageFooter";
import "../css/QSAdmin.css";
import QSAdminSignInCard from "./QSAdminSignInCard";
import questspace from "../img/landing/questspace.png";
import QSAdminBasicNavbar from "./QSAdminBasicNavbar";

const QSAdminSignIn = () => {
  return (
    <div>
      <QSAdminBasicNavbar />
      <div
        id="bgimg"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img className="logoimg" src={questspace} />
        <QSAdminSignInCard />
      </div>
      {/*<PageFooter />*/}
    </div>
  );
};

export default QSAdminSignIn;
