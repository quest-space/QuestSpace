import React from "react";

/*Colored Heading, Grey Subheading. Used Multiple Times in Quest and Round Pages*/
const HeadSubhead = (props) => {
  return (
    <div>
      <div
        className="display-4"
        style={{
          paddingTop: "1rem",
          fontWeight: "400",
          fontSize: "20px",
          color: "#46B7A1",
          marginLeft: "0rem",
          wordWrap: "break-word",
        }}
      >
        {props.heading}
      </div>
      <div
        className="display-4"
        style={{
          fontWeight: "400",
          fontSize: "19px",
          color: "#313131",
          marginLeft: "0rem",
          wordWrap: "break-word",
        }}
      >
        {props.subheading}
      </div>
    </div>
  );
};

export default HeadSubhead;
