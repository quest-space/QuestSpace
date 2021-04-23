import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useParams, useHistory } from "react-router-dom"
import QuestionModal from "./QuestionModal"

const SubmissionRound = (props) => {
    const { roundID, questID } = useParams()

    const history = useHistory()

    const [expireTime, setExpireTime] = React.useState()
    const [timeLeft, setTimeLeft] = React.useState(`${props.timer}`)
    const [question, setQuestion] = React.useState({})

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
            // const responseBody = { "nextQuestion": { "questionNum": 1, "statement": "When did Pakistan come into being?", "options": ["1945", "1947", "1948", "None of the above"] }, "expireTime": "2021-04-23T19:26:39.839Z", "expireDateTime": "Thu Apr 22 2021 19:26:39 GMT+0000 (Coordinated Universal Time)", "currTime": "Thu Apr 22 2021 19:25:04 GMT+0000 (Coordinated Universal Time)", "score": 0, "answerStatus": "incorrect", "roundScore": 0 }

            // set expireTime
            setExpireTime(responseBody.expireTime)
            updateTimeLeft(responseBody.expireTime)
            setQuestion(responseBody.nextQuestion)
        }
    }

    const updateTimeLeft = (expireTime) => {

        if (!expireTime) return

        const difference = Math.floor(((new Date(expireTime)).getTime() - Date.now()) / 1000)

        if (difference < 0) {
            if (!show) {
                setModalText("Round time has ended.")
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
        fetchQuestion()
        console.log("question fetched on initial render")
    }, [])

    const onClose = () => {
        history.replace(`/participanthomepage/quest/${questID}`)
    }

    const formSubmit = async (ev) => {

        ev.preventDefault()

        const formData = new FormData(ev.target)

        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/${questID}/${roundID}/submit`, {
            method: "POST",
            header: { 'Content-Type': 'multipart/form-data' },
            body: formData,
            credentials: "include",
        })

        if (response.status === 201) {
            setModalText("Your file has been submitted.")
            setShow(true)
        } else {
            alert("Your file could not be submitted. Kindly resubmit.")
        }
    }

    return (
        <React.Fragment>

            <Container className="questionContainer" >

                <div className="progressBar" style={{ display: "flex", justifyContent: "flex-start", fontWeight: "normal" }}>

                    {/* stopwatch icon */}
                    <i className="fas fa-stopwatch" style={{ color: "#575757", margin: "auto 0px" }}></i>&nbsp;

                    {/* Submission Deadline */}
                    Submission closes at:&nbsp;{props.endTime}
                </div>

                <div className="questionBox" >
                    {question.statement}

                    {/* Image if applicable */}
                    {question.imageURL && <img className="questionImg" src={question.imageURL} />}

                    {/* Submission Stuff */}
                    <form onSubmit={formSubmit}>
                        <input name="submittedFile" id="uploadFile" type="file" />
                        <input className="submitBtn" type='submit' />
                    </form>
                </div>

            </Container>

            <QuestionModal trigger={show} onClose={onClose} text={modalText} />

        </React.Fragment >
    )
}

export default SubmissionRound