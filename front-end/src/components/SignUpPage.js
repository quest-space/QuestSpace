import React from "react"
import PageFooter from "./PageFooter"
import { Container, Row, Col } from "react-bootstrap"
import "../css/SignUp.css"

const SignUpPage = () => {
    return (
        <React.Fragment>
            {/* Navbar from Hareem */}
            <Container style={{border: "solid"}}>
                <Row style={{ padding: "0px" }}>
                    <Col md="6" className="d-none d-md-block" style={{border: "solid", textAlign: "Right"}}>
                        <img src="/img/signup/1.png" width="415" height="600"  >

                        </img>
                        
                    </Col>
                    <Col md="6" style={{border: "solid"}}>
                        world
                    </Col>
                </Row>
            </Container>
            <PageFooter />
        </React.Fragment>
    )
}

export default SignUpPage