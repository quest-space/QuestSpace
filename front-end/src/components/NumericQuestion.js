import React, { useEffect } from "react"

const NumericQuestion = (props) => {

    const [selectedOption, setSelectedOption] = React.useState(props.option)

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
                    &nbsp;{secondsToString(props.timer)}
                </div>
            </div>

            <div className="questionBox" >
                Q{props.question.questionNum}) {props.question.statement}

                {/* Image if applicable */}
                {props.question.imageURL && <img className="questionImg" src={props.question.imageURL} />}

                {/* Question Options */}
                <div style={{ width: "100%", display: "flex", paddingTop: "10px" }}>
                    <div style={{ verticalAlign: "center", margin: "auto 10px auto 0px" }}>
                        Write your answer in the given box.
                    </div>

                    <input type="number" className="questionNumeric" defaultValue={null} onChange={(ev) => {
                        setSelectedOption(ev.target.value)
                    }}>
                    </input>
                </div>


                {/* Next Button */}
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

export default NumericQuestion