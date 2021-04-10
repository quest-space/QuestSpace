import React from "react";
import CardsContainer from "./CardsContainer";

/*Colored Heading, Grey Subheading. Used Multiple Times in Quest and Round Pages*/
const HeadSubhead = (props) => {
  return (
    <div>
      <p
        className="display-4"
        style={{
          paddingTop: "0.5rem",
          fontWeight: "400",
          fontSize: "20px",
          color: "#46B7A1",
          marginLeft: "0.4rem",
          wordWrap: "break-word",
        }}
      >
        {props.heading}
        <div
          className="display-4"
          style={{
            fontWeight: "400",
            fontSize: "20px",
            color: "#313131",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          {props.subheading}
        </div>
      </p>
    </div>
  );
};

export default HeadSubhead;
