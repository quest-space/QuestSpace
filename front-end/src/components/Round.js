import React from "react"
import MainNavbar from "./MainNavbar"
import Header from "./Header"
import Question from "./Question"
import PageFooter from "./PageFooter"
import { Container, Row, Col } from "react-bootstrap"


const Round = () => {
    const options = ["Pubg", "battlefield", "fortnite", "call of duty"]

    const totalTime = 100
    const timeRemaining = 50
    // const []

    return (
        <React.Fragment>
            <MainNavbar />
            <Header />

            <Container className="questionContainer d-none d-md-block" style={{ width: "60%" }}>

                <Question questionNumber="1"
                    question="Which popular game has released games with title World at War and Black Ops?"
                    options={options} timer="45" />

            </Container>

            <Container className="questionContainer d-md-none" style={{ width: "100%" }}>

                <Question questionNumber="1"
                    question="Which popular game has released games with title World at War and Black Ops?"
                    options={options} timer="45" />

            </Container>

            <PageFooter />
        </React.Fragment>
    )
}

export default Round