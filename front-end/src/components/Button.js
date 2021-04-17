import React from "react"
import { Link } from "react-router-dom"

const Button = (props) => {
    return (
        <React.Fragment>
            {props.link && < Link to={props.link}>
            <button className={props.class}>
                {props.text}
            </button>
            </Link> }
            {props.href && < a href={props.href}>
            <button className={props.class}>
                {props.text}
            </button>
            </a> }
        </React.Fragment >

    )
}

export default Button
