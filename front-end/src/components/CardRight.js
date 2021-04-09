import React from "react"

const CardRight = (props) => {

    return (
        <div className="cardRight" style={props.style}>
            {props.child}
        </div>
    )
}

export default CardRight