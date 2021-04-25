import React from "react";
import "../css/common.css";

const JumbotronWithTabs = (props) => {

  const getBarColor = (tab, bar) => {
    if (tab === 'all') {
      if (bar === 'bar1') return '5px solid #ffffff';
      if (bar === 'bar2') return '5px solid transparent';
      if (bar === 'bar3') return '5px solid transparent';
      if (bar === 'bar4') return '5px solid transparent';
      if (bar === 'bar5') return '5px solid transparent';
    } else if (tab === 'live') {
      if (bar === 'bar1') return '5px solid transparent';
      if (bar === 'bar2') return '5px solid #ffffff';
      if (bar === 'bar3') return '5px solid transparent';
      if (bar === 'bar4') return '5px solid transparent';
      if (bar === 'bar5') return '5px solid transparent';
    } else if (tab === 'upcoming') {
      if (bar === 'bar1') return '5px solid transparent';
      if (bar === 'bar2') return '5px solid transparent';
      if (bar === 'bar3') return '5px solid #ffffff';
      if (bar === 'bar4') return '5px solid transparent';
      if (bar === 'bar5') return '5px solid transparent';
    } else if (tab === 'past') {
      if (bar === 'bar1') return '5px solid transparent';
      if (bar === 'bar2') return '5px solid transparent';
      if (bar === 'bar3') return '5px solid transparent';
      if (bar === 'bar4') return '5px solid #ffffff';
      if (bar === 'bar5') return '5px solid transparent';
    } else {
      if (bar === 'bar1') return '5px solid transparent';
      if (bar === 'bar2') return '5px solid transparent';
      if (bar === 'bar3') return '5px solid transparent';
      if (bar === 'bar4') return '5px solid transparent';
      if (bar === 'bar5') return '5px solid #ffffff';
    }
  }

  const setBar = (x) => {
    props.setTab(x);
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
          <h1 className="display-4" style={{ fontWeight: "400", fontSize: "40px", color: "#ffffff", margin: "0em"}}>
            QuestSpace
          </h1>
          <h2 className="display-4" style={{ fontWeight: "300", fontSize: "22px", color: "#ffffff", margin: "0em"}}>
            Host
          </h2>
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
            onClick={() => setBar("all")}
            style={{ borderBottom: getBarColor(props.tab, 'bar1'), width: "20%" }}
          >
            All
          </button>
          <button
            className="parent"
            onClick={() => setBar("live")}
            style={{ borderBottom: getBarColor(props.tab, 'bar2'), width: "20%" }}
          >
            Live
          </button>
          <button
            className="parent"
            onClick={() => setBar("upcoming")}
            style={{ borderBottom: getBarColor(props.tab, 'bar3'), width: "20%" }}
          >
            Upcoming
          </button>
          <button
            className="parent"
            onClick={() => setBar("past")}
            style={{ borderBottom: getBarColor(props.tab, 'bar4'), width: "20%" }}
          >
            Past
          </button>
          <button
            className="parent"
            onClick={() => setBar("pending")}
            style={{ borderBottom: getBarColor(props.tab, 'bar5'), width: "20%" }}
          >
            Pending
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
          Browse Quests
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
            onClick={() => setBar("all")}
          >
            All
          </button>
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("live")}
          >
            Live
          </button>
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("upcoming")}
          >
            Upcoming
          </button>
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("past")}
          >
            Past
          </button>
          <button
            className="dropdown-item dropKid"
            onClick={() => setBar("pending")}
          >
            Pending
          </button>
        </div>
      </div>
    </div>
  );
};

export default JumbotronWithTabs;
