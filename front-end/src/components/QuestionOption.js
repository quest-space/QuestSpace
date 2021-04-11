import React from "react"
import "../css/Question.css"


const QuestionOption = (props) => {
    return (
        <div className="questionOption" onClick={() => props.setOption(props.option)}>
            {props.questionNumber})&nbsp;{props.option}
        </div>
    )
}

export default QuestionOption