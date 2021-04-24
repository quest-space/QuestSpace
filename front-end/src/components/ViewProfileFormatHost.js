import React from "react";
import MainNavbar from "./MainNavbar";
import HeadSubhead from "./HeadSubhead";
import BreadCrumb from "./BreadCrumb";
import { useHistory } from "react-router-dom";

import "../css/questdetails.css";

const ViewProfileFormatHost = (props) => {
  let full = [];
  let empty = [];
  for (let i = 0; i < parseInt(props.rating); i++) {
    full.push(1);
  }
  for (let i = 0; i < 5 - parseInt(props.rating); i++) {
    empty.push(0);
  }

  let hidden_password = "";
  for (let i = 0; i < props.passwordlength; i++) {
    hidden_password = hidden_password.concat("*");
  }

  console.log(hidden_password);

  const history = useHistory();

  const editProfile = () => {
    history.push("/hosteditprofile");
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
            {props.username}
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

        <div
          className="display-4"
          style={{
            //paddingTop: "1.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Rating
          <div>
            {full.map((a, index) => {
              return <i key={index} className="fa fa-star"></i>;
            })}
            {empty.map((a, index) => {
              return <i key={index} className="far fa-star"></i>;
            })}
          </div>
        </div>

        <div>
          <HeadSubhead
            heading="Representative Name"
            subheading={props.repname}
          />
          <HeadSubhead
            heading="Representative Designation"
            subheading={props.repdesignation}
          />
          <HeadSubhead heading="Phone" subheading={props.phone} />
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
          <button className="btnBegin" onClick={() => editProfile()}>
            Edit <i class="fa fa-edit"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfileFormatHost;
