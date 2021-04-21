import React, { useEffect } from "react"
import MainNavbar from "./MainNavbar"
import Header from "./Header"
import Question from "./Question"
import PageFooter from "./PageFooter"
import RoundDetailsFormat from "./RoundDetailsFormat"
import { Container, Row, Col } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import BreadCrumb from "./BreadCrumb"


const Round = (props) => {
    const { roundID, questID } = useParams()

    const [expireTime, setExpireTime] = React.useState()
    const [timeLeft, setTimeLeft] = React.useState(0)

    // Working
    const [started, setStarted] = React.useState(false)
    const [roundDetails, setRoundDetails] = React.useState({})
    const [roundFetched, setRoundFetched] = React.useState(false)
    const [question, setQuestion] = React.useState({})
    const [option, setOption] = React.useState()
    const [score, setScore] = React.useState(0)

    const history = useHistory()

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
            if (responseBody.message) {
                setScore(responseBody.roundScore)
            }
            if (!expireTime) {
                setExpireTime(responseBody.expireTime)
                updateTimeLeft(responseBody.expireTime)
            }
            if (responseBody.genericErrMsg) {

            }
        }
    }

    const updateTimeLeft = (expireTime) => {
        const difference = Math.floor(((new Date(expireTime)).getTime() - Date.now()) / 1000)

        if (difference <= 0) {
            alert("Round time is over. Redirecting back to quest page.")
            history.push(`/participanthomepage/quest/${questID}`)
        }

        setTimeLeft(difference)
    };

    useEffect(() => {
        setTimeout(() => {
            updateTimeLeft(expireTime)
        }, 1000);
    }, [timeLeft])

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
            <Header heading={`Round ${roundID}: ${roundDetails.roundName}`} subheading={roundDetails.questName} />

            <BreadCrumb items={[{ text: "Home", to: "/participanthomepage" }, { text: roundDetails.questName, to: `/participanthomepage/quest/${questID}` }, { text: `Round ${roundID}`, to: `/participanthomepage/quest/${questID}/round/${roundID}` }]} />

            {!started && <RoundDetailsFormat startingtime={roundDetails.startTime} endingtime={roundDetails.endTime} allowedtime={`${roundDetails.timer} seconds`} about={roundDetails.description} onClick={setStarted} />}

            {started && <Container className="questionContainer d-none d-md-block" style={{ width: "60%" }}>

                {question.questionNum && <Question question={question} timer={timeLeft} totalTime={roundDetails.timer} setOption={setOption} />}

                {!question.questionNum && <div>
                    <h1>
                        Congratulations!!! Your round score is {score}.
                    </h1>
                </div>}

            </Container>}

            {started && <Container className="questionContainer d-md-none" style={{ width: "100%" }}>

                {question.questionNum && <Question question={question} timer={timeLeft} totalTime={roundDetails.timer} setOption={setOption} />}

                {!question.questionNum && <div>
                    <h1>
                        Congratulations!!! Your round score is {score}.
                    </h1>
                </div>}

            </Container>}

            <PageFooter />
        </React.Fragment>
    )
}

export default Round