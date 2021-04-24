import React from "react";
import Leaderboard from "./Leaderboard"


const HostParticipantList = (props) => {

    return(
        <div>
            <div className="slimBox" style={{fontSize:"20px", marginTop: "3rem", paddingTop:"1rem", paddingBottom:"1rem"}}> 
            <div style={{display:"inline"}}>
              {"My Rank: " }
            </div>
            <div style={{ float:"right"}}>
              {"My Score: " }
            </div>
            </div>
            <Leaderboard board = {props.response.leaderboard.full}/>
        </div>
    )

}

export default HostParticipantList