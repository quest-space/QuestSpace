import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import "../css/NavBar.css";


const MainNavbar = () => {

  const [disp, setDisplay] = React.useState('none')

  const turnOnDisplay = (ev) => {
    ev.preventDefault()
    setDisplay('inline-block')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{marginLeft: "7.5%", boxShadow: "none"}}>
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

        <ul className="navbar-nav ml-auto">
          <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" style={{display:disp}}/>
          <button onClick = {turnOnDisplay} style={{marginRight: "1.9rem", backgroundColor:"#ffffff", border:"none"}}><i class="fas fa-search"></i></button>
          </form>

          <li className="nav-item">
            <a className="nav-link" href="#" style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight:"1.6",
              color: "#313131",

            }}>
              Home</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight:"1.6",
              color: "#313131"
              }}>
              Quests
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{border:"none"}}>
              <a class="dropdown-item" href="#">All Quests</a>
              <a class="dropdown-item" href="#">My Quests</a>
              {/* <a class="dropdown-item" href="#">Something else here</a> */}
            </div>
          </li>
          <li className="nav-item dropdown">
          <a className="nav-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginRight:"5.9rem", paddingTop:"0em", paddingBottom:"0em"}}>
          <div className="circle">
          <span className="initials">MS</span>
          </div>
          </a>
          <div className="dropdown-menu" style={{border:"none", textAlign:"center", paddingBottom:"0"}}>
            <div className="dropdown-item" >
              <div className="circle1">
              <span className="initials1">MS</span>
              </div>
              <div style={{fontSize:"20px", fontWeight:"400", marginTop:"0.5rem"}}>
              Maria Saad Khan
              </div>
            </div>
            <a className="dropdown-item" href="#" style={{paddingTop:"0"}}>
              <span style={{ textDecorationLine: "underline" }}>
                View Profile
              </span>
            </a>
            <div className="dropdown-divider" style={{marginBottom:"0"}}></div>
            <a className="dropdown-item" href="#" style={{backgroundColor:"#EDEBEB", borderRadius:"0.25em"}}>
              <i
                className="fa fa-power-off"
                style={{ margin: "auto", paddingRight: "0.8rem" }}
              ></i>
              Sign Out
            </a>
          </div>
          </li>
          
        </ul>
      </div>
    </nav>

  )
}

export default MainNavbar
