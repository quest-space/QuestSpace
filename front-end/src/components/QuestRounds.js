import React from "react";




const QuestRounds = (props) => {


    return (
        <div>
            {props.rounds.map((round,i)=>{

                <div style={{border: "1px solid #C4C4C4", boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", margin:"7.5rem", marginTop:"0.2rem", paddingBottom:"3.5rem"}}>
                    {Object.keys(round).map((info, j)=>{
                        <p>{info}</p>
                    })}
                </div>

            })}
        </div>
    )
}

export default QuestRounds