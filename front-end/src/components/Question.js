import React from "react"
import "../css/Question.css"
import QuestionOption from "./QuestionOption"

const Question = (props) => {

    return (
        <div className="questionBox" >
            Q{props.questionNumber}) {props.question}
            {props.options.map((option,index) =>{
                return <QuestionOption questionNumber={index+1} option={option} key={index} />
            })}

        </div>
    )
}

export default Question