import React from "react"
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Stack = (props) => {
    return (
        <div className="stack">
            <div>
                {props.img && <img src={props.imgPath} width={props.imgWidth} height={props.imgHeight}></img>}
            </div>
            <div className="title">
                {props.title}
            </div>
            <div className="text">
                {props.text}
            </div>
            {props.button}
        </div>
    )
}

export default Stack;