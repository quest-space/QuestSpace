import React from "react"
import {Link} from "react-router-dom"

const Button = (props) => {
    return (
      <button className={props.class} onClick={props.clickFunc}>
          {props.text}
      </button>
    )
}

export default Button
