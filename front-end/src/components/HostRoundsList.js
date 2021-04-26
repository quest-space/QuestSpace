import React from "react";
import { useHistory, useParams } from "react-router-dom"

const HostRoundsList = (props) => {

    const { questID } = useParams()
    const history = useHistory()

    const [displayForm, setDisplayForm] = React.useState(false)
    const [timeForm, setTimeForm] = React.useState(false)
    const [name, setname] = React.useState("")
    const [startTime, setstartTime] = React.useState("")
    const [endTime, setendTime] = React.useState("")
    const [type, settype] = React.useState("Quiz")
    const [lim, setlim] = React.useState(30)
    const [description, setDescription] = React.useState("")

    const [errorStart, seterrorStart] = React.useState("none")
    const [errorEnd, seterrorEnd] = React.useState("none")
    const [errorMsg, seterrorMsg] = React.useState("")
    const [errorTimer, seterrorTimer] = React.useState("none")


    const setName = (ev) => {
        setname(ev.target.value)
    }

    const endDate = (ev) => {
        setendTime(ev.target.value)
    }

    const startDate = (ev) => {
        setstartTime(ev.target.value)
    }

    const setType = (ev) => {
        settype(ev.target.value)
        if (ev.target.value === "Rapid Fire") {
            setTimeForm(true)
        }
        else {
            setTimeForm(false)
        }
    }

    const timeLimit = (ev) => {
        setlim(ev.target.value)
        if(ev.target.value < "30" || ev.target.value > "300"){
            seterrorTimer("block")
        }
    }

    const descrip = (ev) => {
        setDescription(ev.target.value)
    }

    const goToRound = (num) => {
        history.push({ pathname: `/hosthomepage/quest/${questID}/round/${num}` })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    

    const addQuest = async () => {  
        
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/addround`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                "roundName": name,
                "startTime": startTime,
                "endTime": endTime,
                "roundType": type,
                "timer": lim,
                "description": description,
                "eachMarks": 1,
            }),

        })

        const responseBody = await response.json()
        console.log('response', responseBody)
        seterrorStart("none")  
        seterrorEnd("none")  
        seterrorTimer("none")

        if(responseBody.error == "Round must start after Quest begins" || responseBody.error == "Round must begin before Quest ends"){
            seterrorStart("block")
            seterrorMsg(responseBody.error)
        }
        else if(responseBody.error == "Round must end before Quest ends" || responseBody.error == "Start time should be earlier than End time"){
            seterrorEnd("block")
            seterrorMsg(responseBody.error)
        }

        if (response.status !== 200) {
            console.log(`Error fetching.`)
            // alert(responseBody.error)
        } else {
            console.log(`Successful fetching.`)
            setDisplayForm(false)
            setTimeForm(false)
            props.setRender(true)
        }

    }

    const deleteQuest = async (num) => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/${num}/deleteround`, {
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
        console.log('response', responseBody)

        if (response.status !== 200) {
            console.log(`Error fetching.`)
        } else {
            console.log(`Successful fetching.`)
            props.setRender(true)
        }

    }

    const left = {
        fontWeight: "normal",
        fontSize: "14px",
        marginBottom: "0rem",
        display: "inline-block",
    }

    return (
        <div style={{ marginTop: "3rem", marginBottom: "5.5rem" }}>
            {props.response.rounds !== null && Object.keys(props.response.rounds).map((info, j) => {
                const color = props.response.rounds[info].btnColor
                return (
                    <div key={j} className="myBox c" style={{ paddingRight: "0rem", borderRadius: "0rem" }}>

                        {props.response.editable == true && <button className="cross1" onClick={() => { deleteQuest(props.response.rounds[info].roundNum) }}> <span className="material-icons" style={{ fontSize: "22px" }}> close </span> </button>}
                        <div onClick={() => { goToRound(props.response.rounds[info].roundNum) }}>
                            <p style={{ fontWeight: "500", fontSize: "22px", marginBottom: "0rem", display: "inline-block", color: "#rgb(108, 108, 108)" }}>{"Round " + props.response.rounds[info].roundNum + ": " + props.response.rounds[info].roundName}</p>
                            <p style={{ fontWeight: "normal", fontSize: "18px", marginBottom: "0.5rem" }}>{props.response.rounds[info].roundType}</p>
                            <p className="text-muted" style={left}>{"Starts: " + props.response.rounds[info].startTime}</p>
                            <div>
                                <p className="text-muted" style={left}>{"Ends: " + props.response.rounds[info].endTime}</p>
                            </div>
                        </div>
                    </div>
                )
            })}

            {
                displayForm === true && <div className="myBox" style={{ paddingRight: "0rem" }}>
                    <form onSubmit={handleSubmit}>
                    <button className="cross1" onClick={() => { setDisplayForm(false) }}> <span className="material-icons" style={{ fontSize: "22px" }}> close </span></button>
                    <button className="tick1" onClick={() => { addQuest() }}> <span className="material-icons" style={{ fontSize: "22px" }}> done </span></button>

                    <p style={{ fontWeight: "500", fontSize: "22px", marginBottom: "0rem", display: "inline-block" }}>Add Round</p>
                    
                            <p
                                className="display-4"
                                style={{
                                    paddingTop: "1rem",
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    color: "#46B7A1",
                                    marginLeft: "0rem",
                                    wordWrap: "break-word",
                                    marginBottom:"0.2rem"
                                }}
                            >
                                Name<span style={{color:"#F70000"}}>*</span></p>
                                <input
                                    type="text"
                                    className="inputdetail "
                                    style={{ fontSize: "18px", paddingTop: "0rem", display: "block" }}
                                    placeholder="Enter here"
                                    onChange={setName}
                                    required
                                />
                            

                   
                            <p
                                className="display-4"
                                style={{
                                    paddingTop: "1rem",
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    color: "#46B7A1",
                                    marginLeft: "0rem",
                                    marginBottom:"0rem"
                                }}
                            >
                                Start<span style={{color:"#F70000"}}>*</span></p>
                                <input
                                    type="text"
                                    className="inputdetail "
                                    style={{ fontSize: "18px", paddingTop: "0rem", display: "block" }}
                                    type="datetime-local"
                                    placeholder="1"
                                    onfocus="this.type='datetime-local'"
                                    onblur="if(this.value==='')this.type='text'"
                                    onChange={startDate}
                                    required
                                />
                                <div style={{color:"#F70000", display:errorStart}}>
                                <i className="fas fa-exclamation-circle"></i>
                                &nbsp; <span>{errorMsg}</span>
                                </div>
                            <p
                                className="display-4"
                                style={{
                                    paddingTop: "1rem",
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    color: "#46B7A1",
                                    marginLeft: "0rem",
                                    marginBottom:"0rem"
                                }}
                            >
                                End <span style={{color:"#F70000"}}>*</span></p>
                                <input
                                    type="text"
                                    className="inputdetail "
                                    style={{ fontSize: "18px", paddingTop: "0rem", display: "block" }}
                                    type="datetime-local"
                                    placeholder="1"
                                    onfocus="this.type='datetime-local'"
                                    onblur="if(this.value==='')this.type='text'"
                                    onChange={endDate}
                                    required
                                />
                                <div style={{color:"#F70000", display:errorEnd}}>
                                <i className="fas fa-exclamation-circle"></i>
                                &nbsp; <span>{errorMsg}</span>
                                </div>
                                
                                <p
                                    className="display-4"
                                    style={{
                                        paddingTop: "1rem",
                                        marginBottom: "0.2rem",
                                        fontWeight: "400",
                                        fontSize: "18px",
                                        color: "#46B7A1",
                                        marginLeft: "0rem"
                                    }}
                                >
                                    Type<span style={{color:"#F70000"}}>*</span>
                                </p>
                                <select onChange={setType} className="form-control" style={{ width:"30%" }} id="sel1">
                                    <option>Quiz</option>
                                    <option>Rapid Fire</option>
                                    <option>Submission</option>
                                </select>
                        
                      
                        {timeForm === true && <div>
                            <p
                                className="display-4"
                                style={{
                                    paddingTop: "1rem",
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    color: "#46B7A1",
                                    marginLeft: "0rem",
                                    marginBottom:"0.2rem"
                                }}
                            >
                                Time Limit<span style={{color:"#F70000"}}>*</span></p>
                                <input
                                    type="text"
                                    className="inputdetail "
                                    style={{ fontSize: "18px", paddingTop: "0rem", display: "block" }}
                                    placeholder="Enter here"
                                    onChange={timeLimit}
                                    required
                                />
                                <div style={{color:"#F70000", display:errorTimer}}>
                                <i className="fas fa-exclamation-circle"></i>
                                &nbsp; <span>Time limit must lie in the range of 30 - 300 seconds</span>
                                </div>
                            
                        </div>}


                    <p
                        className="display-4"
                        style={{
                            paddingTop: "1rem",
                            fontWeight: "400",
                            fontSize: "18px",
                            color: "#46B7A1",
                            marginLeft: "0rem",
                            marginBottom:"0.2rem"
                        }}
                    >
                        Description  <span style={{color:"#F70000"}}>*</span></p>
                        <input
                            type="text"
                            className="longinputdetail"
                            placeholder="Enter a description of your Round"
                            style={{ fontSize: "18px", paddingTop: "0rem", display: "block", width: "95%" }}
                            onChange={descrip}
                            required
                        />
                
                    </form>
                </div>
               
            }
            {
                props.response.rounds === null && props.response.editable &&
                <div>
                    <div style={{
                        border: "1px solid #C4C4C4", 
                        boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", 
                        // marginBottom: "5.5rem",
                        marginTop: "3rem",
                        marginLeft:"9%",
                        marginRight:"9%",
                        padding:"2rem"}}>
                        <i className="fas fa-exclamation-circle"></i>&nbsp; No Rounds Added!
                    </div>
                    {/* {props.setRender(true)} */}
                </div>
            }
            {
                props.response.rounds === null && props.response.editable == false &&
                <div>
                    <div style={{
                        border: "1px solid #C4C4C4", 
                        boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)", 
                        marginBottom: "5.5rem",
                        marginTop: "3rem",
                        marginLeft:"9%",
                        marginRight:"9%",
                        padding:"2rem"}}>
                        <i className="fas fa-exclamation-circle"></i>&nbsp; No Rounds Added!
                    </div>
                    {/* {props.setRender(true)} */}
                </div>
            }
            {
                props.response.editable == true &&
                <div className="myBox dashedBox1">
                    <button style={{ width: "100%", backgroundColor: "#FFFFFF", border: "none" }} onClick={() => { setDisplayForm(true) }}><span className="material-icons" style={{ fontSize: "20pt", color: "rgb(108, 108, 108)" }}>add</span> </button>
                </div>
            }
            

        </div>
    )

}

export default HostRoundsList