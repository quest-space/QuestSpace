import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import "../css/NavBar.css";

const QSAdminBasicNavbar = () => {
  return (
    <nav
      className="navbar navbar-light"
      style={{
        boxShadow: "0px 4px 15px -2px rgba(0, 0, 0, 0.2)",
        paddingLeft: "9%",
        paddingRight: "9%",
      }}
    >
      <div>
        <a className="d-block d-sm-block d-md-block d-lg-block navbar-brand">
          <img
            src={questspacelogo}
            height="44"
            style={{ position: "absolute", top: "13" }}
          />
          <span
            style={{
              fontWeight: 400,
              fontSize: 29,
              fontFamily: "Barlow",
              paddingLeft: "3.5rem",
            }}
          >
            <span style={{ color: "#415F78" }}>Quest</span>
            <span style={{ color: "#46B7A1" }}>Space</span>
          </span>
        </a>
      </div>
    </nav>
  );
};

export default QSAdminBasicNavbar;
