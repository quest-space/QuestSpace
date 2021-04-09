import React from "react"
import PageFooter from "./PageFooter"
import { Container, Row, Col } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import "../css/SignUp.css"
import CreateAccount from "./CreateAccount"

const SignUpPage = () => {
    return (
        <React.Fragment>
            {/* Navbar from Hareem */}
            <Container className="d-none d-md-block" style={{ border: "solid" }}>
                <Row >
                    <Col md="6" className="leftCol" >
                        <div className="imgSpace">
                            <img src="/img/signup/1.png" >
                            </img>
                        </div>

                        <svg className="whiteRect">
                        </svg>

                        <svg className="backRect">
                            <rect />
                        </svg>
                    </Col>
                    <Col md="6" className="rightCol" style={{ border: "none" }}>
                        <div className="backForm">
                            <CreateAccount />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="d-md-none" style={{ border: "solid", paddingTop: "110px" } }>
                <Row>
                    <Col md="6" className="rightCol" style={{ border: "none", margin: "auto", width: "100%" }}>
                        <div className="backForm" style={{ position: "relative", margin: "auto" }}>
                            <CreateAccount />
                        </div>
                    </Col>
                </Row>
            </Container>
            <PageFooter />
        </React.Fragment>
    )
}

export default SignUpPage