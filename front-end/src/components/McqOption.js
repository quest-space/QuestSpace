import React, { useEffect } from "react"
// import "../css/Question.css"


const McqOption = (props) => {

    return (
        <div className={props.mcqOptionType} style={{ backgroundColor: props.color, color: props.color === "white" ? "#666666" : "white" }} onClick={() => {
            props.setSelectedOption(props.option)
        }
        }>
            {props.questionNumber})&nbsp; {props.option}
        </div >
    )
}

export default McqOption