import React from "react"


const QuestionModal = (props) => {

    // const [trigger, setTrigger] = React.useState(props.trigger)

    const closeModal = () => {
        // setTrigger(false)
        props.onClose && props.onClose()
    }

    return (
        <React.Fragment>
            {props.trigger ? <div tabIndex="0" className="questionModal" onKeyDown={(ev) => {
                if (ev.key === `Escape` || ev.key === `Esc`)
                    closeModal()
            }}>
                <div className="back" >

                    {/* Cross to close */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", }} >
                        <i className="fa fa-times" aria-hidden="true" style={{ color: "#666666", fontSize: "10pt", padding: "8px 8px 5px 0px", cursor: "pointer" }} onClick={closeModal} ></i>
                    </div>

                    {/* Tick Icon */}
                    <i className="fa fa-check-circle" aria-hidden="true" style={{ color: "#46B7A1", fontSize: "60px", paddingBottom: "20px" }}></i>

                    {/* Text */}
                    <p style={{ textAlign: "center" }}>
                        {props.text}
                    </p>

                    {/* Score */}
                    {props.score && <p>
                        Your score is {props.score}
                    </p>}
                </div>
            </div> : ``}
        </React.Fragment>

    )
}

export default QuestionModal