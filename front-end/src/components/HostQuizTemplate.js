import React from "react"
import HostMcqTemplate from "./HostMcqTemplate"
import HostNumericTemplate from "./HostNumericTemplate"

const RapidFireTemplate = (props) => {

    const [question, setQuestion] = React.useState({})

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
                    <input type="file">
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
                <div className="sidePanel" style={{ height: "100%", color: "#238839" }} onClick={() => props.addQuestion(question)}>
                    <span className="material-icons" style={{ fontSize: "28px" }}>
                        done
                    </span>
                </div>
            </div>

        </div >
    )
}

export default RapidFireTemplate