import React from "react"
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Stack = (props) => {
    return (
        <div className={`stack ${props.class}`}>
            <div style={{ paddingBottom: "40px" }}>
                {props.img && <img src={props.imgPath} width={props.imgWidth} height={props.imgHeight}></img>}
            </div>
            <div className={`title ${props.class}`} style={{ paddingBottom: "20px" }}>
                {props.title}
            </div>
            <div className={`text ${props.class}`}>
                {props.text}
            </div>
            {props.button}
        </div>
    )
}

export default Stack;