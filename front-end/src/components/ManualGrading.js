import React from "react";

const ManualGrading = (props) => {

    console.log(props.roundInfo)

    const [editable, setEditable] = React.useState(false)
    const [scores, setScores] = React.useState([])

    const updateScores = async () => {
        // const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/${roundID}`, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: "include",
        // })

        // const responseBody = await response.json()

        // if (response.status !== 200) {
        //     console.log(`Error in fetching round information.`)
        //     alert(JSON.stringify(responseBody) + "Returning back to quest page")
        //     history.replace(`/hosthomepage/quest/${questID}`) //uncomment this later
        // } else {
        //     setroundInfo(responseBody)
        // }
    }

    const storeScore = (ev) => {

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
                            <button style={{ marginRight: "7px" }}>
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
                            <button onClick={() => setEditable(true)}>
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
                                {index}
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
                                {!editable && submission.score}
                                {editable &&
                                    <input >
                                    </input>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>}



            {/* 
            <div className="d-lg-none">
                <div className="slimBox" style={{ fontSize: "20px", marginTop: "0.4rem", fontWeight: "500" }}>
                    <div style={{ display: "inline" }}>
                        Username
                    </div>
                    <div style={{ display: "inline", float: "right" }}>
                        Score
                    </div>
                </div>

                {Object.keys(props.board).map((info, j) => {
                    return (
                        <div className="slimBox" >
                            <div style={{ display: "inline-block" }}>
                                {props.board[info].ranking + ": "}
                            </div>
                            <div style={{ display: "inline-block" }}>
                                {props.board[info].username}
                            </div>
                            <div style={{ display: "inline", float: "right" }}>
                                {props.board[info].roundScore}
                            </div>
                        </div>
                    )

                })}
            </div> */}

        </div>
    )



}

export default ManualGrading;