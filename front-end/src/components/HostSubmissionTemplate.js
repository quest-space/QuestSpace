import React from "react"

const HostSubmissionTemplate = (props) => {

    const [question, setQuestion] = React.useState({
        questionType: "None",
        options: null,
        answer: "",
    })

    const [marks, setMarks] = React.useState(100)

    const setStatement = (ev) => {
        const temp = { ...question }
        temp.statement = ev.target.value
        setQuestion(temp)
    }

    const updateMarks = (ev) => {
        // if (parseInt(ev.target.value) === 0) {
        //     setMarks(100)
        // } else {
        setMarks(ev.target.value)
        // }
    }

    return (
        <div className="myBox">

            <div className="questionArea" style={{ padding: "0px" }}>
                {/* Marks */}
                <div className="questionHeading">
                    Maximum Marks
                </div>
                <div className="questionText">
                    <input type="number" step="10" value={marks} onChange={(ev) => { updateMarks(ev) }}>
                    </input>
                </div>

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

                {/* Button to update */}
                <div>
                    <button onClick={() => { props.addSubmissionQuestion(question, marks) }}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HostSubmissionTemplate