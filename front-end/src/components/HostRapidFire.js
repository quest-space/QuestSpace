import React, { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import AddBox from "./AddBox"
import RapidFireTemplate from "./RapidFireTemplate"
import RapidFireQuestion from "./RapidFireQuestion"

const HostRapidFire = (props) => {

    const { roundID, questID } = useParams()

    // const [newQuestion, setNewQuestion] = React.useState({})
    const [showAddBox, setShowAddBox] = React.useState(true)

    const addQuestion = async (question) => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/quest/${questID}/${roundID}/addquestion`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...question,
                questName: props.roundInfo.rounds.questName,
                roundName: props.roundInfo.rounds.roundName,
                questionType: "MCQ",
            }),
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in adding question.`)
            alert(JSON.stringify(responseBody), "Error in adding question.")
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
            alert(JSON.stringify(responseBody), "Error in deleting question.")
        } else {
            const temp = { ...props.roundInfo }
            temp.questions = responseBody.questions
            console.log("before", props.roundInfo)
            console.log("after", temp)
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
                return (
                    <RapidFireQuestion key={index} question={question} removable={props.roundInfo.editable} deleteQuestion={deleteQuestion} />
                )
            })}

            {/* Add question option */}
            {props.roundInfo.editable && showAddBox && <AddBox onClick={() => setShowAddBox(false)} />}
            {props.roundInfo.editable && !showAddBox && <RapidFireTemplate questionNum={props.roundInfo.questions ? props.roundInfo.questions.length + 1 : 1} addQuestion={addQuestion} cancelQuestion={cancelQuestion}
            // setNewQuestion={setNewQuestion} setShowAddBox={setShowAddBox} 
            />}
        </div>
        // </React.Fragment>
    )

}

export default HostRapidFire