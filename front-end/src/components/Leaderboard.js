import React from "react";



const Leaderboard = (props) => {

    return(

        <div style={{marginBottom: "5.5rem"}}>

            <div className="slimBox" style={{fontSize:"20px", marginTop: "0.4rem", fontWeight:"500"}}>
                <div style={{display:"inline"}}>
                    Rank
                </div>
                <div style={{display:"inline", marginLeft:"6rem"}}>
                    Username
                </div>
                <div style={{display:"inline", marginLeft:"6rem"}}>
                    Name
                </div>
                <div style={{display:"inline", float:"right"}}>
                    Score
                </div>
            </div>

            {Object.keys(props.board).map((info, j)=>{ 

                return(
                    <div className="slimBox" >
                        <div style={{display:"inline-block", width:"4rem"}}>
                            {props.board[info].ranking}
                        </div>
                        <div style={{display:"inline-block", marginLeft:"4.8rem",width:"11rem"}}>
                            {props.board[info].username}
                        </div>
                        <div style={{display:"inline", marginLeft:"0.5rem"}}>
                            {props.board[info].name}
                        </div>
                        <div style={{display:"inline", float:"right"}}>
                            {props.board[info].roundScore}
                        </div>
                    </div>
                )
                
            })}

        </div>
    )



}

export default Leaderboard;