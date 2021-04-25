import React from "react"

const HostSubmissionQuestion = (props) => {

    return (
        <div className="myBox questionTemplate">

            {/* Question Section */}
            <div className="questionArea">

                {/* Marks */}
                <div className="questionHeading">
                    Maximum Marks
                </div>
                <div className="questionText">
                    {props.roundInfo.rounds.marks}
                </div>

                {/* Question Statement */}
                <div className="questionHeading">
                    Question Statement:
                </div>
                <div className="questionText">
                    {props.roundInfo.questions[0].statement}
                </div>

                {/* Uploaded Image if present */}
                {props.roundInfo.questions[0].imageURL && <div>
                    <div className="questionHeading">
                        Uploaded Image:
                    </div>
                    <div className="questionText">
                        <img src={props.question.imageURL}>
                        </img>
                    </div>
                </div>}
            </div>

            {/* Right Sidepanel only if question is removable */}
            {
                props.roundInfo.editable &&
                <div>
                    <div className="sidePanel" style={{ height: "100%", color: "#EB5757" }} onClick={() => props.deleteQuestion()}>
                        <span className="material-icons" style={{ fontSize: "28px" }}>
                            close
                        </span>
                    </div>
                </div>
            }

        </div >
    )
}

export default HostSubmissionQuestion