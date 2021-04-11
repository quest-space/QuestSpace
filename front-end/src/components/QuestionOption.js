import React from "react"
import "../css/Question.css"


const QuestionOption = (props) => {
    return (
        <div className="questionOption" onClick={() => props.fetchQuestion(props.option)}>
            {props.questionNumber})&nbsp;{props.option}
        </div>
    )
}

export default QuestionOption