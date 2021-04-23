import React from "react"

const AddBox = (props) => {

    return (
        <div className="myBox addBox" onClick={() => { props.onClick && props.onClick() }}>
            <i className="fas fa-plus"></i>
        </div>
    )
}

export default AddBox