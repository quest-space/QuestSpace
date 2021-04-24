import React from "react"
import HeadSubhead from "./HeadSubhead"
import "../css/questdetails.css"


const HostRoundDetails = (props) => {

    return (
        <div className="roundDetails"
            style={{
                border: "1px solid #C4C4C4",
                boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)",
                marginLeft: "9%",
                marginRight: "9%",
                marginBottom: "5.5rem",
                marginTop: "3rem",
                // paddingBottom: "3rem",
            }}
        >
            <div
            // style={{ marginBottom: "80px" }}
            >
                <div
                    className="col-md-12"
                    style={{ margin: "0em", padding: "0em" }}
                ></div>
                <div
                    style={{
                        marginLeft: props.left,
                        marginRight: props.right,
                        // marginTop: props.top,
                    }}
                >
                    <img
                        className="image responsive resp2 d-none d-sm-none d-md-block d-lg-block"
                        src={props.roundDetails && props.roundDetails.logoURL}
                        style={{ float: "right" }}
                    />

                    <p
                        className="display-4"
                        style={{
                            paddingTop: "1.5rem",
                            fontWeight: "400",
                            fontSize: "20px",
                            color: "#46B7A1",
                            marginLeft: "0rem",
                            wordWrap: "break-word",
                        }}
                    >
                        Round Name
                    </p>
                    <div
                        className="display-4"
                        style={{
                            fontWeight: "400",
                            fontSize: "20px",
                            color: "#313131",
                            wordWrap: "break-word",
                        }}
                    >
                        {props.roundDetails && props.roundDetails.roundName}
                    </div>
                    {/* </p> */}

                    <div>
                        <HeadSubhead heading="Type" subheading={props.roundDetails && props.roundDetails.roundType} />
                        <HeadSubhead heading="Starts" subheading={props.roundDetails && props.roundDetails.startTime} />
                        <HeadSubhead heading="Ends" subheading={props.roundDetails && props.roundDetails.endTime} />
                        <HeadSubhead heading="Description and Guidelines" subheading={props.roundDetails && props.roundDetails.description} />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            paddingTop: "2rem",
                        }}
                    >
                        {/* {<button className="btnBegin" onClick={() => props.onClick(true)}>
                            Edit
                        </button>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostRoundDetails