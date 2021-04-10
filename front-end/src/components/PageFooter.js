import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import githubLogo from "../logos/github.png"
import linkedinLogo from "../logos/linkedin.png"

const PageFooter = () => {
  return (
    <MDBFooter  >
      <MDBContainer fluid >
        <MDBRow >
          <MDBCol md="4" className="footerLeft">
            QuestSpace
          </MDBCol>
          <MDBCol md="4" className="footerMid">
            <a href="https://www.linkedin.com/in/junaidharoonsiddiqui">
              <img src={linkedinLogo} style={{ paddingRight: "10px" }}></img>
            </a>
            <a href="https://github.com/quest-space">
              <img src={githubLogo} style={{ paddingLeft: "10px" }}></img>
            </a>
          </MDBCol>
          <MDBCol className="footerRight">
            Come and join our space!
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  )
}

export default PageFooter;