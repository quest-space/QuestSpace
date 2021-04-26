import React, { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import AddBox from "./AddBox"
import HostQuizTemplate from "./HostQuizTemplate"
import HostMcqQuestion from "./HostMcqQuestion"
import HostNumericQuestion from "./HostNumericQuestion"

const HostQuiz = (props) => {

    const { roundID, questID } = useParams()

    const [showAddBox, setShowAddBox] = React.useState(true)

    const addQuestion = async (question, image) => {

        const formData = new FormData()
        for (let key in question) {
            formData.set(key, question[key])
        }
        formData.set(`options`, JSON.stringify(question[`options`]))
        formData.set(`questName`, props.roundInfo.rounds.questName)
        formData.set(`roundName`, props.roundInfo.rounds.roundName)

        if (image) {
            formData.set(`uploadedImage`, image)
        }

        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/quest/${questID}/${roundID}/addquestion`, {
            method: "POST",
            header: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in adding question.`)
            // alert(JSON.stringify(responseBody), "Error in adding question.")
            alert("Error in adding question. Kindly retry.")
        } else {
            const temp = { ...props.roundInfo }
            temp.questions = responseBody.questions
            props.setroundInfo(temp)
            setShowAddBox(true)
        }
    }

    const deleteQuestion = async (questionNum) => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/quest/${questID}/${roundID}/${questionNum}/deletequestion`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in deleting question.`)
            // alert(JSON.stringify(responseBody), "Error in deleting question.")
            alert("Error in deleting question. Kindly retry.")
        } else {
            const temp = { ...props.roundInfo }
            temp.questions = responseBody.questions
            props.setroundInfo(temp)
        }
    }

    const cancelQuestion = () => {
        setShowAddBox(true)
    }

    return (
        // <React.Fragment>
        <div className="mainBox">

            {/* Score box */}
            <div className="myBox">
                Score for each question:&nbsp;{props.roundInfo.rounds.marks}
            </div>

            {/* Already added questions */}
            {props.roundInfo.questions && props.roundInfo.questions.map((question, index) => {
                if (question.questionType === `MCQ`)
                    return (
                        <HostMcqQuestion key={index} question={question} removable={props.roundInfo.editable} deleteQuestion={deleteQuestion} />
                    )
                else if (question.questionType === `Numeric`)
                    return (
                        <HostNumericQuestion key={index} question={question} removable={props.roundInfo.editable} deleteQuestion={deleteQuestion} />
                    )
            })}

            {/* Add question option */}
            {props.roundInfo.editable && showAddBox && <AddBox onClick={() => setShowAddBox(false)} />}
            {props.roundInfo.editable && !showAddBox && <HostQuizTemplate questionNum={props.roundInfo.questions ? props.roundInfo.questions.length + 1 : 1} addQuestion={addQuestion} cancelQuestion={cancelQuestion}
            />}
        </div>
        // </React.Fragment>
    )

}

export default HostQuiz