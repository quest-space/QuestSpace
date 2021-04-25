import React from "react"
import { useParams, useHistory } from "react-router-dom"
import HostSubmissionQuestion from "./HostSubmissionQuestion"
import HostSubmissionTemplate from "./HostSubmissionTemplate"

const HostSubmission = (props) => {

    const { roundID, questID } = useParams()

    const addSubmissionQuestion = async (question, marks) => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/${roundID}/addquestion`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...question,
                questName: props.roundInfo.rounds.questName,
                roundName: props.roundInfo.rounds.roundName,
            }),
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in adding submission question.`)
            alert(JSON.stringify(responseBody) + "Error in adding submission question.")
            return
        }
        // else {
        //     const temp = { ...props.roundInfo }
        //     temp.questions = responseBody.questions
        //     props.setroundInfo(temp)
        // }

        const response2 = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/${roundID}/setEach`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eachQuestion: marks,
            }),
            credentials: "include",
        })

        const responseBody2 = await response2.json()

        if (response2.status !== 200) {
            console.log(`Error in updating submission marks.`)
            alert(JSON.stringify(responseBody2) + "Error in adding submission question.")
        } else {
            const temp = { ...props.roundInfo }
            temp.rounds.marks = marks
            temp.questions = responseBody.questions
            props.setroundInfo(temp)
        }
    }

    const deleteQuestion = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/${roundID}/1/deletequestion`, {
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
            props.setroundInfo(temp)
        }
    }

    return (
        <div className="mainBox">

            {/* Add a submission question if no question exits */}
            {(!props.roundInfo.questions || props.roundInfo.questions.length === 0) &&
                <HostSubmissionTemplate addSubmissionQuestion={addSubmissionQuestion} marks={props.roundInfo.rounds.marks} />
            }
            {/* Display the already existing question */}
            {props.roundInfo.questions && props.roundInfo.questions.length === 1 && <HostSubmissionQuestion roundInfo={props.roundInfo} deleteQuestion={deleteQuestion} />}

        </div>
    )

}

export default HostSubmission