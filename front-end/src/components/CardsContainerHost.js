import React from "react"
import Cards from "./Cards"
import { Link, useHistory } from "react-router-dom"

/* Example call
<CardsContainer tab="Home"/>
*/

// let cards = {}

const headings = {
    "live": "Live Quests",
    "upcoming": "Upcoming Quests",
    "past": "Past Quests",
    "all": "All Quests",
    "pending": "Pending Quests",
}

const CardsContainer = (props) => {

    const history = useHistory()
    const [response, setResponse] = React.useState({ "all": {} })
    const [render, setRender] = React.useState(false);

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }

    const apiCall = async () => {
        const resp = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/homepage`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                username: "HassaanAW",
                password: "hassaan123",
            }),
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

    let cards = response
    if (!render) {
        setRender(true)
        apiCall()
    }

    const toCreate = () => {
        history.push({ pathname: "/hosthomepage/createquest" })
    }

    return (
        <div>
            <button className="blueButton1" onClick={() => { toCreate() }}>New Quest<span className="material-icons" style={{ fontSize: "20pt", color: "#FFFFFF", float: "right" }}>add</span></button>
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

                {cards[props.tab].length > 0 &&
                    <div>
                        {
                            Object.keys(cards[props.tab]).map((cardList, j) => {
                                return (
                                    <div key={j} className="row" style={{ padding: '1.5rem' }}>
                                        {Object.keys(cards[props.tab][cardList]).map((card, k) => {
                                            return (
                                                <div key={k} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                                    {/* {console.log(cards[key][cardList][card].hostUser)} */}
                                                    {
                                                        props.tab !== "pending" ?
                                                            <Link to={{ pathname: "/hosthomepage/quest/" + cards[props.tab][cardList][card].questID }}><Cards
                                                                imgUrl={cards[props.tab][cardList][card].logoURL}
                                                                title={cards[props.tab][cardList][card].questName}
                                                                host={cards[props.tab][cardList][card].hostUser}
                                                                description={cards[props.tab][cardList][card].description}
                                                                date={cards[props.tab][cardList][card].startDate}
                                                                starsCount={cards[props.tab][cardList][card].rating}
                                                            />
                                                            </Link>
                                                            :
                                                            <Cards
                                                                imgUrl={cards[props.tab][cardList][card].logoURL}
                                                                title={cards[props.tab][cardList][card].questName}
                                                                host={cards[props.tab][cardList][card].hostUser}
                                                                description={cards[props.tab][cardList][card].description}
                                                                date={cards[props.tab][cardList][card].startDate}
                                                                starsCount={cards[props.tab][cardList][card].rating}
                                                            />
                                                    }
                                                </div>
                                            )
                                        })}

                                    </div>

                                )
                            })
                        }
                    </div>}

                {cards[props.tab].length === 0 &&
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

export default CardsContainer
