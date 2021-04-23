import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import { useHistory, history, Link } from "react-router-dom";
import QSAdminDropdown from "./QSAdminDropdown";
import "../css/NavBar.css";

const QSAdminNavbar = (props) => {
  const [disp, setDisplay] = React.useState("none");

  const flipDisplay = (ev) => {
    ev.preventDefault();
    if (disp == "none") {
      setDisplay("inline-block");
    } else setDisplay("none");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        boxShadow: "0px 4px 15px -2px rgba(0, 0, 0, 0.2)",
        paddingLeft: "9%",
        paddingRight: "9%",
      }}
    >
      <button
        className="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a
          className="d-none d-sm-none d-md-none d-lg-block navbar-brand"
          href="#"
        >
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

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {/* changed to Link */}
            <span
              className="nav-link"
              style={{
                fontWeight: 400,
                fontSize: 18,
                fontFamily: "Barlow",
                marginRight: "1.5rem",
                lineHeight: "1.6",
                color: "#313131",
              }}
            >
              QuestSpace Admin
            </span>
          </li>
          <QSAdminDropdown />
        </ul>
      </div>
    </nav>
  );
};

export default QSAdminNavbar;
