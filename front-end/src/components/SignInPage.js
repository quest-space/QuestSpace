import React from "react"
import PageFooter from "./PageFooter"
import { Container, Row, Col } from "react-bootstrap"
import "../css/SignUp.css"
import CreateAccount from "./CreateAccount"
import CardLeft from "./CardLeft"
import CardRight from "./CardRight"
import InitialNavbar from "./InitialNavbar"
import SignInCard from "./SignInCard"


const SignInPage = () => {
    return (
        <React.Fragment>
            <InitialNavbar sign="Sign Up"/>
            <Container className="signUpContainer d-none d-md-block" style={{ border: "none" }}>
                <Row >
                    <Col md="6" className="leftCol" >
                        <CardLeft />
                    </Col>
                    <Col md="6" className="rightCol" style={{ border: "none" }}>
                        <CardRight child={<SignInCard />} />
                    </Col>
                </Row>
            </Container>
            <Container className="d-md-none" style={{ border: "none", paddingTop: "110px" }}>
                <Row>
                    <Col md="6" className="rightCol" style={{ border: "none", margin: "auto", width: "100%" }}>
                        <CardRight child={<SignInCard />} style={{ position: "relative", margin: "auto" }} />
                    </Col>
                </Row>
            </Container>
            <PageFooter />
        </React.Fragment>
    )
}

export default SignInPage;
