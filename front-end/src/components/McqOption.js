import React, { useEffect } from "react"
// import "../css/Question.css"


const McqOption = (props) => {

    const [color, setColor] = React.useState("white")

    useEffect(() => {
        setColor("white")
    }, [props.option])

    return (
        <div className={props.mcqOptionType} style={{ backgroundColor: color }} onClick={() => {
            setColor("#415F78")
            props.setOption(props.option)
        }
        }>
            {props.questionNumber})&nbsp; {props.option}
        </div >
    )
}

export default McqOption