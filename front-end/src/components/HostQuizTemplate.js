import React from "react"
import HostMcqTemplate from "./HostMcqTemplate"
import HostNumericTemplate from "./HostNumericTemplate"

const HostQuizTemplate = (props) => {

    // By default, the new qestion is mcq
    const [question, setQuestion] = React.useState({ questionType: "MCQ" })
    const [image, setImage] = React.useState()

    const setStatement = (ev) => {
        const temp = { ...question }
        temp.statement = ev.target.value
        setQuestion(temp)
    }

    const setMCQ = (options, answer) => {
        const temp = { ...question }
        temp.options = options
        temp.answer = answer
        setQuestion(temp)
    }

    const setNumeric = (answer) => {
        const temp = { ...question }
        temp.options = []
        temp.answer = parseFloat(answer)
        setQuestion(temp)
    }

    const setAnswerType = (ev) => {
        const temp = { ...question }
        if (ev.target.value === `Multiple Choice`)
            temp.questionType = `MCQ`
        else if (ev.target.value === `Numeric Response`)
            temp.questionType = `Numeric`
        setQuestion(temp)
    }

    return (
        <div className="myBox questionTemplate">
            {/* Question Number */}
            <div className="questionNum">
                Q{props.questionNum}
            </div>

            {/* Question Section */}
            <div className="questionArea">

                {/* Question Statement */}
                <div className="questionHeading">
                    Question Statement:
                </div>
                <div className="questionText">
                    <textarea rows="1" placeholder="Enter here" onChange={(ev) => setStatement(ev)} onInput={(ev) => { ev.target.style.height = ''; ev.target.style.height = ev.target.scrollHeight + 'px' }}>
                    </textarea>
                </div>

                {/* Uploaded Image */}
                <div className="questionHeading">
                    Uploaded Image:
                </div>
                <div className="questionText">
                    <input type="file" accept="image/png, image/jpeg" onChange={(ev) => setImage(ev.target.files[0])}>
                    </input>
                </div>

                {/* Answer Type */}
                <div className="questionHeading">
                    Answer Type:
                </div>
                <div className="questionText">
                    <select defaultValue="Multiple Choice" onChange={(ev) => setAnswerType(ev)}>
                        <option>
                            Multiple Choice
                        </option>
                        <option>
                            Numeric Response
                        </option>
                    </select>
                </div>

                {/* MCQ options or Numeric Response*/}
                {question.questionType === `MCQ` && <HostMcqTemplate setMCQ={setMCQ} />}
                {question.questionType === `Numeric` && <HostNumericTemplate setNumeric={setNumeric} />}

            </div>

            {/* Right Sidepanel */}
            <div className="sidePanel">
                <div className="sidePanel" style={{ height: "50px", color: "#313131" }} onClick={() => props.cancelQuestion()}>
                    <span className="material-icons">
                        undo
                    </span>
                </div>
                <div className="sidePanel" style={{ height: "100%", color: "#238839" }} onClick={() => props.addQuestion(question, image)}>
                    <span className="material-icons" style={{ fontSize: "28px" }}>
                        done
                    </span>
                </div>
            </div>

        </div >
    )
}

export default HostQuizTemplate