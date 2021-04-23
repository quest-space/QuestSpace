import React from "react";
import "../css/common.css";

const JumbotronWithTabsQSAdmin = (props) => {
  const [bar1, setBorderBar1] = React.useState("5px solid #ffffff");
  const [bar2, setBorderBar2] = React.useState("5px solid transparent");
  const [bar3, setBorderBar3] = React.useState("5px solid transparent");
  const [bar4, setBorderBar4] = React.useState("5px solid transparent");

  const setBar = (x) => {
    props.setTab(x);

    if (x === "Pending") {
      setBorderBar1("5px solid #ffffff");
      setBorderBar2("5px solid transparent");
      setBorderBar3("5px solid transparent");
      setBorderBar4("5px solid transparent");
    } else if (x == "Accepted") {
      setBorderBar1("5px solid transparent");
      setBorderBar3("5px solid transparent");
      setBorderBar2("5px solid #ffffff");
      setBorderBar4("5px solid transparent");
    } else if (x == "Rejected") {
      setBorderBar1("5px solid transparent");
      setBorderBar2("5px solid transparent");
      setBorderBar3("5px solid #ffffff");
      setBorderBar4("5px solid transparent");
    } else if (x == "All") {
      setBorderBar1("5px solid transparent");
      setBorderBar2("5px solid transparent");
      setBorderBar4("5px solid #ffffff");
      setBorderBar3("5px solid transparent");
    }
  };

  return (
    <div>
      <div
        id="fancy"
        className="jumbotron jumbotron-fluid"
        style={{
          marginBottom: "0em",
          paddingLeft: "9%",
          background:
            "linear-gradient(209.34deg, rgba(71, 111, 143, 0) 17.99%, #335875 177.27%), #1F394E",
        }}
      >
        <div className="container" style={{ margin: "0em", padding: "0rem" }}>
          <h1
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "40px",
              color: "#ffffff",
              margin: "0em",
            }}
          >
            Quest Creation Requests
          </h1>
        </div>
      </div>
      {/* TABS ON DESKTOP*/}
      <div
        className="col-md-12 d-none d-sm-none d-md-none d-lg-block"
        style={{ margin: "0em", padding: "0em", backgroundColor: "#46b7a1" }}
      >
        <ul
          id="top"
          style={{
            margin: "0em",
            padding: "0em",
            paddingLeft: "9%",
            paddingRight: "9%",
          }}
        >
          <button
            className="parent"
            onClick={() => setBar("Pending")}
            style={{ borderBottom: bar1, width: "25%" }}
          >
            Pending
          </button>
          <button
            className="parent"
            onClick={() => setBar("Accepted")}
            style={{ borderBottom: bar2, width: "25%" }}
          >
            Accepted
          </button>
          <button
            className="parent"
            onClick={() => setBar("Rejected")}
            style={{ borderBottom: bar3, width: "25%" }}
          >
            Rejected
          </button>
          <button
            className="parent"
            onClick={() => setBar("All")}
            style={{ borderBottom: bar4, width: "25%" }}
          >
            All
          </button>
        </ul>
      </div>
      {/* TABS ON MOBILE */}
      <div className="dropdown d-lg-none d-md-block">
        <button
          className="parent dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          style={{ textAlign: "center", width: "100%" }}
        >
          Browse Requests
        </button>
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          style={{
            width: "100%",
            margin: "0",
            padding: "0",
            borderWidth: "0",
            boxShadow: "none",
          }}
        >
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("Pending")}
          >
            Pending
          </button>
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("Accepted")}
          >
            Accepted
          </button>
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("Rejected")}
          >
            Rejected
          </button>
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("All")}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
};

export default JumbotronWithTabsQSAdmin;
