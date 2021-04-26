import React from "react"
import PageFooter from "./PageFooter"
import Stack from "./Stack"
import { Container, Row, Col } from "react-bootstrap"
import "../css/LandingPage.css"
import Button from "./Button"
import One from "../img/landing/1.png"
import Two from "../img/landing/2.png"
import Three from "../img/landing/3.png"
import Four from "../img/landing/4.png"
import Five from "../img/landing/5.png"
import Six from "../img/landing/6.png"
import questspace from "../img/landing/questspace.png"
import mobileImg from "../img/landing/bgmobile.png"
import mobileImg1 from "../img/landing/bgmobile1.png"

const LandingPage = () => {
    return (
        <React.Fragment>

            {/* Display on laptops */}
            <Container fluid className="d-none d-md-block">
                <Row style={{ paddingBottom: "0px", paddingLeft: "70px" }}>

                    <Col md="4" className="d-none d-md-block" style={{ paddingBottom: "200px" }}>
                        <img src={questspace} style={{ paddingTop: "100px" }}>
                        </img>
                        <div className="questspace">
                            <span style={{ color: "#415F78" }}>Quest</span>
                            <span style={{ color: "#3caf96" }}>Space</span>
                        </div>
                        <div className="divider">
                        </div>
                        <Stack class="col1" title="We give space to everyone!" text="The perfect place to show your intellect" img={false} button={<Button text="Join our space" class="btn1" href="#join" />} />
                    </Col>

                    <Col md="8" className="d-none d-md-block" style={{ backgroundImage: `url(${One})`, backgroundRepeat: "no-repeat", paddingBottom: "820px" }}>
                        <div style={{ textAlign: "right", paddingTop: "20px", paddingRight: "50px" }}>
                            <div style={{ display: "inline", paddingRight: "30px" }}>
                                <Button text="About Us" class="btn2" href="#about" />
                            </div>
                            <div style={{ display: "inline" }}>
                                <Button text="Sign In" class="btn2" link="/signin" />
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>

            {/* Display on laptops */}
            <Container fluid className="d-none d-md-block">
                <Row id="join" style={{ paddingBottom: "100px" }}>
                    <Col md="6" style={{ padding: "100px" }}>
                        <Stack class="col2" title="For Hosts" text="Host your Space, Design, Manage and Grade your Quests!" img={true} imgPath={Two} imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" link="/signup" />} />
                    </Col>
                    <Col md="6" style={{ padding: "100px" }}>
                        <Stack class="col2" title="For Participants" text="Join Quest Spaces, Participate and View your ranks!" img={true} imgPath={Three} imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" link="/signup" />} />
                    </Col>
                </Row>
            </Container>

            {/* Display on laptops */}
            <Container fluid className="d-none d-md-block">
                <Row id="about" style={{ paddingBottom: "100px" }}>
                    <Col md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Accessibility" text="Co-curriculars on any device, anywhere." img={true} imgPath={Four} imgWidth="156" imgHeight="156" />
                    </Col>
                    <Col md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Quick and Easy" text="Automated grading and leaderboard generation." img={true} imgPath={Five} imgWidth="170" imgHeight="156" />
                    </Col>
                    <Col md="4" style={{ padding: "50px" }}>
                        <Stack class="col3" title="Diversity" text="Variety of co-curriculars, all at one platform." img={true} imgPath={Six} imgWidth="156" imgHeight="156" />

                    </Col>
                </Row>
            </Container>

            {/* Display on mobile */}
            <Container fluid className="d-md-none" style={{ width: "100%", padding: "0px" }}>
                <Container fluid className="backImg" style={{ backgroundImage: `url(${mobileImg1})`, backgroundRepeat: "no-repeat", padding: "0px" }}>
                    <div style={{ paddingTop: "10px", paddingBottom: "270px", paddingRight: "40px", paddingLeft: "40px" }}>
                        <img src={questspace} style={{ paddingTop: "100px" }}>
                        </img>
                        {/* <div style={{ display: "inline", paddingRight: "0px", float: "right" }}>
                            <Button text="About Us" class="btn2" href="#about" />
                        </div> */}
                        <div style={{ display: "inline", float: "right", paddingTop: "40px" }}>
                            <Button text="Sign In" class="btn2" link="/signin" />
                        </div>
                        <div className="questspace">
                            <span style={{ color: "#415F78" }}>Quest</span>
                            <span style={{ color: "#3caf96" }}>Space</span>
                        </div>
                        <div className="divider">
                        </div>
                        <Stack class="col1" title="We give space to everyone!" text="The perfect place to show your intellect" img={false} button={<Button text="Join our space" class="btn1" href="#joinMobile" />} />
                    </div>
                </Container>
            </Container>
            {/* Display on mobile */}
            <Container fluid className="d-md-none" style={{ width: "100%", padding: "0px" }}>
                <Container fluid>
                    <Row id="joinMobile" style={{ paddingBottom: "00px" }}>
                        <Col md="6" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                            <Stack class="col2" title="For Hosts" text="Host your Space, Design, Manage and Grade your Quests!" img={true} imgPath={Two} imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" link="/signup" />} />
                        </Col>
                        <Col md="6" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                            <Stack class="col2" title="For Participants" text="Join Quest Spaces, Participate and View your ranks!" img={true} imgPath={Three} imgWidth="330" imgHeight="230" button={<Button text="Sign Up" class="btn3" link="/signup" />} />
                        </Col>
                    </Row>
                </Container>
            </Container>
            {/* Display on mobile */}
            <Container fluid className="d-md-none" style={{ width: "100%", padding: "0px" }}>
                <Container fluid>
                    <Row id="about" style={{ paddingBottom: "100px" }}>
                        <Col md="4" style={{ padding: "50px" }}>
                            <Stack class="col3" title="Accessibility" text="Co-curriculars on any device, anywhere." img={true} imgPath={Four} imgWidth="156" imgHeight="156" />
                        </Col>
                        <Col md="4" style={{ padding: "50px" }}>
                            <Stack class="col3" title="Quick and Easy" text="Automated grading and leaderboard generation." img={true} imgPath={Five} imgWidth="170" imgHeight="156" />
                        </Col>
                        <Col md="4" style={{ padding: "50px" }}>
                            <Stack class="col3" title="Diversity" text="Variety of co-curriculars, all at one platform." img={true} imgPath={Six} imgWidth="156" imgHeight="156" />

                        </Col>
                    </Row>
                </Container>
            </Container>


            <PageFooter />
        </React.Fragment>
    )
}

export default LandingPage