import React from "react";
import MainNavbar from "./MainNavbar";
import HeadSubhead from "./HeadSubhead";
import Button from "./Button";
import Stack from "./Stack";
import "../css/questdetails.css";

const ViewProfileFormat = (props) => {
  return (
    <div>
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
        <div style={{ marginLeft: "9%", marginRight: "6em" }}>
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
      <div className="col-md-12" style={{ margin: "0em", padding: "0em" }}>
        <div id="top" style={{ margin: "0em", padding: "0em" }}></div>
      </div>
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
          <HeadSubhead heading="Password" subheading="*********" />
        </div>
        <span className="responsive" style={{ float: "right" }}>
          <Stack button={<Button text="Edit" class="btn3" link="" />} />
        </span>
      </div>
    </div>
  );
};

export default ViewProfileFormat;
