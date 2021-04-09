import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import questspacelogo from "./../logos/questspacelogo.png";
import { MDBIcon } from "mdbreact";
import Avatar from "react-avatar";
import "../css/NavBar.css";

// There is a slight issue in the drop down button when I pulled.
// Will fix it in the morning.
const MainNavbar = () => {
  return (
    <div>
      <Navbar collapseOnSelect className="shadow bg-white rounded" expand="md">
        <Nav
          className="mr-auto"
          style={{ alignItems: "center", marginLeft: "7.5%" }}
        >
          <Navbar.Brand className="navbar-brand" href="#home">
            <img src={questspacelogo} height="44" className="d-inline-block" />
            <span
              style={{
                fontWeight: 400,
                postion: "relative",
                fontSize: 29,
                fontFamily: "Barlow",
                align: "center",
                paddingLeft: 10,
              }}
            >
              <span style={{ color: "#415F78" }}>Quest</span>
              <span style={{ color: "#46B7A1" }}>Space</span>
            </span>
          </Navbar.Brand>
        </Nav>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" style={{ marginRight: "7.5%" }}>
            <Nav
              className="ml-auto"
              style={{ color: "#313131", fontSize: 20, fontFamily: "Barlow" }}
            >
              <MDBIcon
                className="text-black"
                icon="search"
                style={{
                  margin: "auto",
                  paddingRight: "1.5rem",
                }}
              />
              <Nav.Link
                style={{
                  color: "#313131",
                  margin: "auto",
                  paddingRight: "1.5rem",
                }}
                href="#Home"
              >
                <span class="linkformat">Home</span>
              </Nav.Link>

              <div
                class="dropdown"
                style={{
                  paddingRight: "1.5rem",
                  paddingTop: "0.5rem",
                }}
              >
                <button
                  type="button"
                  class="button1 center-block dropdown-toggle"
                  id="dropdownMenuButton1"
                  data-toggle="dropdown"
                  style={{ color: "#313131" }}
                >
                  <span class="linkformat" style={{ color: "#313131" }}>
                    Quests
                  </span>
                </button>
                <div
                  class="dropdown-menu dropdown-menu-center"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <a class="dropdown-item" href="#">
                    <span class="linkformat">My Quests</span>
                  </a>
                  <a class="dropdown-item" href="#">
                    <span class="linkformat">Public Quests</span>
                  </a>
                </div>
              </div>

              <div class="dropdown">
                <button
                  type="button"
                  class="invisiblebutton center-block"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div>
                    <Avatar
                      color={"#D24343"}
                      size={50}
                      align={"center"}
                      name="Any Name"
                      round={true}
                    />
                  </div>
                </button>
                <div
                  class="dropdown-menu dropdown-menu-center"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a class="dropdown-item">
                    <div style={{ paddingBottom: "1rem" }}>
                      <Avatar
                        color={"#D24343"}
                        size={70}
                        align={"center"}
                        name="Any Name"
                        round={true}
                      />
                    </div>
                    Any Name
                  </a>
                  <a class="dropdown-item" href="#">
                    <span style={{ textDecorationLine: "underline" }}>
                      View Profile
                    </span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">
                    <i
                      class="fa fa-power-off"
                      style={{ margin: "auto", paddingRight: "1rem" }}
                    ></i>
                    Sign Out
                  </a>
                </div>
              </div>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
