import React from "react";
import questspacelogo from "./../logos/questspacelogo.png";
import {useHistory, history} from "react-router-dom"
import "../css/NavBar.css";


const MainNavbar = (props) => {

  const [disp, setDisplay] = React.useState('none')

  const turnOnDisplay = (ev) => {
    ev.preventDefault()
    setDisplay('inline-block')
  }


  // Added this function to send API call to sign out and redirect to sign in page.
  
  const history = useHistory()

  const SignOutUser = async () => {
    const userString = history.location.pathname.includes("participant") ? "participant" : "host"
    console.log("user string is", userString)
    const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/${userString}/signout`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    })

    if (response.status !== 200) {
      console.log(`Error in signout out.`)
    }
    history.push("/signin")
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ paddingLeft: "7rem", boxShadow: "0px 4px 15px -2px rgba(0, 0, 0, 0.2)" }}>
      <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="#"><img src={questspacelogo} height="44" style={{ position: 'absolute', top: '13' }} />
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
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" style={{ display: disp }} />
            <button onClick={turnOnDisplay} style={{ marginRight: "1.9rem", backgroundColor: "#ffffff", border: "none" }}><i className="fas fa-search"></i></button>
          </form>

          <li className="nav-item">
            <a className="nav-link" href="#" style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight: "1.6",
              color: "#313131",

            }}>
              Home</a>
          </li>
          <li className="nav-item dropdown d-none d-md-none d-sm-none d-lg-block">
            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight: "1.6",
              color: "#313131"
            }}>
              Quests
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style={{ border: "none" }}>
              <a className="dropdown-item" href="#">All Quests</a>
              <a className="dropdown-item" href="#">My Quests</a>
              {/* <a class="dropdown-item" href="#">Something else here</a> */}
            </div>
          </li>
          <li className="nav-item dropdown d-none d-sm-none d-md-none d-lg-block">
            <a className="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ marginRight: "5.9rem", paddingTop: "0em", paddingBottom: "0em" }}>
              <div className="circle">
                <span className="initials">MS</span>
              </div>
            </a>
            <div className="dropdown-menu" style={{ border: "none", textAlign: "center", paddingBottom: "0" }}>
              <div className="dropdown-item" >
                <div className="circle1">
                  <span className="initials1">MS</span>
                </div>
                <div style={{ fontSize: "20px", fontWeight: "400", marginTop: "0.5rem" }}>
                  Maria Saad Khan
                </div>
              </div>
              <a className="dropdown-item" href="#" style={{ paddingTop: "0" }}>
                <span style={{ textDecorationLine: "underline" }}>
                  View Profile
                </span>
              </a>
              <div className="dropdown-divider" style={{ marginBottom: "0" }}></div>
              
              {/* Changed anchor tag to div tag and added an inclick handler */}
              <div className="dropdown-item" onClick={SignOutUser} style={{ backgroundColor: "#EDEBEB", borderRadius: "0.25em" }}>
                <i
                  className="fa fa-power-off"
                  style={{ margin: "auto", paddingRight: "0.8rem" }}
                ></i>
                Sign Out
              </div>
            </div>
          </li>
          {/* SIGN OUT AND VIEW PROFILE FOR MOBILE VERSION */}
          <li className="nav-item d-lg-none d-md-none">
            <a className="nav-link" href="#" style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight: "1.6",
              color: "#313131",

            }}>
              View Profile</a>
          </li>

          <li className="nav-item d-lg-none d-md-none">

            {/* Changed anchor tag to div tag and added an inclick handler */}
            <div className="nav-link" onClick={SignOutUser} style={{
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Barlow",
              marginRight: "1.5rem",
              lineHeight: "1.6",
              color: "#313131",

            }}>
              Sign Out</div>
          </li>

        </ul>
      </div>
    </nav>

  )
}

export default MainNavbar
