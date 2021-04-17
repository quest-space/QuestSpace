import React from "react";
import "../css/common.css";

/* Use this way
<Header heading="CodinGuru3.0" subheading="IEEE LUMS" />
*/

const Header = (props) => {
  return (
    <div>
      <div
        id="header"
        className="jumbotron jumbotron-fluid"
        style={{
          background:
            "linear-gradient(209.34deg, rgba(71, 111, 143, 0) 17.99%, #335875 177.27%), #1F394E",
          marginBottom: "0em",
          paddingLeft: "9%",
        }}
      >
        {/* prev version: style={{ marginLeft: "7rem", marginRight: "7rem" }} */}
        <div>
          <h1
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "42px",
              color: "#ffffff",
              // marginLeft: "0.4em",
              wordWrap: "break-word",
            }}
          >
            {props.heading}
          </h1>
        </div>
        {/* prev version: style={{ marginLeft: "7rem", marginRight: "7rem" }} */}
        <div>    
          <h2
            className="display-4"
            style={{
              fontWeight: "300",
              fontSize: "22px",
              color: "#ffffff",
              // marginLeft: "0.9em",
              wordWrap: "break-word",
            }}
          >
            {props.subheading}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
