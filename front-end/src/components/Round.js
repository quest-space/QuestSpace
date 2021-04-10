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

                <div className="timer">

                    <i className="fas fa-stopwatch" style={{ color: "#575757" }}></i>
                    
                    <div class="progress" >700
                        <div class="progress-bar w-75" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">50</div>
                    </div>

                </div>

                <Question questionNumber="1"
                    question="Which popular game has released games with title World at War and Black Ops?"
                    options={options} />

            </Container>

            <Container className="questionContainer d-md-none" style={{ width: "100%" }}>

                <div className="timer">

                    <i className="fas fa-stopwatch" style={{ color: "#575757" }}></i>

                </div>

                <Question questionNumber="1"
                    question="Which popular game has released games with title World at War and Black Ops?"
                    options={options} />

            </Container>

            <PageFooter />
        </React.Fragment>
    )
}

export default Round