import React, { useEffect } from "react"
import AddBox from "./AddBox"
import RapidFireTemplate from "./RapidFireTemplate"

const HostRapidFire = (props) => {

    const [newQuestion, setNewQuestion] = React.useState({})
    const [showAddBox, setShowAddBox] = React.useState(true)

    const addQuestion = (question) => {
        props.setQuestions([...props.questions, question])
    }

    useEffect(() => {
        if (newQuestion.questionBody) {
            props.setQuestions([...props.questions, newQuestion.questionBody])
            setShowAddBox(true)
            // send question to backend
        }
    }, [newQuestion])

    return (
        <div className="mainBox">
            {showAddBox && <AddBox onClick={() => setShowAddBox(false)} />}
            {!showAddBox && <RapidFireTemplate questionNum={props.questions.length + 1} />}
        </div>
    )

}

export default HostRapidFire