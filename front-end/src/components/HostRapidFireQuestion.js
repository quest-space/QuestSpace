import React from "react"

const HostRapidFireQuestion = (props) => {

    return (
        <div className="myBox questionTemplate">

            {/* Question Number */}
            <div className="questionNum">
                Q{props.question.questionNum}
            </div>

            {/* Question Section */}
            <div className="questionArea">

                {/* Question Statement */}
                <div className="questionHeading">
                    Question Statement:
                </div>
                <div className="questionText">
                    {props.question.statement}
                </div>

                {/* Uploaded Image if present */}
                {props.question.imageURL && <div>
                    <div className="questionHeading">
                        Uploaded Image:
                    </div>
                    <div className="questionText">
                        <img src={props.question.imageURL}>
                        </img>
                    </div>
                </div>}

                {/* MCQ options */}
                <div className="mcqTemplate">

                    <div className="questionHeading">
                        Answer Choices:
                    </div>

                    <div className="questionText">
                        {/* Print already added options */}
                        {props.question.options.map((option, index) => {
                            return (
                                <div className="mcqOption" key={index}>

                                    {/* Radio Circle */}
                                    <span className="material-icons icon">
                                        radio_button_{props.question.answer === option ? `checked` : `unchecked`}
                                    </span>

                                    {/* option text */}
                                    {option}

                                </div >
                            )
                        })}

                    </div>

                </div >

            </div>

            {/* Right Sidepanel only if question is removable */}
            {
                props.removable &&
                <div>
                    <div className="sidePanel" style={{ height: "100%", color: "#EB5757" }} onClick={() => props.deleteQuestion(props.question.questionNum)}>
                        <span className="material-icons" style={{ fontSize: "28px" }}>
                            close
                        </span>
                    </div>
                </div>
            }

        </div >
    )
}

export default HostRapidFireQuestion