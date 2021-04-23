import React from "react";
import MainNavbar from "./MainNavbar";
import HeadSubhead from "./HeadSubhead";
import BreadCrumb from "./BreadCrumb";
import { useHistory } from "react-router-dom";
import EditProfile from "./EditProfile";

import "../css/questdetails.css";

const ViewProfileFormat = (props) => {
  let hidden_password = "";
  for (let i = 0; i < props.password.length; i++) {
    hidden_password = hidden_password.concat("*");
  }

  console.log(hidden_password);

  const history = useHistory();

  const editProfile = () => {
    history.push("/editprofile");
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <MainNavbar />
      <div
        id="fancy"
        className="jumbotron jumbotron-fluid"
        style={{
          marginBottom: "0em",
          background:
            "linear-gradient(209.34deg, rgba(71, 111, 143, 0) 17.99%, #335875 177.27%), #1F394E",
        }}
      >
        <div style={{ marginLeft: "9%", marginRight: "9%" }}>
          <h1
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "40px",
              color: "#ffffff",
              //marginLeft: "0em",
              wordWrap: "break-word",
            }}
          >
            {props.fullname}
          </h1>
        </div>
      </div>
      <BreadCrumb items={[{ text: "My Profile", to: "/viewprofile" }]} />
      <div
        style={{
          marginLeft: "9%",
          marginRight: "9%",
          marginTop: "5rem",
        }}
      >
        <p
          className="display-4"
          style={{
            fontWeight: "400",
            fontSize: "32px",
            color: "#313131",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          View My Profile
        </p>

        <p
          className="display-4"
          style={{
            paddingTop: "1.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Username
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {props.username}
          </div>
        </p>

        <div>
          <HeadSubhead heading="First Name" subheading={props.firstname} />
          <HeadSubhead heading="Last Name" subheading={props.lastname} />
          <HeadSubhead heading="Date of Birth" subheading={props.dob} />
          <HeadSubhead heading="Institution" subheading={props.institution} />
          <HeadSubhead heading="Password" subheading={hidden_password} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          {/* <Button class="btnBegin" text="Begin" onClick={props.onClick} /> */}
          <button className="btnBegin" onClick={editProfile}>
            Edit <i class="fa fa-pencil"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileFormat;
