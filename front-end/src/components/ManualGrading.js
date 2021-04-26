import React from "react";
import { useParams } from "react-router-dom"

const ManualGrading = (props) => {

    const { roundID, questID } = useParams()

    const [editable, setEditable] = React.useState(false)
    const [scores, setScores] = React.useState([])

    const makeEditable = () => {
        setScores(props.roundInfo.submissions.map((submission) => submission.score))
        setEditable(true)
    }

    const updateScores = async () => {
        const marksList = props.roundInfo.submissions.map((submission, index) => {
            return ({
                username: submission.username,
                score: scores[index]
            })
        })

        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/${roundID}/grade`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                marks: marksList,
            }),
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in updating marks.`)
            // alert(JSON.stringify(responseBody) + "Error in updating marks.")
            alert("Error in updating marks. Kindly try again.")
        } else {
            const temp = { ...props.roundInfo }
            scores.forEach((score, index) => temp.submissions[index].score = score)
            temp.leaderboard = responseBody.leaderboard
            props.setroundInfo(temp)
            setEditable(false)
        }
    }

    const storeScore = (ev, index) => {
        const temp = [...scores]
        // if (ev.target.value === `` || Number.isNaN(parseInt(ev.target.value)) || parseInt(ev.target.value) > props.roundInfo.rounds.marks) {
        if (ev.target.value === `` || ev.target.value > props.roundInfo.rounds.marks || ev.target.value < 0) {
            temp[index] = null
        } else {
            temp[index] = ev.target.value
        }
        setScores(temp)
    }

    return (

        <div className="manualGrading" style={{ marginBottom: "5.5rem", marginTop: "3rem" }}>

            {/* If submissions not availble, show message. */}
            {(!props.roundInfo.submissions || props.roundInfo.submissions.length === 0) && <div style={{
                border: "1px solid #C4C4C4",
                boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)",
                marginBottom: "5.5rem",
                marginLeft: "9%",
                marginRight: "9%",
                padding: "2rem"
            }}>
                <i className="fas fa-exclamation-circle"></i> Not Available
            </div>}


            {/* Display for desktops */}
            {/* Only show submissions if available */}
            {(props.roundInfo.submissions && props.roundInfo.submissions.length !== 0) && <div className="d-none d-sm-none d-md-none d-lg-block">

                {/* Box with Controls */}
                <div className="slimBox" style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
                    {editable &&
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button style={{ marginRight: "7px" }} onClick={() => updateScores()}>
                                Update
                                <span className="material-icons" style={{ color: "#238839", fontSize: "12pt" }}>
                                    done
                                </span>
                            </button>
                            <button onClick={() => setEditable(false)}>
                                Cancel
                                <span className="material-icons" style={{ color: "#EB5757", fontSize: "12pt" }}>
                                    close
                                </span>
                            </button>
                        </div>}

                    {!editable &&
                        <div>
                            <button onClick={() => makeEditable()}>
                                Grade
                                <span className="material-icons" style={{ color: "#46B7A1", fontSize: "12pt" }}>
                                    assignment_turned_in
                                </span>
                            </button>
                        </div>}
                </div>

                {/* Table Column Headings */}
                <div className="slimBox" style={{ fontSize: "20px", marginTop: "0.4rem", fontWeight: "500" }}>
                    <div style={{ display: "inline", paddingRight: "1.9rem" }}>
                        #
                    </div>
                    <div style={{ display: "inline", marginLeft: "6rem" }}>
                        Username
                    </div>
                    <div style={{ display: "inline", marginLeft: "6rem" }}>
                        Name
                    </div>
                    <div style={{ display: "inline", marginLeft: "8.4rem" }}>
                        Submission
                    </div>
                    <div style={{ display: "inline", float: "right" }}>
                        Score
                    </div>
                </div>

                {/* List of submissions */}
                {props.roundInfo.submissions.map((submission, index) => {

                    return (
                        <div key={index} className="slimBox" >
                            <div style={{ display: "inline-block", width: "4rem" }}>
                                {index + 1}
                            </div>
                            <div style={{ display: "inline-block", marginLeft: "4.8rem", width: "11rem" }}>
                                {submission.username}
                            </div>
                            <div style={{ display: "inline-block", marginLeft: "0.5rem", width: "11rem" }}>
                                {submission.fullname}
                            </div>
                            <div style={{ display: "inline", marginLeft: "0.5rem" }}>
                                <a download={submission.filename} href={submission.fileURL.substr(58)} style={{ color: "#212529" }}>
                                    {submission.filename}
                                </a>
                            </div>
                            <div style={{ display: "inline", float: "right" }}>
                                {!editable && (submission.score !== null ? submission.score : `-`)}
                                {editable &&
                                    <input type="number" value={scores[index] !== null ? scores[index] : ``} onChange={(ev) => storeScore(ev, index)}>
                                    </input>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>}


            {/* Display for smaller screens */}
            {/* Only show submissions if available */}
            {(props.roundInfo.submissions && props.roundInfo.submissions.length !== 0) && <div className="d-lg-none">

                {/* Box with Controls */}
                <div className="slimBox" style={{ paddingRight: "1rem", paddingLeft: "1rem" }}>
                    {editable &&
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button style={{ marginRight: "7px" }} onClick={() => updateScores()}>
                                Update
                                <span className="material-icons" style={{ color: "#238839", fontSize: "12pt" }}>
                                    done
                                </span>
                            </button>
                            <button onClick={() => setEditable(false)}>
                                Cancel
                                <span className="material-icons" style={{ color: "#EB5757", fontSize: "12pt" }}>
                                    close
                                </span>
                            </button>
                        </div>}

                    {!editable &&
                        <div>
                            <button onClick={() => makeEditable()}>
                                Grade
                                <span className="material-icons" style={{ color: "#46B7A1", fontSize: "12pt" }}>
                                    assignment_turned_in
                                </span>
                            </button>
                        </div>}
                </div>

                {/* Table Column Headings */}
                <div className="slimBox" style={{ fontSize: "20px", marginTop: "0.4rem", fontWeight: "500" }}>
                    <div style={{ display: "inline" }}>
                        Username
                    </div>
                    <div style={{ display: "inline", float: "right" }}>
                        Score
                    </div>
                </div>

                {/* List of submissions */}
                {props.roundInfo.submissions.map((submission, index) => {

                    return (
                        <div key={index} className="slimBox" >
                            <div style={{ display: "inline-block" }}>
                                <a download={submission.filename} href={submission.fileURL.substr(58)} style={{ color: "#212529" }}>
                                    {submission.username}
                                </a>
                            </div>
                            <div style={{ display: "inline", float: "right" }}>
                                {!editable && (submission.score !== null ? submission.score : `-`)}
                                {editable &&
                                    <input value={scores[index] !== null ? scores[index] : ``} onChange={(ev) => storeScore(ev, index)}>
                                    </input>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>}

        </div>
    )



}

export default ManualGrading;