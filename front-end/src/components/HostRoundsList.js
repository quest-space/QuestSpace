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
    }

    const descrip = (ev) => {
        setDescription(ev.target.value)
    }

    const goToRound = (num) => {
        history.push({ pathname: `/hosthomepage/quest/${questID}/round/${num}` })
    }

    const addQuest = async () => {    
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/quest/${questID}/addround`, {
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

        console.log({
            "roundName": name,
            "startTime": startTime,
            "endTime": endTime,
            "roundType": type,
            "timer": lim,
            "description": description,
            "eachMarks": 1,
        })

        const responseBody = await response.json()
        console.log('response', responseBody)

        if (response.status !== 200) {
            console.log(`Error fetching.`)
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

                        {props.response.editable == true && <button className="cross1" onClick={() => { deleteQuest(props.response.rounds[info].roundNum) }}> <span className="material-icons" style={{ fontSize: "28px", color: "#EB5757" }}> close </span> </button>}
                        <div onClick={() => { goToRound(props.response.rounds[info].roundNum) }}>
                            <p style={{ fontWeight: "500", fontSize: "22px", marginBottom: "0rem", display: "inline-block", color: "rgb(49, 49, 49)" }}>{"Round " + props.response.rounds[info].roundNum + ": " + props.response.rounds[info].roundName}</p>
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
                    <button className="tick1" onClick={() => { addQuest() }}> <span className="material-icons" style={{ fontSize: "28px", color: "#238839" }}> done </span></button>
                    <button className="cross1" onClick={() => { setDisplayForm(false) }}> <span className="material-icons" style={{ fontSize: "28px", color: "#EB5757" }}> close </span> </button>

                    <p style={{ fontWeight: "600", fontSize: "22px", marginBottom: "0rem", display: "inline-block" }}>Add Round</p>
                    <tr>
                        <th style={{ display: "block" }}>
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
                                    required
                                    type="text"
                                    className="inputdetail responsive"
                                    style={{ fontSize: "18px", paddingTop: "0.5rem", display: "block" }}
                                    placeholder="Enter here"
                                    onChange={setName}
                                />
                            </p>
                        </th>

                    </tr>
                    <tr className="container responsive">
                        <th>
                            <p
                                className="display-4"
                                style={{
                                    paddingTop: "0.5rem",
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    color: "#46B7A1",
                                    marginLeft: "0rem",
                                }}
                            >
                                Start
                                <input
                                    required
                                    type="text"
                                    className="inputdetail responsive"
                                    style={{ fontSize: "18px", paddingTop: "0.5rem", display: "block" }}
                                    type="datetime-local"
                                    placeholder="1"
                                    onfocus="this.type='datetime-local'"
                                    onblur="if(this.value==='')this.type='text'"
                                    onChange={startDate}
                                />

                            </p>
                        </th>
                        <th>
                            <p
                                className="display-4"
                                style={{
                                    paddingTop: "0.5rem",
                                    paddingLeft: "3rem",
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    color: "#46B7A1",
                                    marginLeft: "0rem",
                                }}
                            >
                                End
                                <input
                                    required
                                    type="text"
                                    className="inputdetail responsive"
                                    style={{ fontSize: "18px", paddingTop: "0.5rem", display: "block" }}
                                    type="datetime-local"
                                    placeholder="1"
                                    onfocus="this.type='datetime-local'"
                                    onblur="if(this.value==='')this.type='text'"
                                    onChange={endDate}
                                />

                            </p>
                        </th>

                        <th>
                            <div className="form-group form-inline" style={{ fontWeight: "600", fontSize: "22px", marginBottom: "0rem", display: "block" }}>
                                <p
                                    className="display-4"
                                    style={{
                                        paddingTop: "0.5rem",
                                        paddingLeft: "3rem",
                                        marginBottom: "0rem",
                                        fontWeight: "400",
                                        fontSize: "18px",
                                        color: "#46B7A1",
                                        marginLeft: "0rem",
                                    }}
                                >
                                    Type
                                </p>
                                <select onChange={setType} className="form-control" style={{ marginLeft: "3rem" }} id="sel1">
                                    <option>Quiz</option>
                                    <option>Rapid Fire</option>
                                    <option>Submission</option>
                                </select>
                            </div>
                        </th>

                        {timeForm === true && <th>
                            <p
                                className="display-4"
                                style={{
                                    paddingLeft: "3rem",
                                    fontWeight: "400",
                                    fontSize: "18px",
                                    color: "#46B7A1",
                                    marginLeft: "0rem",
                                }}
                            >
                                Time Limit
                                <input
                                    required
                                    type="text"
                                    className="inputdetail responsive"
                                    style={{ fontSize: "18px", paddingTop: "0.5rem", display: "block" }}
                                    placeholder="Enter here"
                                    onChange={timeLimit}
                                />

                            </p>
                        </th>}

                    </tr>

                    <p
                        className="display-4"
                        style={{
                            paddingTop: "0.5rem",
                            fontWeight: "400",
                            fontSize: "18px",
                            color: "#46B7A1",
                            marginLeft: "0rem",
                        }}
                    >
                        Description
                        <input
                            required
                            type="text"
                            className="longinputdetail"
                            placeholder="Enter a description of your Round"
                            onChange={descrip}
                            style={{ fontSize: "18px", paddingTop: "0.5rem", display: "block", width: "95%" }}
                        />
                    </p>
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
                        <i className="fas fa-exclamation-circle"></i> No Rounds Added!
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
                        <i className="fas fa-exclamation-circle"></i> No Rounds Added!
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