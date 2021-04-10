import React from "react"
import PageFooter from "./PageFooter"
import Stack from "./Stack"
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import "../css/LandingPage.css"
import Button from "./Button"
import One from "../img/landing/1.png"
import Two from "../img/landing/2.png"
import Three from "../img/landing/3.png"
import Four from "../img/landing/4.png"
import Five from "../img/landing/5.png"
import Six from "../img/landing/6.png"
import questspace from "../img/landing/questspace.png"

const LandingPage = () => {
    return (
        <React.Fragment>
            <MDBContainer fluid>
                <MDBRow style={{ paddingBottom: "0px", paddingLeft: "70px" }}>
                    <MDBCol md="4" style={{ paddingBottom: "200px" }}>
                        <img src={questspace} style={{ paddingTop: "150px" }}>
                        </img>
                        <div className="questspace">
                            <span style={{ color: "#415F78" }}>Quest</span>
                            <span style={{ color: "#3caf96" }}>Space</span>
                        </div>
                        <div className="divider">
                        </div>
                        <Stack class="col1" title="We give space to everyone!" text="The perfect place to show your intellect" img={false} button={<Button text="Join our space" class="btn1" link="#join" />} />

                    </MDBCol>
                    <MDBCol md="8" style={{ backgroundImage: `url(${One})`, backgroundRepeat: "no-repeat", paddingBottom: "820px" }}>
                        <div style={{ textAlign: "right", paddingTop: "20px", paddingRight: "50px" }}>
                            <div style={{ display: "inline", paddingRight: "30px" }}>
                                <Button text="About Us" class="btn2" link="#about" />
                            </div>
                            <div style={{ display: "inline" }}>
                                <Button text="Sign In" class="btn2" link="/signin" />
                            </div>
                        </div>


                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer fluid>
                <MDBRow id="join" style={{ paddingBottom: "100px" }}>
                    <MDBCol md="6" style={{ padding: "100px" }}>
                        <Stack class="col2" title="For Hosts" text="Host your Space, Design, Manage and Grade your Quests!" img={true} imgPath={Two} imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" link="/signup" />} />
                    </MDBCol>
                    <MDBCol md="6" style={{ padding: "100px" }}>
                        <Stack class="col2" title="For Participants" text="Join Quest Spaces, Participate and View your ranks!" img={true} imgPath={Three} imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" link="/signup" />} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

            <MDBContainer fluid>
                <MDBRow id="about" style={{ paddingBottom: "100px" }}>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Accessibility" text="Co-curriculars on any device, anywhere." img={true} imgPath={Four} imgWidth="156" imgHeight="156" />
                    </MDBCol>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Quick and Easy" text="Automated grading and leaderboard generation." img={true} imgPath={Five} imgWidth="170" imgHeight="156" />
                    </MDBCol>
                    <MDBCol md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Diversity" text="Variety of co-curriculars, all at one platform." img={true} imgPath={Six} imgWidth="156" imgHeight="156" />

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <PageFooter />
        </React.Fragment>
    )
}

export default LandingPage