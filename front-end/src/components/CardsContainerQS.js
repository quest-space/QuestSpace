import React from "react"
import Cards from "./Cards"
import { Link, useHistory } from "react-router-dom"

/* Example call
<CardsContainer tab="Home"/>
*/

const headings = {
    "Pending": "Pending Quests",
    "Accepted": "Accepted Quests",
    "Rejected": "Rejected Quests",
    "All": "All Quests",
}

const CardsContainerQS = (props) => {

    const history = useHistory()
    const [response, setResponse] = React.useState({ "all": {} })
    const [render, setRender] = React.useState(false);

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }

    const apiCall = async () => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest//qs-admin/homepage`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            // body: JSON.stringify({
            //     username: "HassaanAW",
            //     password: "hassaan123",
            // }),
        })
        const responseBody = await resp.json()
        setResponse(responseBody)
        console.log(responseBody)

        if (resp.status !== 200) {
            console.log(`Error. Couldn't fetch data.`)
            showError(responseBody.errors)
        } else {
            console.log(`Fetch data successful`)

        }
    }

    if (!render) {
        setRender(true)
        apiCall()
    }

    let full = []
    let empty = []
    for (let i = 0; i < parseInt(props.rating); i++) {
    full.push(1)
    }
    for (let i = 0; i < 5 - parseInt(props.rating); i++) {
    empty.push(0)
    } 

    return (
        <div>
            {/* <button className="blueButton1" onClick={() => { toCreate() }}>New Quest<span className="material-icons" style={{ fontSize: "20pt", color: "#FFFFFF", float: "right" }}>add</span></button> */}
            <div className="container" id="cc" style={{ marginTop: '0rem', paddingBottom: "5.5rem" }}>
                <div style={{
                    paddingLeft: '1.5rem',
                    paddingTop: '5.5rem',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '32px'
                }}>
                    {headings[props.tab]}
                </div>

                {response[props.tab].length > 0 &&
                    <div>
                        {

                            Object.keys(response[props.tab]).map((info, j)=>{                   
                                // const color = props.details[info].btnColor
                                return(
                                    <div style={{marginLeft:"9%", marginRight:"9%"}}>
                                    <div className="card mb-9" style={{maxWidth: "100%", margin:"auto"}}>
                                    <div className="row no-gutters">
                                      <div className="col-md-2">
                                        <img src={props.logoURL} className="card-img" alt="..."/>
                                      </div>
                                      <div className="col-md-8">
                                        <div className="card-body">
                                          <h5 className="card-title">{props.questName}</h5>
                                          {/* <h6 className="card-title text-muted"><i className="fas fa-calendar-alt"></i>{(new Date(props.startTime)).toDateString()} - {(new Date(props.endTime)).toDateString()}</h6> */}
                                          <h6 className="card-title text-muted" style={{marginBottom:"0rem"}}><i className="fas fa-calendar-alt" style={{marginRight:"0.5rem"}}></i>12 June - 13 May</h6>
                                          <h6 className="card-title text-muted" style={{marginBottom:"0rem", display:"inline"}}>{"Host: " + props.hostUser}</h6>
                                          {
                                            full.map((a,index) => {
                                              return(
                                                  <i key={index} className="fa fa-star"></i>
                                              )
                                            })
                                          }
                            
                                          {
                                            empty.map((a,index) => {
                                              return(
                                                  <i key={index} className="far fa-star"></i>
                                              )
                                            })
                                          }
                                          <h6 className="card-title text-muted" style={{marginBottom:"0rem", display:"inline"}}>{" | Quest Type: " + props.nature}</h6>
                            
                                          <p className="card-text">{props.description}</p>
                                          {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  </div>
                                )
                            })
                        }
                    </div>}

                {response[props.tab].length === 0 &&
                    <div style={{
                        border: "1px solid #C4C4C4",
                        boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)",
                        // marginBottom:"5.5rem",
                        margin: "1.5rem",
                        padding: "2rem"
                    }}>
                        <i className="fas fa-exclamation-circle"></i> Not Available
                    </div>
                }

            </div>

        </div>

    )

}

export default CardsContainerQS
