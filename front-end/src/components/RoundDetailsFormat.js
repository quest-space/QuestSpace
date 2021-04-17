import React from "react";
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import HeadSubhead from "./HeadSubhead";
import Button from "./Button";
import Stack from "./Stack";
import "../css/questdetails.css";

/*
How to use
<RoundDetailsFormat
roundname="Round 1: Programming Contest" 
questname="CodinGuru3.0"
startingtime="11:00 am, 21st March 2021"
endingtime="11:00 am, 22nd March 2021"
allowedtime="10 minutes"
about="This is a Rapid Fire Round. In this round, you will have a fixed time in which you"
/>

*/

const RoundDetailsFormat = (props) => {
  return (
    <div style={{ marginBottom: "80px" }}>
      <MainNavbar />
      <Header heading={props.roundname} subheading={props.questname} />
      <div className="col-md-12" style={{ margin: "0em", padding: "0em" }}>
        <div id="top" style={{ margin: "0em", padding: "0em" }}></div>
      </div>
      <div
        style={{
          marginLeft: "9%",
          marginRight: "9%",
          marginTop: "5.5rem",
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
          Round Details
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
          Starts
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {props.startingtime}
          </div>
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
          Ends
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {props.endingtime}
          </div>
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
          Allowed Time
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {props.allowedtime}
          </div>
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
          About
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {props.about}
          </div>
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <Button class="btnBegin" text="Begin" onClick={props.onClick} /> */}
          <button className="btnBegin" onClick={() => props.onClick(true)}>
            Begin
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoundDetailsFormat;
