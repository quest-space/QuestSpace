import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import { useHistory, history , Link } from "react-router-dom";
import ProfileAndMobileView from "./ProfileAndMobileView";
import "../css/NavBar.css";


const MainNavbar = (props) => {

  const [disp, setDisplay] = React.useState('none')

  const flipDisplay = (ev) => {
    ev.preventDefault()
    if(disp == 'none'){
      setDisplay('inline-block')
    }
    else
    setDisplay('none')
    
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{boxShadow: "0px 4px 15px -2px rgba(0, 0, 0, 0.2)" , paddingLeft:"9%", paddingRight:"9%"}}>
      <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="d-none d-sm-none d-md-none d-lg-block navbar-brand" href="#"><img src={questspacelogo} height="44" style={{ position: 'absolute', top: '13' }} />
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

          {/* No search in HOST */}

          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" style={{ display: disp }} />
            <button onClick={flipDisplay} style={{ marginRight: "1.9rem", backgroundColor: "#ffffff", border: "none" }}><i className="fas fa-search"></i></button>
          </form> */}

          <li className="nav-item">
            {/* changed to Link */}
            <Link to="/hosthomepage" className="nav-link" style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight: "1.6",
              color: "#313131",

            }}>
              Home</Link>
          </li>
          <li className="navHover nav-item dropdown d-none d-md-none d-sm-none d-lg-block">
            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight: "1.6",
              color: "#313131"
            }}>
              Quests
            </a>
            <div className="hoverable dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{ border: "none",boxShadow:"none" }}>
              <button className="dropdown-item" style= {{paddingBottom:"0.5rem",paddingTop:"0.5rem"}} onClick={()=> {props.setTab('all')}}>All Quests</button>
              <button className="dropdown-item" style= {{paddingBottom:"0.5rem",paddingTop:"0.5rem"}} onClick={()=> {props.setTab('live')}}>Live Quests</button>
              <button className="dropdown-item" style= {{paddingBottom:"0.5rem",paddingTop:"0.5rem"}} onClick={()=> {props.setTab('upcoming')}}>Upcoming Quests</button>
              <button className="dropdown-item" style= {{paddingBottom:"0.5rem",paddingTop:"0.5rem"}} onClick={()=> {props.setTab('past')}}>Past Quests</button>
              <button className="dropdown-item" style= {{paddingBottom:"0.5rem",paddingTop:"0.5rem"}} onClick={()=> {props.setTab('pending')}}>Pending Quests</button>
              {/* <a class="dropdown-item" href="#">Something else here</a> */}
            </div>
          </li>
          <ProfileAndMobileView/>

        </ul>
      </div>
    </nav>

  )
}

export default MainNavbar