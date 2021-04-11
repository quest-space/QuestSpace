import React from "react"
import "../css/Question.css"
import QuestionOption from "./QuestionOption"

const Question = (props) => {

    return (
        <React.Fragment>
            <div className="timer">

                <i className="fas fa-stopwatch" style={{ color: "#575757", margin: "auto" }}></i>&nbsp;

                <div className="progressBar" >
                    
                    <div className="my progress-bar" style={{ borderRadius: "20px", backgroundColor: "#415F78", width: `${props.timer*100/props.totalTime}%`, height: "100%" }} ></div>
                </div>

                &nbsp;{props.timer}

            </div>
            <div className="questionBox" >
                Q{props.question.questionNumber}) {props.question.statement}
                {props.question.options.map((option, index) => {
                    return <QuestionOption questionNumber={index + 1} option={option} key={index} setOption={props.setOption}/>
                })}

            </div>
        </React.Fragment>

    )
}

export default Question