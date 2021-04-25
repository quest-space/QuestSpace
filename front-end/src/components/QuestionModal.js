import React from "react"


const QuestionModal = (props) => {

    const closeModal = () => {
        props.onClose && props.onClose()
    }

    const rating = 0

    return (
        <React.Fragment>

            {/* {props.trigger ? <div tabIndex="0" className="questionModal" onKeyDown={(ev) => { */}

            {true ? <div tabIndex="0" className="questionModal" onKeyDown={(ev) => {
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
                        {props.text} Round has ended
                    </p>

                    {/* Score */}
                    {props.score !== undefined &&
                        <p>
                            Your score is {props.score}
                        </p>
                    }
                    <p style= {{margin: "0px 0px 10px"}}>
                        Your score is {props.score} 10
                    </p>
                    {/* Rating Stuff */}
                    <p style={{ fontWeight: "500" , margin: "0px 0px 3px"}}>
                        Rate the Host
                    </p>

                    <div style={{ display: "flex", flexDirection: "row" , margin:"0px 0px 25px"}}>
                        {["", "", "", "", ""].map((_, index) => {
                            if (index <= rating - 1) {
                                return (
                                    <i key={index} className="fa fa-star"></i>
                                )
                            } else {
                                return (
                                    <i key={index} className="far fa-star"></i>
                                )
                            }
                        })}
                    </div>
                    
                    <button>
                        Rate
                    </button>

                </div>
            </div> : ``}
        </React.Fragment>

    )
}

export default QuestionModal