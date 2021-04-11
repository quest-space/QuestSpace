import React from "react"
import {Link} from "react-router-dom"

const Button = (props) => {
    return (
        <Link to={props.link}>
            <button className={props.class}>
                {props.text}
            </button>
        </Link>
    )
}

export default Button
