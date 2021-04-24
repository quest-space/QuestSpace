import React from "react"
import McqTemplate from "./McqTemplate"

const RapidFireTemplate = (props) => {

    const [question, setQuestion] = React.useState({})

    // const addQuestion = () => {
    //     props.setNewQuestion()
    // }

    return (
        <div className="myBox questionTemplate">
            {/* Question Number */}
            <div className="questionNum">
                Q{props.questionNum}
            </div>

            <div className="questionArea">

                {/* Question Statement */}
                <div className="questionHeading">
                    Question Statement:
                </div>
                <div className="questionText">
                    <textarea rows="1" placeholder="Enter here" onInput={(ev) => { ev.target.style.height = ''; ev.target.style.height = ev.target.scrollHeight + 'px' }}>
                    </textarea>
                </div>

                {/* Uploaded Image */}
                <div className="questionHeading">
                    Uploaded Image:
                </div>
                <div className="questionText">
                    <input type="file">
                    </input>
                </div>

                {/* MCQ options */}
                <McqTemplate setQuestion={setQuestion} />

            </div>

        </div>
    )
}

export default RapidFireTemplate