import React, { useEffect } from "react"
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
    const [roundFetched, setRoundFetched] = React.useState(false)
    const [question, setQuestion] = React.useState({})
    const [option, setOption] = React.useState()

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
        } else {
            // console.log(`Sign in success.`)
            setRoundDetails(responseBody)
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

        if (response.status !== 201) {
            console.log(`Error in fetching questionDeatils.`)
            console.log(responseBody)
        } else {
            console.log(responseBody)
            setQuestion(responseBody.nextQuestion)
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

    useEffect(() => {
        if (started) {
            fetchQuestion(option)
            console.log("question fetched because option changed")
        }
    }, [option])

    useEffect(() => {
        if (started) {
            fetchQuestion()
            console.log("question fetched because started changed")
        }
    }, [started])


    if (!roundFetched) {
        setRoundFetched(true)
        fetchRoundDetails()
        console.log(`Round details fetched.`)
    }

    return (
        <React.Fragment>
            <MainNavbar />
            <Header />

            {!started && <RoundDetailsFormat startingtime={roundDetails.startTime} endingtime={roundDetails.endTime} allowedtime={`${roundDetails.timer} seconds`} about={roundDetails.description} onClick={setStarted} />}

            {started && <Container className="questionContainer d-none d-md-block" style={{ width: "60%" }}>

                {question.questionNum && <Question question={question} timer={timeLeft} totalTime={roundDetails.timer} setOption={setOption} />}

                {!question.questionNum && <div>
                    <h1>
                        Congratulations!!! All questions answered.
                    </h1>
                </div>}

            </Container>}

            {started && <Container className="questionContainer d-md-none" style={{ width: "100%" }}>

                {question.questionNum && <Question question={question} timer={timeLeft} totalTime={roundDetails.timer} setOption={setOption} />}

                {!question.questionNum && <div>
                    <h1>
                        Congratulations!!! All questions answered.
                    </h1>
                </div>}

            </Container>}

            <PageFooter />
        </React.Fragment>
    )
}

export default Round