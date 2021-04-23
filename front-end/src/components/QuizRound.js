import React, { useEffect } from "react"
import McqQuestion from "./McqQuestion"
import NumericQuestion from "./NumericQuestion"
import { Container } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import QuestionModal from "./QuestionModal"

const QuizRound = (props) => {

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
            alert(JSON.stringify(responseBody))
            onClose()
        } else {
            // const responseBody = { "nextQuestion": { "questionNum": 1, "statement": "When did Pakistan come into being?", "options": ["1945", "1947", "1948", "None of the above"] }, "expireTime": "2021-04-22T19:26:39.839Z", "expireDateTime": "Thu Apr 22 2021 19:26:39 GMT+0000 (Coordinated Universal Time)", "currTime": "Thu Apr 22 2021 19:25:04 GMT+0000 (Coordinated Universal Time)", "score": 0, "answerStatus": "incorrect", "roundScore": 0 }
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

                if (!show) {
                    setQuestion(responseBody.nextQuestion)
                    setScore(responseBody.roundScore)
                }
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
                fetchQuestion(option)
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
        console.log("question fetched because option changed", option)
    }, [option])

    const onClose = () => {
        // console.log("rerouting") // uncomment it at the end
        history.replace(`/participanthomepage/quest/${questID}`)
    }

    return (
        <React.Fragment>

            {<Container className="questionContainer" >

                {/* Render Mcq Question if options is not an empty array */}
                {question.questionNum && question.options.length !== 0 && <McqQuestion question={question} timer={timeLeft} totalTime={props.timer} option={option} setOption={setOption} rapidFire={false} />}

                {/* Render Numeric Question if options is an empty array*/}
                {question.questionNum && question.options.length === 0 && <NumericQuestion question={question} timer={timeLeft} totalTime={props.timer} option={option} setOption={setOption} rapidFire={false} />}

            </Container>}

            <QuestionModal trigger={show} onClose={onClose} text={modalText} score={score} />

        </React.Fragment >
    )
}

export default QuizRound