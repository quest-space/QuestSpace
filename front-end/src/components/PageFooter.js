import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const PageFooter = () => {
  return (
    <MDBFooter  >
      <MDBContainer fluid >
        <MDBRow >
          <MDBCol md="4" className="footerLeft">
                QuestSpace
          </MDBCol>
          <MDBCol md="4"  className="footerMid">
            <img src="/logos/linkedin.png" style={{paddingRight:"10px"}}></img>
            <img src="/logos/github.png" style={{paddingLeft:"10px"}}></img>
          </MDBCol>
          <MDBCol  className="footerRight">
              Come and join our space!
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  )
}

export default PageFooter;