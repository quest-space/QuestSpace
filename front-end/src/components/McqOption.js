import React, { useEffect } from "react"
// import "../css/Question.css"


const McqOption = (props) => {

    // const [color, setColor] = React.useState(props.color)

    // useEffect(() => {
    //     setColor("white")
    // }, [props.option])

    return (
        <div className={props.mcqOptionType} style={{ backgroundColor: props.color, color: props.color === "white" ? "#666666" : "white" }} onClick={() => {
            // setColor("#415F78")
            // props.setOption(props.option)
            props.setSelectedOption(props.option)
        }
        }>
            {props.questionNumber})&nbsp; {props.option}
        </div >
    )
}

export default McqOption