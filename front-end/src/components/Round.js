import React from "react"
import MainNavbar from "./MainNavbar"
import Header from "./Header"
import Question from "./Question"
import { Container, Row, Col } from "react-bootstrap"


const Round = () => {
    return (
        <React.Fragment>
            <MainNavbar />
            <Header />

            <Container className="questionContainer" style={{ width: "60%" }}>
                <Question />
            </Container>
        </React.Fragment>
    )
}

export default Round