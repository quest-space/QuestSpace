import React from "react"
import { useParams } from "react-router-dom"

const QuestionModal = (props) => {

    const { questID } = useParams()

    const [rating, setRating] = React.useState(props.prevRating ? props.prevRating : 0)
    const [ratingHover, setRatingHover] = React.useState()
    const [hover, setHover] = React.useState(false)

    const closeModal = () => {
        props.onClose && props.onClose()
    }

    const sendRating = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/quest/${questID}/rate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ratingScore: rating,
            }),
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 201) {
            console.log(`Error in rating.`)
            alert(JSON.stringify(responseBody) + "Error in rating.")
        }
        closeModal()
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
                    {props.score !== undefined &&
                        <p style={{ margin: "0px 0px 10px" }}>
                            Your score is {props.score}
                        </p>
                    }

                    {/* Rating Stuff */}
                    <p style={{ fontWeight: "500", margin: "0px 0px 3px" }}>
                        Rate the Host
                    </p>

                    {/* Stars */}
                    <div style={{ display: "flex", flexDirection: "row", margin: "0px 0px 10px", cursor: "pointer" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

                        {/* Rating when not hovered */}
                        {!hover && ["", "", "", "", ""].map((_, index) => {
                            if (index <= rating - 1) {
                                return (
                                    <i key={index} className="fa fa-star" onClick={() => setRating(index + 1)} onMouseEnter={() => setRatingHover(index + 1)}></i>
                                )
                            } else {
                                return (
                                    <i key={index} className="far fa-star" onClick={() => setRating(index + 1)} onMouseEnter={() => setRatingHover(index + 1)}></i>
                                )
                            }
                        })}
                        {/* Rating when hovered */}
                        {hover && ["", "", "", "", ""].map((_, index) => {
                            if (index <= ratingHover - 1) {
                                return (
                                    <i key={index} className="fa fa-star" onClick={() => setRating(index + 1)} onMouseEnter={() => setRatingHover(index + 1)}></i>
                                )
                            } else {
                                return (
                                    <i key={index} className="far fa-star" onClick={() => setRating(index + 1)} onMouseEnter={() => setRatingHover(index + 1)}></i>
                                )
                            }
                        })}

                    </div>

                    <button onClick={() => sendRating()}>
                        Rate
                    </button>

                </div>
            </div> : ``}
        </React.Fragment>

    )
}

export default QuestionModal