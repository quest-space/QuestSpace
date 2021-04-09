import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import questspacelogo from "./../logos/questspacelogo.png";
import { NavbarBrand } from "react-bootstrap";

const InitialNavbar = () => {
  return (
    <div>
      <Navbar collapseOnSelect className="shadow bg-white rounded" expand="md">
        <Nav style={{ marginLeft: "7.5%" }}>
          <span>
            <img src={questspacelogo} height="44" />
            <span
              style={{
                fontWeight: 400,
                fontSize: 29,
                fontFamily: "Barlow",
                paddingLeft: 10,
              }}
            >
              <span style={{ color: "#415F78" }}>Quest</span>
              <span style={{ color: "#46B7A1" }}>Space</span>
            </span>
          </span>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ marginRight: "7.5%" }} className="ml-auto">
            <Nav.Link
              style={{
                fontWeight: 400,
                fontSize: 20,
                fontFamily: "Barlow",
                color: "#313131",
                paddingRight: "1.5rem",
              }}
              href="#About Us"
            >
              About Us
            </Nav.Link>
            <Nav.Link
              style={{
                fontWeight: 400,
                fontSize: 20,
                fontFamily: "Barlow",
                color: "#313131",
              }}
              href="#Sign In"
            >
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default InitialNavbar;
