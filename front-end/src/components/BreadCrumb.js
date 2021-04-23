import React from "react"
import { Link } from "react-router-dom"

const BreadCrumb = (props) => {
    // console.log("items are", props.items)
    return (
        <div className="col-md-12" style={{ marginLeft: "0em", padding: "0em" }}>
            <div id="top" style={{ paddingLeft: "9%" }} className="breadcrumb">
                {/* <div className="breadcrumb"> */}
                {props.items && props.items.map((item, index) => {
                    if (index === 0) {
                        // console.log(item)
                        return (<Link key={index} to={item.to} style={{ color: "white" }}>
                            {item.text}
                        </Link>
                        )
                    }
                    else {
                        return (
                            <Link key={index} to={item.to} style={{ color: "white" }}>
                                &nbsp;{` > ${item.text}`}
                            </Link>
                        )
                    }
                })}
                {/* </div> */}
            </div>
        </div>
    )
}

// style={{ margin: "0em", paddingLeft: "7em" }}

export default BreadCrumb