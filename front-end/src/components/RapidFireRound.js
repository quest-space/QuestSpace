import React, { useEffect } from "react"
import McqQuestion from "./McqQuestion"
import { Container } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import QuestionModal from "./QuestionModal"

const RapidFireRound = (props) => {
    const { roundID, questID } = useParams()

    const history = useHistory()

    const [expireTime, setExpireTime] = React.useState()
    const [timeLeft, setTimeLeft] = React.useState(`${props.timer}`)
    const [question, setQuestion] = React.useState({})
    const [option, setOption] = React.useState()
    const [score, setScore] = React.useState(0)

    const [show, setShow] = React.useState(false)
    const [modalText, setModalText] = React.useState("")

    const fetchQuestion = async (answer) => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/quest/${questID}/${roundID}/attempt`, {
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
            alert(JSON.stringify(responseBody))
            onClose()
        } else {
            // only set expireTime if not set previously
            if (!expireTime) {
                setExpireTime(responseBody.expireTime)
                updateTimeLeft(responseBody.expireTime)
            }
            if (responseBody.message === "questions exhausted") {
                setScore(responseBody.roundScore)
                setModalText("Congratulations!!! You have completed the round.")
                setShow(true)
            } else {
                // responseBody.nextQuestion["imageURL"] = "/q1.png"
                setQuestion(responseBody.nextQuestion)
                setScore(responseBody.roundScore)
            }

        }
    }

    const updateTimeLeft = (expireTime) => {

        if (!expireTime) return

        const difference = Math.floor(((new Date(expireTime)).getTime() - Date.now()) / 1000)


        if (difference < 0) {
            if (!show) {
                setModalText("Timer has expired.")
                setShow(true)
            }
        } else {
            setTimeLeft(difference)
        }

    };

    useEffect(() => {
        setTimeout(() => {
            if (!show)
                updateTimeLeft(expireTime)
        }, 1000);
    }, [timeLeft])

    useEffect(() => {
        fetchQuestion(option)
        console.log("question fetched because option changed")
    }, [option])

    const onClose = () => {
        history.replace(`/participanthomepage/quest/${questID}`)
    }

    return (
        <React.Fragment>

            {<Container className="questionContainer" >

                {question.questionNum && <McqQuestion question={question} timer={timeLeft} totalTime={props.timer} setOption={setOption} rapidFire={true} />}

            </Container>}

            <QuestionModal trigger={show} onClose={onClose} text={modalText} score={score} />

        </React.Fragment >
    )
}

export default RapidFireRound