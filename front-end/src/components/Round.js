import React from "react"
import MainNavbar from "./MainNavbar"
import Header from "./Header"
import Question from "./Question"
import PageFooter from "./PageFooter"
import RoundDetailsFormat from "./RoundDetailsFormat"
import { Container, Row, Col } from "react-bootstrap"
import { useParams } from "react-router-dom"


const Round = () => {
    const { roundID, questID } = useParams()

    const [started, setStarted] = React.useState(false)
    // const [expireTime, setExpireTime] = React.useState(0)
    const [timeLeft, setTimeLeft] = React.useState(0)
    // const [totalTime, setTotalTime] = React.useState(0)
    const [roundDetails, setRoundDetails] = React.useState({})
    const [question, setQuestion] = React.useState({})

    const fetchRoundDetails = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/participant/quest/${questID}/${roundID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in fetching roundDetails.`)
            console.log(responseBody.errors)
        } else {
            // console.log(`Sign in success.`)
            setRoundDetails(response.body)
        }

    }

    const fetchQuestion = async (answer) => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/participant/quest/${questID}/${roundID}/attempt`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answer: answer
            }),
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in fetching questionDeatils.`)
            console.log(responseBody.errors)
        } else {
            // console.log(`Sign in success.`)
            if(!started) {
                setStarted(true)
            }
            setQuestion(response.body.nextQuestion)
        }
    }

    const updateTimeLeft = (expireTime) => {
        // let year = new Date().getFullYear();
        const difference = expireTime - Date()
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
                // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    // const options = ["Pubg", "battlefield", "fortnite", "call of duty"]

    if(!roundDetails) {
        fetchRoundDetails()
        console.log(`Round details fetched.`)
    }

    return (
        <React.Fragment>
            <MainNavbar />
            <Header />

            {!started && <RoundDetailsFormat startingtime={roundDetails.startTime} endingtime={roundDetails.endTime} allowedtime={`${roundDetails.timer} seconds`} about={roundDetails.description} onClick={fetchQuestion} />}

            {started && <Container className="questionContainer d-none d-md-block" style={{ width: "60%" }}>

                <Question question={question} timer={timeLeft} totalTime={roundDetails.timer} fetchQuestion={fetchQuestion}/>

            </Container>}

            {/* <Container className="questionContainer d-md-none" style={{ width: "100%" }}>

                <Question questionNumber="1"
                    question="Which popular game has released games with title World at War and Black Ops?"
                    options={options} timer="45" />

            </Container> */}

            <PageFooter />
        </React.Fragment>
    )
}

export default Round