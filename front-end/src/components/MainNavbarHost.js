import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import { useHistory, history, Link } from "react-router-dom";
import ProfileAndMobileView from "./ProfileAndMobileView";
import "../css/NavBar.css";

const MainNavbar = (props) => {
  const [disp, setDisplay] = React.useState("none");
  const [render, setRender] = React.useState(false);
  const [username, setUsername] = React.useState("");

  const flipDisplay = (ev) => {
    ev.preventDefault();
    if (disp == "none") {
      setDisplay("inline-block");
    } else setDisplay("none");
  };

  const ProfileAPI = async () => {
    const checkResp = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/who-am-i`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      }
    );

    const checkRespBody = await checkResp.json();
    setUsername(`${checkRespBody.organization}`);
  };

  if (!render) {
    setRender(true);
    ProfileAPI();
  }

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
        <Link
          className="d-none d-sm-none d-md-none d-lg-block navbar-brand"
          to="/hosthomepage"
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
        </Link>

        <ul className="navbar-nav ml-auto">
          {/* No search in HOST */}

          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" style={{ display: disp }} />
            <button onClick={flipDisplay} style={{ marginRight: "1.9rem", backgroundColor: "#ffffff", border: "none" }}><i className="fas fa-search"></i></button>
          </form> */}

          <li className="nav-item">
            {/* changed to Link */}
            <Link
              to="/hosthomepage"
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
              Home
            </Link>
          </li>
          <li className="navHover nav-item dropdown d-none d-md-none d-sm-none d-lg-block">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{
                fontWeight: 400,
                fontSize: 18,
                fontFamily: "Barlow",
                marginRight: "1.5rem",
                lineHeight: "1.6",
                color: "#313131",
              }}
            >
              Quests
            </a>
            <div
              className="hoverable dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
              style={{ border: "none", boxShadow: "none" }}
            >
              <Link
              style={{padding:0}}
              to={{
                pathname: '/hosthomepage',
                  state: {
                    tab: 'all'
                  }
              }}
              >
              <button
                className="dropdown-item"
                style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                onClick={() => {
                  props.setTab && props.setTab("all");
                }}
              >
                All Quests
              </button>
              </Link>
              <Link
              style={{padding:0}}
              to={{
                pathname: '/hosthomepage',
                  state: {
                    tab: 'live'
                  }
              }}
              >
              <button
                className="dropdown-item"
                style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                onClick={() => {
                  props.setTab && props.setTab("live");
                }}
              >
                Live Quests
              </button>
              </Link>
              <Link
              style={{padding:0}}
              to={{
                pathname: '/hosthomepage',
                  state: {
                    tab: 'upcoming'
                  }
              }}
              >
              <button
                className="dropdown-item"
                style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                onClick={() => {
                  props.setTab && props.setTab("upcoming");
                }}
              >
                Upcoming Quests
              </button>
              </Link>
              <Link
              style={{padding:0}}
              to={{
                pathname: '/hosthomepage',
                  state: {
                    tab: 'past'
                  }
              }}
              >
              <button
                className="dropdown-item"
                style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                onClick={() => {
                  props.setTab && props.setTab("past");
                }}
              >
                Past Quests
              </button>
              </Link>
              <Link
              style={{padding:0}}
              to={{
                pathname: '/hosthomepage',
                  state: {
                    tab: 'pending'
                  }
              }}
              >
              <button
                className="dropdown-item"
                style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                onClick={() => {
                  props.setTab && props.setTab("pending");
                }}
              >
                Pending Quests
              </button>
              </Link>
              
              {/* <a class="dropdown-item" href="#">Something else here</a> */}
            </div>
          </li>
          <ProfileAndMobileView username={username} />
        </ul>
      </div>
    </nav>
  );
};

export default MainNavbar;
