import React from "react"
// import "../css/Question.css"
import McqOption from "./McqOption"

const McqQuestion = (props) => {

    const secondsToString = (seconds) => {
        const hr = Math.floor(seconds / 60 / 60);
        const min = Math.floor(seconds / 60) - (hr * 60);
        const sec = seconds % 60;
        return `${hr ? `${hr}h ` : ``}${min ? `${min}m ` : ``}${sec}s`
    }

    return (
        <React.Fragment>
            <div className="progressBar">
                {/* stopwatch icon */}
                <i className="fas fa-stopwatch" style={{ color: "#575757", margin: "auto" }}></i>&nbsp;

                {/* actual timer visualization */}
                <div className="timer">

                    <div className="my progress-bar" style={{ borderRadius: "20px", backgroundColor: "#415F78", width: `${props.timer * 100 / props.totalTime}%`, height: "100%" }} ></div>
                </div>

                {/* textual representation of time remaining */}
                <div style={{ whiteSpace: "nowrap" }}>
                    &nbsp;{props.rapidFire ? `${props.timer}s` : secondsToString(props.timer)}
                </div>
            </div>

            <div className="questionBox" >
                Q{props.question.questionNumber}) {props.question.statement}

                {/* Image if applicable */}
                {props.question.imageURL && <img className="questionImg" src={props.question.imageURL} />}

                {/* Quesrion Options */}
                {props.question.options.map((option, index) => {
                    return <McqOption mcqOptionType={props.question.imageURL ? "questionOptionShort" : "questionOptionLong"} questionNumber={index + 1} option={option} key={index} setOption={props.setOption} />
                })}

            </div>
        </React.Fragment>

    )
}

export default McqQuestion