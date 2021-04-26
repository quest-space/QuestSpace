import React from "react";
import { useParams } from "react-router-dom"


const HostParticipantList = (props) => {

    const { questID } = useParams()
    const [name, setname] = React.useState("")

    const removeParticipant = async (uname) => {
      const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/removeparticipant`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            "participant_username": uname,
        }),
      })
      console.log(uname)
      const responseBody = await response.json()
      console.log('response', responseBody)

      if (response.status !== 200) {
          console.log(`Error fetching.`)
          alert(responseBody.error)
      } else {
          console.log(`Successful fetching.`)
          props.setRender(true)
      }
    } 

    const addParticipant = async (uname) => {
      const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/quest/${questID}/addparticipant`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            "participant_username": uname,
        }),
      })
      const responseBody = await response.json()
      console.log('response', responseBody)
      

      if (response.status !== 200) {
          console.log(`Error fetching.`)
          alert(responseBody.error)
      } else {
          console.log(`Successful fetching.`)
          props.setRender(true)
      }
    } 

    const setName = (ev) => {
      setname(ev.target.value)
    }

    return(
        <div style={{marginTop:"3rem"}}>
            
              {
                props.response.editable && <div className="slimBox d-none d-sm-none d-md-none d-lg-block" style={{fontSize:"20px", paddingTop:"1rem", paddingBottom:"1rem"}}> 
                  <input
                      required
                      type="text"
                      className="inputdetail responsive"
                      style={{ fontSize: "16px", paddingTop: "0.5rem", display: "inline-block" }}
                      placeholder="Participant Username"
                      onChange={setName}
                  />
                  <button className="simpleButton1" onClick={() =>{addParticipant(name)}}>Add <span className="material-icons" style={{ fontSize: "24px", color: "#46B7A1",lineHeight: "29px", float:"right" }}>add</span> </button>
                </div>
              }
              {props.response.participants !== null && <div>
              
              <div style={{ marginBottom: "5.5rem" }}>

              <div className="d-none d-sm-none d-md-none d-lg-block">
                  <div className="slimBox" style={{ fontSize: "20px", marginTop: "0.4rem", fontWeight: "500" }}>
                      <div style={{ display: "inline" }}>
                          #
                      </div>
                      <div style={{ display: "inline", marginLeft: "6rem" }}>
                          Username
                      </div>
                      <div style={{ display: "inline", marginLeft: "7.2rem" }}>
                          Name
                      </div>
                  </div>

                  {Object.keys(props.response.participants).map((info, j) => {

                      return (
                          <div className="slimBox" key={j}>
                            <div style={{ display: "inline-block", width: "4rem" }}>
                                  {1+j}
                              </div>
                              <div style={{ display: "inline-block", marginLeft: "2.9rem", width: "11rem" }}>
                                  {props.response.participants[info].username}
                              </div>
                              <div style={{ display: "inline", marginLeft: "1.7rem" }}>
                                  {props.response.participants[info].name}
                              </div>
                              {props.response.editable == true && <button className="cross1" onClick={() => { removeParticipant(props.response.participants[info].username) }}> <span className="material-icons" style={{ fontSize: "28px", color: "#EB5757", float:"right" }}> close </span> </button>}
                          </div>
                      )

                  })}
              </div>

              <div className="d-lg-none">

                  {   
                    props.response.editable && <div className="slimBox" style={{fontSize:"20px", paddingTop:"1rem", paddingBottom:"1rem"}}> 
                    <input
                        required
                        type="text"
                        className="inputdetail responsive"
                        style={{ fontSize: "16px", paddingTop: "0.5rem", display: "inline-block" }}
                        placeholder="Participant Username"
                        onChange={setName}
                    />
                    <button className="simpleButton11" onClick={() =>{addParticipant(name)}}>Add <span className="material-icons" style={{ fontSize: "24px", color: "#46B7A1",lineHeight: "29px", float:"right" }}>add</span> </button>
                    </div>
                  }
                  <div className="slimBox" style={{ fontSize: "20px", marginTop: "0.4rem", fontWeight: "500" }}>
                      <div style={{ display: "inline" }}>
                          Username
                      </div>
                  </div>
                  

                  {Object.keys(props.response.participants).map((info, j) => {
                      return (
                          <div className="slimBox" key={j}>
                              <div style={{ display: "inline-block" }}>
                                  {props.response.participants[info].name}
                              </div>
                              {props.response.editable == true && <button className="cross1" onClick={() => { removeParticipant(props.response.participants[info].username) }}> <span className="material-icons" style={{ fontSize: "28px", color: "#EB5757", float:"right" }}> close </span> </button>}

                          </div>
                      )

                  })}
              </div>
              </div>
            </div>
            }

            {
                props.response.participants === null &&
                <div style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)",
                    marginBottom: "5.5rem",
                    marginTop: "0.3rem",
                    marginLeft: "9%",
                    marginRight: "9%",
                    padding: "2rem"
                }}>
                    <i class="fas fa-exclamation-circle"></i> No Participants found!
                </div>
            }

        </div>
    )

}

export default HostParticipantList