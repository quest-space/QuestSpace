import React from "react"
import leftCardImage from "../img/signup/leftcard.png"

const CardLeft = () => {
    return (
        <React.Fragment>
            <div className="imgSpace">
                <img src={leftCardImage} >
                </img>
            </div>

            <svg className="whiteRect">
            </svg>

            <svg className="backRect">
                <rect />
            </svg>
        </React.Fragment>
    )
}

export default CardLeft