import React from "react";
import HeadSubhead from "./HeadSubhead";
import "../css/questdetails.css";


const QuestDetailsFormat = (props) => {
    
    return (
    
    
    
    
    <div style={{ marginBottom: "80px" }}>
        <div
          className="col-md-12"
          style={{ margin: "0em", padding: "0em" }}
        ></div>
        <div
          style={{
            marginLeft: props.left,
            marginRight: props.right,
            marginTop: props.top,
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
            Quest Details
          </p>
  
          <img
            className="image responsive resp2 d-none d-sm-none d-md-block d-lg-block"
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
              marginLeft: "0rem",
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingTop: "2rem",
            }}
          >
            {props.buttonShow === "1" &&
              <button className="btnBegin" onClick={() => props.onClick(true)}>
                Enroll
              </button>
            }
          </div>
        </div>
      </div>
    );
  };
  
  export default QuestDetailsFormat;