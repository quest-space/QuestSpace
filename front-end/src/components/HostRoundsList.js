import React from "react";
import { useParams } from "react-router-dom"

const HostRoundsList = (props) => {

    const { questID } = useParams()

    const [displayForm, setDisplayForm] = React.useState(false)

    const addQuest = async () => {
    
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/addround`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                username: 'HassaanAW',
                password: 'hassaan123',
            }),
        })

        const responseBody = await response.json()

        if (responseBody.status !== 200) {
            console.log(`Error fetching.`)
        } else {
            console.log(`Successful fetching.`)
        }
    
    }

    const deleteQuest = async () => {
    
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/deleteround`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                username: 'HassaanAW',
                password: 'hassaan123',
            }),
        })

        const responseBody = await response.json()

        if (responseBody.status !== 200) {
            console.log(`Error fetching.`)
        } else {
            console.log(`Successful fetching.`)
        }
    
    }

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

            {
                displayForm === true && <div className="myBox" style={{paddingRight:"0rem"}}>
                    <button class="tick1"> <i class="fas fa-check"></i></button>
                    <button class="cross1" onClick={()=> {setDisplayForm(false)}}> <i class="fas fa-times"></i></button>
                    
                    <tr>
                    
                    <p  style={{fontWeight: "600",fontSize: "22px", marginBottom:"0rem", display:"inline-block"}}>Add Round</p>
                    <th style={{display:"block"}}>
                    <p
                        className="display-4"
                        style={{
                            paddingTop: "0.5rem",
                            fontWeight: "400",
                            fontSize: "18px",
                            color: "#46B7A1",
                            marginLeft: "0rem",
                            wordWrap: "break-word",
                        }}
                        >
                        Name
                            <input
                            type="text"
                            className="inputdetail responsive"
                            style={{fontSize:"18px",paddingTop: "0.5rem",display:"block"}}
                            placeholder="Enter here"
                            // onChange={(ev) => updateState(ev, setQuestName)}
                            />
                    </p>
                    </th>

                    </tr>
                    <tr class="container responsive">
                    <th>
                        <p
                            className="display-4"
                            style={{
                                paddingTop: "0.5rem",
                                fontWeight: "400",
                                fontSize: "18px",
                                color: "#46B7A1",
                                marginLeft: "0rem",
                                wordWrap: "break-word",
                            }}
                            >
                            Start
                            <input
                            type="text"
                            className="inputdetail responsive"
                            style={{fontSize:"18px",paddingTop: "0.5rem",display:"block"}}
                            placeholder="Enter here"
                            // onChange={(ev) => updateState(ev, setQuestName)}
                            />
        
                        </p>
                    </th>
                    <th>
                        <p
                            className="display-4"
                            style={{
                                paddingTop: "0.5rem",
                                paddingLeft:"3rem",
                                fontWeight: "400",
                                fontSize: "18px",
                                color: "#46B7A1",
                                marginLeft: "0rem",
                                wordWrap: "break-word",
                            }}
                            >
                            End
                            <input
                            type="text"
                            className="inputdetail responsive"
                            style={{fontSize:"18px",paddingTop: "0.5rem",display:"block"}}
                            placeholder="Enter here"
                            // onChange={(ev) => updateState(ev, setQuestName)}
                            />
        
                        </p>
                    </th>

                    <th>
                    <div class="form-group form-inline" style={{fontWeight: "600",fontSize: "22px", marginBottom:"0rem", display:"block"}}>
                    <p
                            className="display-4"
                            style={{
                                paddingTop: "0.5rem",
                                paddingLeft:"3rem",
                                marginBottom: "0rem",
                                fontWeight: "400",
                                fontSize: "18px",
                                color: "#46B7A1",
                                marginLeft: "0rem",
                                wordWrap: "break-word",
                            }}
                            >
                            Type
                    </p>
                    <select class="form-control" style={{marginLeft:"3rem"}} id="sel1">
                        <option>Rapid Fire</option>
                        <option>Quiz</option>
                        <option>Submission based</option>
                    </select>
                    </div>
                    </th>

                    </tr>
                </div>
            }

            <div className="myBox dashedBox1">
                <button style={{width: "100%", backgroundColor: "#FFFFFF", border: "none" }} onClick={()=> {setDisplayForm(true)}}><i class="fas fa-plus"></i> </button>
            </div>

        </div>
    )

}

export default HostRoundsList