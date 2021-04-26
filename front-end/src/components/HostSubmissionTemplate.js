import { type } from "jquery"
import React from "react"

const HostSubmissionTemplate = (props) => {

    const [question, setQuestion] = React.useState({
        questionType: "None",
        options: null,
        answer: "",
    })
    const [image, setImage] = React.useState()
    const [marks, setMarks] = React.useState(100)
    const [errors, setErrors] = React.useState([``, ``])

    const setStatement = (ev) => {
        const temp = { ...question }
        temp.statement = ev.target.value
        setQuestion(temp)
    }

    const updateMarks = (ev) => {
        setMarks(ev.target.value)
    }

    const addQuestion = () => {
        let error = ""
        const temp = [``, ``]
        if (question.statement === undefined || question.statement === "") {
            error = "Question Statement is missing."
            temp[0] = "Question Statement is missing."
        }
        if (marks === "") {
            error = error + " Maximum marks are missing."
            temp[1] = "Maximum marks are missing."
        } else if (parseInt(marks) != marks) {
            error = error + " Maximum marks must be an integer."
            temp[1] = "Maximum marks must be an integer."
        }

        setErrors(temp)

        if (error !== "") {
            // alert(error)
        }
        else
            props.addSubmissionQuestion(question, image, marks)
    }

    return (
        <div className="myBox">

            <div className="questionArea" style={{ padding: "0px" }}>
                {/* Marks */}
                <div className="questionHeading">
                    Maximum Marks:
                </div>
                < div className="qError">
                    {errors[1]}
                </div>
                <div className="questionText">
                    <input type="number" step="10" value={marks} onChange={(ev) => { updateMarks(ev) }}>
                    </input>
                </div>

                {/* Question Statement */}
                <div className="questionHeading">
                    Question Statement:
                </div>
                < div className="qError">
                    {errors[0]}
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

                {/* Button to update */}
                <div>
                    <button onClick={() => addQuestion()}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HostSubmissionTemplate