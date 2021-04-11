import React from "react";


const changeColor = {
    "blue" : "#415F78",
    "green" : "#46B7A1",
    "grey" : "#9D9D9D"
}

const QuestRounds = (props) => {


    return (
        <div>
            {Object.keys(props.details).map((info, j)=>{
                            
                const color = props.details[info].btnColor
                return(
                    <div style={{border: "1px solid #C4C4C4", boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", margin:"7.5rem", marginTop:"0.2rem", paddingBottom:"1rem", marginBottom:"0.2rem", paddingLeft:"1rem", paddingTop:"1rem", paddingRight:"1rem"}}>    
                            {/* {Object.keys(props.details[info]).map((key, i)=>{
                                return(
                                    <p>{props.details[info][key]}</p>   
                                ) 
                            })} */}
                            <p  style={{fontWeight: "600",fontSize: "22px", marginBottom:"0rem"}}>{"Round "+j+": "+props.details[info].roundName}</p>
                            <p style={{fontWeight: "normal", fontSize: "18px", marginBottom:"0.5rem"}}>{props.details[info].roundType}</p>
                            <p class="text-muted" style={{fontWeight: "normal",fontSize: "14px", marginBottom:"0rem"}}>{"Starts: "+props.details[info].startTime}</p>
                            <p class="text-muted" style={{fontWeight: "normal",fontSize: "14px", marginBottom:"0rem"}}>{"Ends: "+props.details[info].endTime}</p>
                            <p class="text-muted" style={{fontWeight: "normal",fontSize: "14px", marginBottom:"0rem", textAlign:"right"}}>{props.details[info].statusMsg1}</p>
                            <p class="text-muted" style={{fontWeight: "normal",fontSize: "14px", marginBottom:"0rem", textAlign:"right"}}>{props.details[info].statusMsg2}</p>
                            <button id="myButton" style={{backgroundColor: changeColor[color]}} > {props.details[info].btnMsg}</button>

                                
                    </div>
                )
            })}
        </div>
    )
}

export default QuestRounds