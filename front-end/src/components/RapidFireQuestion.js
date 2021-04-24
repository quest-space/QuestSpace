import React from "react"

const RapidFireQuestion = (props) => {

    const num = 1
    const statement = "question statement"
    const options = ["hello testnn option", 2, 4]
    const answer = 4

    return (
        <div className="myBox questionTemplate">

            {/* Question Number */}
            <div className="questionNum">
                Q{num}
            </div>

            {/* Question Section */}
            <div className="questionArea">

                {/* Question Statement */}
                <div className="questionHeading">
                    Question Statement:
                </div>
                <div className="questionText">
                    {statement}
                </div>

                {/* MCQ options */}
                <div className="mcqTemplate">

                    <div className="questionHeading">
                        Answer Choices:
                    </div>

                    <div className="questionText">
                        {/* Print already added options */}
                        {options.map((option, index) => {
                            return (
                                <div className="mcqOption" key={index}>

                                    {/* Radio Circle */}
                                    <span className="material-icons icon">
                                        radio_button_{answer === option ? `checked` : `unchecked`}
                                    </span>

                                    {/* option text */}
                                    {option}

                                </div >
                            )
                        })}

                    </div>

                </div >

            </div>

            {/* Right Sidepanel */}
            <div className="sidePanel">
                <div className="sidePanel" style={{ height: "100%", color: "#EB5757" }}>
                    <span className="material-icons" style={{ fontSize: "28px" }}>
                        close
                    </span>
                </div>
            </div>

        </div >
    )
}

export default RapidFireQuestion