import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import { Link } from "react-router-dom";

const InitialNavbar = (props) => {
  // const [sign, setSign] = React.useState('')

  const signState = () => {
    if (props.sign === "Sign In") {
      return "/signin";
    } else {
      return "/signup";
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{
          paddingLeft: "7rem",
          boxShadow: "0px 4px 15px -2px rgba(0, 0, 0, 0.2)",
          paddingLeft: "9%",
          paddingRight: "9%",
        }}
      >
        <Link className="navbar-brand d-lg-none d-sm-block" to="/">
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

        {/* <button
          className="navbar-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <Link className="navbar-brand d-none d-sm-none d-md-block d-lg-block" to="/">
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


        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <a
                className="nav-link"
                href="http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/#about"
                style={{
                  fontWeight: 400,
                  fontSize: 18,
                  fontFamily: "Barlow",
                  color: "#313131",
                  // marginLeft: "3.2rem",
                }}
              >
                About us
              </a>
            </li> */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to={signState()}
                style={{
                  fontWeight: 400,
                  fontSize: 18,
                  fontFamily: "Barlow",
                  color: "#313131",
                  // marginLeft: "3.2rem",
                }}
              >
                {props.sign}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default InitialNavbar;



