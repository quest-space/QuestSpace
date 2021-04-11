import React from "react"
import "../css/Question.css"


const QuestionOption = (props) => {
    return (
        <div className="questionOption">
            {props.questionNumber})&nbsp;{props.option}
        </div>
    )
}

export default QuestionOption