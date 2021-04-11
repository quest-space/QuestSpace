import React from "react";
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import HeadSubhead from "./HeadSubhead";
import "../css/questdetails.css";

/*
How to use:
<QuestDetailsFormat hostname="IEEE LUMS" hostrating="3" startingtime="11:00 am, 21st March 2021" endingtime="11:00 am, 22nd March 2021" type="Public" about="CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor.CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor." imgsrc={codinguru}/>
*/

const QuestDetailsFormat = (props) => {
  let full = [];
  let empty = [];
  for (let i = 0; i < parseInt(props.hostrating); i++) {
    full.push(1);
  }
  for (let i = 0; i < 5 - parseInt(props.hostrating); i++) {
    empty.push(0);
  }
  return (
    <div>
      <MainNavbar />
      <Header heading={props.questname} subheading={props.hostname} />
      <div className="col-md-12" style={{ margin: "0em", padding: "0em" }}>
        <div id="top" style={{ margin: "0em", padding: "0em" }}></div>
      </div>
      <div
        style={{
          marginLeft: "7.5rem",
          marginRight: "7.5rem",
          marginTop: "5rem",
        }}
      >
        <p
          className="display-4"
          style={{
            fontWeight: "400",
            fontSize: "32px",
            color: "#313131",
            marginLeft: "0.4rem",
            wordWrap: "break-word",
          }}
        >
          Quest Details
        </p>

        <img
          className="image responsive resp2"
          src={props.imgsrc}
          style={{ float: "right" }}
        />

        <p
          className="display-4"
          style={{
            paddingTop: "1.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0.4rem",
            wordWrap: "break-word",
          }}
        >
          Host
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {props.hostname}
          </div>
          {full.map((a, index) => {
            return <i key={index} className="fa fa-star"></i>;
          })}
          {empty.map((a, index) => {
            return <i key={index} className="far fa-star"></i>;
          })}
        </p>

        <div>
          <HeadSubhead heading="Type" subheading={props.type} />
          <HeadSubhead heading="Starts" subheading={props.startingtime} />
          <HeadSubhead heading="Ends" subheading={props.endingtime} />
          <HeadSubhead heading="About" subheading={props.about} />
        </div>
      </div>
    </div>
  );
};

export default QuestDetailsFormat;
