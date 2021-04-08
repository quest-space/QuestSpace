import React from "react"

const Button = (props) => {
    return (
        <a href={props.link}>
            <button className={props.class}>
                {props.text}
            </button>
        </a>
    )
}

export default Button
