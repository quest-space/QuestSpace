import React from "react";
import "../css/header.css";

/*I matched the thickness with our homepage. Change it if you want*/
/* Use this way
<Header heading="CodinGuru3.0" subheading="IEEE LUMS" />
*/

const Header = (props) => {
  return (
    <div>
      <div
        id="header"
        className="headerpadding jumbotron jumbotron-fluid"
        style={{
          background:
            "linear-gradient(209.34deg, rgba(71, 111, 143, 0) 17.99%, #335875 177.27%), #1F394E",
          marginBottom: "0em",
        }}
      >
        <div style={{ marginLeft: "7.5rem", marginRight: "7.5rem" }}>
          <h1
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "42px",
              color: "#ffffff",
              marginLeft: "0.4em",
              wordWrap: "break-word",
            }}
          >
            {props.heading}
          </h1>
        </div>
        <div style={{ marginLeft: "7.5rem", marginRight: "7.5rem" }}>
          <h2
            className="display-4"
            style={{
              fontWeight: "300",
              fontSize: "22px",
              color: "#ffffff",
              marginLeft: "0.9em",
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
