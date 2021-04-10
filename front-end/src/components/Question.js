import React from "react"
import "../css/Question.css"

const Question = (props) => {

    return (
        <div className="questionBox" >
            Q{props.questionNumber})
        </div>
    )
}

export default Question