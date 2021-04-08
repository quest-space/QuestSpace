import React from "react"
import PageFooter from "./PageFooter"
import Stack from "./Stack"
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "../css/LandingPage.css"
import Button from "./Button"


const LandingPage = () => {
    return (
        <React.Fragment>
            <MDBContainer fluid>
                <MDBRow style={{ paddingBottom: "0px", paddingLeft: "70px" }}>
                    <MDBCol md="4" style={{paddingBottom: "200px"}}>
                        <img src="/img/landing/qs.png" style={{ paddingTop: "150px" }}>
                        </img>
                        <div className="questspace">
                            <span>Quest</span>
                            <span style={{ color: "#3caf96" }}>Space</span>
                        </div>
                        <div className="divider">
                        </div>
                        <Stack class="col1" title="We give space to everyone!" text="The perfect place to show your intellect" img={false} button={<Button text="Join our space" class="btn1" />} />

                    </MDBCol>
                    <MDBCol md="8" style={{ backgroundImage: "url('/img/landing/1.png')", backgroundRepeat: "no-repeat", paddingBottom: "820px" }}>
                        <div style={{ textAlign: "right", paddingTop: "20px", paddingRight: "50px" }}>
                            <div style={{ display: "inline", paddingRight: "30px" }}>
                                <Button text="About Us" class="btn2" />
                            </div>
                            <div style={{ display: "inline" }}>
                                <Button text="Sign In" class="btn2" />
                            </div>
                        </div>


                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer fluid>
                <MDBRow style={{ paddingBottom: "100px" }}>
                    <MDBCol md="6" style={{ padding: "100px" }}>
                        <Stack class="col2" title="For Hosts" text="Host your Space, Design, Manage and Grade your Quests!" img={true} imgPath="/img/landing/2.png" imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" />} />
                    </MDBCol>
                    <MDBCol md="6" style={{ padding: "100px" }}>
                        <Stack class="col2" title="For Participants" text="Join Quest Spaces, Participate and View your ranks!" img={true} imgPath="/img/landing/3.png" imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" />} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer fluid>
                <MDBRow style={{ paddingBottom: "100px" }}>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Accessibility" text="Co-curriculars on any device, anywhere." img={true} imgPath="/img/landing/4.png" imgWidth="156" imgHeight="156" />
                    </MDBCol>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Quick and Easy" text="Automated grading and leaderboard generation." img={true} imgPath="/img/landing/5.png" imgWidth="170" imgHeight="156" />
                    </MDBCol>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Diversity" text="Variety of co-curriculars, all at one platform." img={true} imgPath="/img/landing/6.png" imgWidth="156" imgHeight="156" />

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <PageFooter />
        </React.Fragment>
    )
}

export default LandingPage