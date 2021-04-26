import React from "react"
import HostMcqTemplate from "./HostMcqTemplate"

const HostRapidFireTemplate = (props) => {

    const [question, setQuestion] = React.useState({})
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

    const verifyAndAddQuestion = () => {
        let error = ""
        if (question.statement === undefined || question.statement === ``) {
            error = "Question Statement is missing."
        }

        for (let i = 0; i < question.options.length; i++) {
            if (question.options[i] === "") {
                error = error + "\nEmpty answer choice present: either fill it in or remove it."
                break
            }
        }

        if (checkDuplicates(question.options))
            error = error + "\nDuplicate answer choices present. Remove one of them."

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

                {/* MCQ options */}
                <HostMcqTemplate setMCQ={setMCQ} />
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

export default HostRapidFireTemplate