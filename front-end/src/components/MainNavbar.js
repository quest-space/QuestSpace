import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import { useHistory, history, Link, useLocation } from "react-router-dom";
import ProfileAndMobileView from "./ProfileAndMobileView";
import "../css/NavBar.css";

const MainNavbar = (props) => {
  const location = useLocation();
  const [disp, setDisplay] = React.useState("none");
  const [placeholder, setPlaceholder] = React.useState("Search");
  const [render, setRender] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const history = useHistory();

  const flipDisplay = (ev) => {
    ev.preventDefault();
    if (disp == "none") {
      setDisplay("inline-block");
    } else setDisplay("none");
    if (placeholder !== "Search") {
      history.push({ pathname: `/searchresults`, state: placeholder });
      if (location.pathname == "/searchresults") {
        props.setRender(false);
      }
    }
  };

  const ProfileAPI = async () => {
    const checkResp = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/who-am-i`,
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

    let displayName = `${checkRespBody.firstname} ${checkRespBody.lastname}`;
    if (displayName.length > 15) {
      displayName = displayName.substr(0,12) + `...`;
    }
    setUsername(displayName);
  };

  const setInput = (ev) => {
    setPlaceholder(ev.target.value);
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
          to="/participanthomepage"
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
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              onChange={setInput}
              placeholder={placeholder}
              style={{ display: disp }}
            />
            <button
              onClick={flipDisplay}
              style={{
                marginRight: "1.9rem",
                backgroundColor: "#ffffff",
                border: "none",
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </form>

          <li className="nav-item">
            {/* changed to Link */}
            <Link
              to="/participanthomepage"
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
                pathname: '/participanthomepage',
                  state: {
                    tab: 'allQuests'
                  }
              }}
              >
                <button
                  className="dropdown-item"
                  style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                  onClick={() => {
                    if (props.setTab) {
                      props.setTab("allQuests");
                    }
                  }}
                >
                  All Quests
                </button>
              </Link>
              <Link
              style={{padding:0}}
              to={{
                pathname: '/participanthomepage',
                  state: {
                    tab: 'all'
                  }
              }}
              >
                <button
                  className="dropdown-item"
                  style={{ paddingBottom: "0.5rem", paddingTop: "0.5rem" }}
                  onClick={() => {
                    if (props.setTab) {
                      props.setTab("all");
                    }
                  }}
                >
                  My Quests
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
