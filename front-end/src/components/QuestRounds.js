import React from "react";
import {Link, useHistory} from "react-router-dom"

const changeColor = {
    "blue" : "#415F78",
    "green" : "#46B7A1",
    "grey" : "#9D9D9D"
}

const QuestRounds = (props) => {

    const history = useHistory()
    const left = {
        fontWeight: "normal",
        fontSize: "14px",
        marginBottom:"0rem",
        display:"inline-block",
    }

    const right = {
        fontWeight: "normal",
        fontSize: "14px",
        marginBottom:"0rem", 
        float:"right",
        display:"inline-block"
    }

    const right1 = {
        fontWeight: "normal",
        fontSize: "14px",
        marginBottom: "0rem", 
        marginTop: "0.5rem"
    }

    const right2 = {
        fontWeight: "normal",
        fontSize: "14px",
        marginBottom:"1rem", 
    }
    
    const roundLeaderboard = (color, link) => {
        if (color === "blue"){
            history.push({pathname:link+"/leaderboard", heading:props.name, subheading:props.admin})
        }
    }

    console.log(props.details)
    return (
        <div style={{marginTop:"3rem", marginBottom:"5.5rem"}}>
            {Object.keys(props.details).map((info, j)=>{                   
                const color = props.details[info].btnColor
                return(
                        <div key={j} className="myBox">   
                            
                            <div className="d-none d-sm-none d-md-none d-lg-block">
                            {(props.details[info].btnColor !== 'green')&&<button id="myButton" onClick={()=>{roundLeaderboard(props.details[info].btnColor, "/participanthomepage/quest/"+props.id+"/round/"+props.details[info].roundNum)}} style={{backgroundColor: changeColor[color], float:"right", marginTop:"1rem"}}> {props.details[info].btnMsg}</button>}
                            {(props.details[info].btnColor === 'green')&&<Link to={{pathname: "/participanthomepage/quest/"+props.id+"/round/"+props.details[info].roundNum}}><button id="myButton" style={{backgroundColor: changeColor[color], float:"right", marginTop:"1rem"}}> {props.details[info].btnMsg}</button></Link>}
                            </div>
                            <p  style={{fontWeight: "500",fontSize: "22px", marginBottom:"0rem", color:"#rgb(49, 49, 49)"}}>{"Round "+props.details[info].roundNum+": "+props.details[info].roundName}</p>
                            <p style={{fontWeight: "normal", fontSize: "18px", marginBottom:"0.5rem"}}>{props.details[info].roundType}</p>
                            <p className="text-muted" style={left}>{"Starts: "+props.details[info].startTime}</p>
                            <p className="text-muted d-none d-sm-none d-md-none d-lg-block" style={right}>{props.details[info].statusMsg1}</p>
                            <div>
                            <p className="text-muted" style={left}>{"Ends: "+props.details[info].endTime}</p>
                            <p className="text-muted d-none d-sm-none d-md-none d-lg-block" style={right}>{props.details[info].statusMsg2}</p>
                            </div>

                            <div className="d-lg-none d-md-block">
                                <p className="text-muted" style={right1}>{"- "+props.details[info].statusMsg1}</p>
                                <p className="text-muted" style={right2}>{"- "+props.details[info].statusMsg2}</p>
                                <div style={{textAlign:"center"}}>
                                    {(props.details[info].btnColor !== 'green')&&<button id="myButton" onClick={()=>{roundLeaderboard(props.details[info].btnColor, "/participanthomepage/quest/"+props.id+"/round/"+props.details[info].roundNum)}} style={{backgroundColor: changeColor[color], marginBottom:"0.5rem"}}> {props.details[info].btnMsg}</button>}
                                    {(props.details[info].btnColor === 'green')&&<Link to={{pathname: "/participanthomepage/quest/"+props.id+"/round/"+props.details[info].roundNum}}><button id="myButton" style={{backgroundColor: changeColor[color], marginBottom:"0.5rem"}}> {props.details[info].btnMsg}</button></Link>}
                                </div>
                            </div>

                        </div>
                )
            })}
        </div>
    )
}

export default QuestRounds

