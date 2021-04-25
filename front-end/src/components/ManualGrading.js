import React from "react";

const ManualGrading = (props) => {

    console.log(props.roundInfo)

    return (

        <div style={{ marginBottom: "5.5rem", marginTop: "3rem" }}>

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
            {/* Only show submissions if availble */}
            {(props.roundInfo.submissions && props.roundInfo.submissions.length !== 0) && <div className="d-none d-sm-none d-md-none d-lg-block">

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
                                {submission.filename}
                            </div>
                            <div style={{ display: "inline", float: "right" }}>
                                {submission.score}
                            </div>
                            {/* <div style={{ display: "inline-block", width: "4rem" }}>
                                {props.board[info].ranking}
                            </div>
                            <div style={{ display: "inline-block", marginLeft: "4.8rem", width: "11rem" }}>
                                {props.board[info].username}
                            </div>
                            <div style={{ display: "inline", marginLeft: "0.5rem" }}>
                                {props.board[info].name}
                            </div>
                            <div style={{ display: "inline", float: "right" }}>
                                {props.board[info].roundScore}
                            </div> */}
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