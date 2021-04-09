import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";

const InitialNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{marginLeft: "7.5%", boxShadow: "none"}}>
        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#"><img src={questspacelogo} height="44" style={{position: 'absolute', top:'13'}} />
            <span
              style={{
                fontWeight: 400,
                fontSize: 29,
                fontFamily: "Barlow",
                paddingLeft: "3.5rem",
              }}
            >
              <span style={{ color: "#415F78" }}>Quest</span>
              <span style={{ color: "#46B7A1" }}>Space</span>
            </span></a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" style={{
                fontWeight: 400,
                fontSize: 18,
                fontFamily: "Barlow",
                color: "#313131",
                marginRight: "1.5rem",
              }}>
                About us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{
                fontWeight: 400,
                fontSize: 18,
                fontFamily: "Barlow",
                color: "#313131",
                marginRight: "5.9rem",
              }}>
                Sign In</a>
            </li>
          </ul>
        </div>
      </nav>

      
    </div>
  );
};

export default InitialNavbar;


{/* <nav className="navbar navbar-expand-lg navbar-light" style={{marginLeft: "7.5%", boxShadow: "none"}}>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarTogglerDemo01">
  <a className="navbar-brand" href="#"><img src={questspacelogo} height="44" style={{position: 'absolute', top:'13'}} />
    <span
      style={{
        fontWeight: 400,
        fontSize: 29,
        fontFamily: "Barlow",
        paddingLeft: "3.5rem",
      }}
    >
      <span style={{ color: "#415F78" }}>Quest</span>
      <span style={{ color: "#46B7A1" }}>Space</span>
    </span></a>
 
  <form className="form-inline my-2 my-lg-0">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
</div>
</nav> */}