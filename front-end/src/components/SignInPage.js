<<<<<<< HEAD
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
            <InitialNavbar />
            <Container className="d-none d-md-block" style={{ border: "none" }}>
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
=======
import React from "react";

const SignInPage = () => {
  return <h1>Welcome to QuestSpace's SignIn Page!!!</h1>;
};
>>>>>>> c12e02e67f4501f7add3d0ff19539605624ed114

export default SignInPage;
