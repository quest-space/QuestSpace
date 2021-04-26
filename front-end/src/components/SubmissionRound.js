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
    const [file, setFile] = React.useState()

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
            alert("Error in fetching question. Kindly refresh the page.")
            // alert(JSON.stringify(responseBody))
            // onClose()
        } else {
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
                if (file === undefined) {
                    setModalText("Round time has ended.")
                    setShow(true)
                } else {
                    setModalText("Round time has ended and your chosen file is being autosubmitted.")
                    setShow(true)
                    autoSubmitFile(file)
                }

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

    const autoSubmitFile = async () => {
        const formData = new FormData()
        formData.set(`submittedFile`, file)

        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/quest/${questID}/${roundID}/submit`, {
            method: "POST",
            header: { 'Content-Type': 'multipart/form-data' },
            body: formData,
            credentials: "include",
        })

        if (response.status === 201) {

        } else {
            alert("Your file could not be submitted.")
        }
    }

    const submitFile = async (ev) => {
        ev.preventDefault()
        const formData = new FormData()
        formData.set(`submittedFile`, file)

        if (file === undefined) {
            alert("No file has been chosen.")
            return
        }

        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/quest/${questID}/${roundID}/submit`, {
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
                    <form onSubmit={submitFile}>
                        <input name="submittedFile" id="uploadFile" type="file" onChange={(ev) => setFile(ev.target.files[0])} />
                        <input className="submitBtn" type='submit' />
                    </form>
                </div>

            </Container>

            <QuestionModal trigger={show} onClose={onClose} text={modalText} prevRating={props.prevRating} />

        </React.Fragment >
    )
}

export default SubmissionRound