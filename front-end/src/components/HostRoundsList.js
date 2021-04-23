import React from "react";

const HostRoundsList = (props) => {


    const left = {
        fontWeight: "normal",
        fontSize: "14px",
        marginBottom:"0rem",
        display:"inline-block",
    }

    return (
        <div style={{marginTop:"3rem", marginBottom:"5.5rem"}}>
            {Object.keys(props.response.rounds).map((info, j)=>{                   
                const color = props.response.rounds[info].btnColor
                return(
                        <div key={j} className="myBox" style={{paddingRight:"0rem"}}>   

                            <button class="cross1"> <i class="fas fa-times"></i></button>
                            <p  style={{fontWeight: "600",fontSize: "22px", marginBottom:"0rem", display:"inline-block"}}>{"Round "+props.response.rounds[info].roundNum+": "+props.response.rounds[info].roundName}</p>
                            <p style={{fontWeight: "normal", fontSize: "18px", marginBottom:"0.5rem"}}>{props.response.rounds[info].roundType}</p>
                            <p className="text-muted" style={left}>{"Starts: "+props.response.rounds[info].startTime}</p>
                            <div>
                            <p className="text-muted" style={left}>{"Ends: "+props.response.rounds[info].endTime}</p>
                            </div>
                        </div>
                )
            })}

            <div className="myBox dashedBox1">
                <button style={{width: "100%", backgroundColor: "#FFFFFF", border: "none" }}><i class="fas fa-plus"></i> </button>
            </div>
        </div>
    )

}

export default HostRoundsList