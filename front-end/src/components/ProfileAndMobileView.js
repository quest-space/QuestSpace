import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useHistory, history, Link } from "react-router-dom";

const ProfileAndMobileView = (props) => {
  // Added this function to send API call to sign out and redirect to sign in page.
  const history = useHistory();
  const SignOutUser = async () => {
    const userString = history.location.pathname.includes("participant")
      ? "participant"
      : "host";
    console.log("user string is", userString);
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/${userString}/signout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.status !== 200) {
      console.log(`Error in signout out.`);
    }
    history.push("/signin");
  };

  let initials = props.username.substring(0, 1);

  console.log(initials);

  return (
    <div>
      <li className="navHover nav-item dropdown d-none d-sm-none d-md-none d-lg-block">
        <a
          className="nav-link"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          style={{ paddingTop: "0em", paddingBottom: "0em" }}
        >
          <div className="circle">
            <span className="initials"> {initials}</span>
          </div>
        </a>
        <div
          className="hoverable dropdown-menu"
          style={{
            border: "none",
            textAlign: "center",
            paddingBottom: "0",
            boxShadow: "none",
          }}
        >
          <div className="dropdown-item">
            <div className="circle1">
              <span className="initials1">{initials}</span>
            </div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "400",
                marginTop: "0.5rem",
              }}
            >
              {props.username}
            </div>
          </div>
          <Link
            className="dropdown-item"
            to="/viewprofile"
            style={{ paddingTop: "0" }}
          >
            <span style={{ textDecorationLine: "underline" }}>
              View Profile
            </span>
          </Link>
          <div className="dropdown-divider" style={{ marginBottom: "0" }}></div>

          {/* Changed anchor tag to div tag and added an inclick handler. Changed cursor style to pointer */}
          <div
            className="dropdown-item"
            onClick={SignOutUser}
            style={{
              backgroundColor: "#EDEBEB",
              borderRadius: "0.25em",
              cursor: "pointer",
            }}
          >
            <i
              className="fa fa-power-off"
              style={{
                margin: "auto",
                paddingRight: "0.8rem",
                paddingBottom: "0.6rem",
                paddingTop: "0.6rem",
              }}
            ></i>
            Sign Out
          </div>
        </div>
      </li>
      {/* SIGN OUT AND VIEW PROFILE FOR MOBILE VERSION */}
      <li className="nav-item d-lg-none">
        <Link
          className="nav-link"
          to="/viewprofile"
          style={{
            fontWeight: 400,
            fontSize: 18,
            fontFamily: "Barlow",
            // marginRight: "1.5rem",
            lineHeight: "1.6",
            color: "#313131",
          }}
        >
          View Profile
        </Link>
      </li>

      <li className="nav-item d-lg-none">
        {/* Changed anchor tag to div tag and added an inclick handler.*/}
        <div
          className="nav-link"
          onClick={SignOutUser}
          style={{
            fontWeight: 400,
            fontSize: 18,
            fontFamily: "Barlow",
            // marginRight: "1.5rem",
            lineHeight: "1.6",
            color: "#313131",
          }}
        >
          Sign Out
        </div>
      </li>
    </div>
  );
};

export default ProfileAndMobileView;
