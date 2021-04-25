import React from "react"
import Cards from "./Cards"
import { Link, useHistory } from "react-router-dom"

/* Example call
<CardsContainer tab="Home"/>
*/

const headings = {
    "pending": "Pending Quests",
    "accepted": "Accepted Quests",
    "rejected": "Rejected Quests",
    "all": "All Quests",
}

const CardsContainerQS = (props) => {

    const [response, setResponse] = React.useState({ "pending": {} })
    const [render, setRender] = React.useState(false);

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }

    const fetchCards = async () => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/qs-admin/homepage`, {
        method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })
        const responseBody = await resp.json()
        setResponse(responseBody)

        if (resp.status !== 200) {
            console.log(`Error. Couldn't fetch data.`)
            showError(responseBody.errors)
        } else {
            console.log(`Fetch data successful`)

        }
    }

    const accept = async (qname) => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest//qs-admin/accept`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                'questName' : qname
            },
            credentials: "include",
        })
        const responseBody = await resp.json()
        console.log(responseBody)

        if (resp.status !== 200) {
            console.log(`Couldn't accept`)
        } else {
            console.log(`Successful`)

        }
    }

    const reject = async (qname) => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest//qs-admin/reject`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                'questName' : qname
            },
            credentials: "include",
        })
        const responseBody = await resp.json()
        console.log(responseBody)

        if (resp.status !== 200) {
            console.log(`Couldn't reject`)
        } else {
            console.log(`Successful`)

        }
    }

    console.log(response)
    if (!render) {
        setRender(true)
        fetchCards()
    }
    
    return (
        <div>
            <div style={{ marginLeft:"9%", marginRight:"9%", paddingBottom: "5.5rem" }}>
                <div style={{
                    paddingBottom: '1.5rem',
                    paddingTop: '3.5rem',
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
                                
                                let full = []
                                let empty = []
                                for (let i = 0; i < parseInt(response[props.tab][info].rating); i++) {
                                full.push(1)
                                }
                                for (let i = 0; i < 5 - parseInt(response[props.tab][info].rating); i++) {
                                empty.push(0)
                                } 

                                return(
                                    <div key = {j} style={{ marginBottom:"1rem"}}>
                                    <div className="card mb-9">
                                    <div className="row no-gutters">
                                      <div className="col-md-2">
                                        <img src={response[props.tab][info].logoURL} style={{objectFit:"cover", height:"160px"}} className="card-img" alt="..."/>
                                      </div>
                                      <div className="col-md-8">
                                        <div className="card-body">
                                          <h5 className="card-title">{response[props.tab][info].questName}</h5>
                                          <h6 className="card-title text-muted" style={{marginBottom:"0rem"}}><i className="fas fa-calendar-alt" style={{marginRight:"0.5rem"}}></i>{(new Date(response[props.tab][info].startTime)).toDateString()} - {(new Date(response[props.tab][info].endTime)).toDateString()}</h6>
                                          {/* <h6 className="card-title text-muted" style={{marginBottom:"0rem"}}><i className="fas fa-calendar-alt" style={{marginRight:"0.5rem"}}></i>12 June - 13 May</h6> */}
                                          <h6 className="card-title text-muted" style={{marginBottom:"0rem", display:"inline"}}>{"Host: " + response[props.tab][info].hostUser}&nbsp;&nbsp;</h6>
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
                                          <h6 className="card-title text-muted" style={{marginBottom:"0rem", display:"inline"}}>&nbsp;&nbsp;|&nbsp;&nbsp;{"Quest Type: " + response[props.tab][info].nature}</h6>
                            
                                          <p className="card-text" style={{marginTop:"0.3rem"}}>{response[props.tab][info].description}</p>
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
                        // margin: "1.5rem",
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
