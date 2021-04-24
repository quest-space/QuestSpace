import React, { useEffect } from "react"
import AddBox from "./AddBox"
import RapidFireTemplate from "./RapidFireTemplate"
import RapidFireQuestion from "./RapidFireQuestion"

const HostRapidFire = (props) => {

    const [newQuestion, setNewQuestion] = React.useState({})
    const [showAddBox, setShowAddBox] = React.useState(true)

    // const addQuestion = (question) => {
    //     props.setQuestions([...props.questions, question])
    // }

    useEffect(() => {
        if (newQuestion.questionBody) {
            props.setQuestions([...props.questions, newQuestion.questionBody])
            setShowAddBox(true)
            // send question to backend
        }
    }, [newQuestion])

    return (
        // <React.Fragment>
        <div className="mainBox">

            {/* Score box */}
            <div className="myBox">
                Score for each question:&nbsp;{props.eachMark}
            </div>

            {/* Already added questions */}
            {props.questions.map((question, index) => {
                return (
                    <RapidFireQuestion key={index} question={question} removable={props.editable} />
                )
            })}

            {/* Add question option */}
            {props.editable && showAddBox && <AddBox onClick={() => setShowAddBox(false)} />}
            {props.editable && !showAddBox && <RapidFireTemplate questionNum={props.questions.length + 1} setNewQuestion={setNewQuestion} setShowAddBox={setShowAddBox} />}
        </div>
        // </React.Fragment>
    )

}

export default HostRapidFire