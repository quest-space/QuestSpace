import React from "react"

const HostNumericTemplate = (props) => {

    return (
        <div className="numericTemplate">

            <div className="questionHeading">
                Correct Answer:
            </div>
            < div className="qError">
                {props.errors[1]}
            </div>

            <div className="questionText">
                <input type="number" placeholder="Enter here" style={{
                    border: "none",
                    borderBottom: "solid 1px #575757",
                    width: "160px",
                    color: "#575757",
                }} onChange={(ev) => props.setNumeric(ev.target.value)}>

                </input>
            </div>

        </div>
    )
}

export default HostNumericTemplate