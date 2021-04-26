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
        // temp.answer = parseFloat(answer)
        temp.answer = answer
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

    const verifyAndAddQuestion = () => {
        let error = ""
        if (question.statement === undefined || question.statement === ``) {
            error = "Question Statement is missing."
        }

        // For MCQ 
        if (question.questionType === `MCQ`) {
            for (let i = 0; i < question.options.length; i++) {
                if (question.options[i] === "") {
                    error = error + "\nEmpty answer choice present: either fill it in or remove it."
                    break
                }
            }

            if (checkDuplicates(question.options))
                error = error + "\nDuplicate answer choices present. Remove one of them."
        }

        // For numeric question
        if (question.questionType === `Numeric`) {
            if (question.answer === "")
                error = error + "\nCorrect Answer is not provided."
        }

        if (error !== "")
            alert(error)
        else
            props.addQuestion(question, image)
    }

    const checkDuplicates = (array) => {
        for (let i = 0; i < array.length; i++) {
            for (let j = i + 1; j < array.length; j++) {
                if (array[i] === array[j]) return true
            }
        }
        return false
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
                <div className="sidePanel" style={{ height: "100%", color: "#238839" }} onClick={() => verifyAndAddQuestion()}>
                    <span className="material-icons" style={{ fontSize: "28px" }}>
                        done
                    </span>
                </div>
            </div>

        </div >
    )
}

export default HostQuizTemplate