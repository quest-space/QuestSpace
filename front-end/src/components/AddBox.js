import React from "react"

const AddBox = (props) => {

    return (
        <div className="myBox addBox" onClick={() => { props.onClick && props.onClick() }}>
            {/* <i className="fas fa-plus"></i> */}
            <span className="material-icons" style={{ fontSize: "20pt", color: "#6C6C6C" }}>
                add
            </span>
        </div>
    )
}

export default AddBox