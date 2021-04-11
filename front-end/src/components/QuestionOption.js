import React, { useEffect } from "react"
import "../css/Question.css"


const QuestionOption = (props) => {

    const [color, setColor] = React.useState("white")

    useEffect(() => {
        setColor("white")
    })

    return (
        <div className="questionOption" style={{ backgroundColor: color }} onClick={() => {
            setColor("#415F78")
            props.setOption(props.option)
        }
        }>
            {props.questionNumber})&nbsp; {props.option}
        </div >
    )
}

export default QuestionOption