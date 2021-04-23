import React, { useEffect } from "react"
import McqOption from "./McqOption"

const McqQuestion = (props) => {

    const [selectedOption, setSelectedOption] = React.useState(props.option)

    const secondsToString = (seconds) => {
        const hr = Math.floor(seconds / 60 / 60);
        const min = Math.floor(seconds / 60) - (hr * 60);
        const sec = seconds % 60;
        return `${hr ? `${hr}h ` : ``}${min ? `${min}m ` : ``}${sec}s`
    }

    useEffect(() => {
        props.rapidFire && props.setOption(selectedOption)
    }, [selectedOption])

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
                Q{props.question.questionNum}) {props.question.statement}

                {/* Image if applicable */}
                {props.question.imageURL && <img className="questionImg" src={props.question.imageURL} />}

                {/* Question Options */}
                {props.question.options.map((option, index) => {
                    return <McqOption mcqOptionType={props.question.imageURL ? "questionOptionShort" : "questionOptionLong"} questionNumber={index + 1} option={option} key={index} setOption={props.setOption} color={selectedOption === option ? "#415F78" : "white"} setSelectedOption={setSelectedOption} />
                })}

                {/* Next Button in case of Quiz (rapidFire ==== false) */}
                {
                    !props.rapidFire && <div className="nextButtonRound">
                        <div>
                            Next&nbsp;
                            <i className="fas fa-chevron-circle-right" onClick={() => {
                                props.setOption(selectedOption)
                            }} style={{ cursor: "pointer" }}></i>
                        </div>
                    </div>
                }

            </div>
        </React.Fragment>

    )
}

export default McqQuestion