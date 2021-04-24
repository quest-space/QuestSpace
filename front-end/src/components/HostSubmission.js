import React from "react"
import { useParams, useHistory } from "react-router-dom"

const HostSubmission = (props) => {

    const { roundID, questID } = useParams()

    console.log(props.roundInfo)

    return (
        <div className="mainBox myBox">
            {/* Marks */}
            <div className="questionHeading">
                Maximum Marks
            </div>
            <div className="questionText">
                {props.roundInfo.rounds.marks}
            </div>

            {/* Question Statement */}
            <div className="questionHeading">
                Question Statement:
            </div>
            <div className="questionText">
                {props.roundInfo.questions[0].statement}
            </div>

            {/* Uploaded Image if present */}
            {props.roundInfo.questions[0].imageURL && <div>
                <div className="questionHeading">
                    Uploaded Image:
                </div>
                <div className="questionText">
                    <img src={props.question.imageURL}>
                    </img>
                </div>
            </div>}

            {/* Button to edit */}
            <button>
                Edit
            </button>

        </div>
    )

}

export default HostSubmission