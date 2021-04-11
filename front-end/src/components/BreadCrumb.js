import React from "react"

const BreadCrumb = (props) => {
    return (
        <div className="col-md-12" style={{ marginLeft: "0em", padding: "0em" }}>
            <div id="top">{props.text}</div>
        </div>
    )
}

// style={{ margin: "0em", paddingLeft: "7em" }}

export default BreadCrumb