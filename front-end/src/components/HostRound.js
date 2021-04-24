import React from "react"
import { useParams, useHistory } from "react-router-dom"
import MainNavbar from "./MainNavbar"
import PageFooter from "./PageFooter"
import Header from "./Header"
import BreadCrumb from "./BreadCrumb"
import Tabs from "./Tabs"
import HostRoundDetails from "./HostRoundDetails"
import HostRapidFire from "./HostRapidFire"
import "../css/HostRound.css"

const HostRound = () => {

    const { roundID, questID } = useParams()
    const history = useHistory()

    const [tab, setTab] = React.useState("Round Details");
    const [roundFetched, setRoundFetched] = React.useState(false)
    const [roundInfo, setroundInfo] = React.useState({})
    // const [questions, setQuestions] = React.useState([])

    const fetchRoundDetails = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/quest/${questID}/${roundID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in fetching round information.`)
            alert(JSON.stringify(responseBody), "Returning back to quest page")
            // history.replace(`/hosthomepage/quest/${questID}`) uncomment this later
        } else {
            setroundInfo(responseBody)
        }
    }

    if (!roundFetched) {
        setRoundFetched(true)
        fetchRoundDetails()
        console.log(`Round details fetched.`)
    }

    return (
        <React.Fragment>
            <MainNavbar />
            <Header heading={`Round ${roundID}: ${roundInfo.rounds && roundInfo.rounds.roundName}`} subheading={roundInfo.rounds && roundInfo.rounds.roundType} />
            <BreadCrumb items={[{ text: "Home", to: "/participanthomepage" }, { text: roundInfo.rounds && roundInfo.rounds.questName, to: `/participanthomepage/quest/${questID}` }, { text: `Round ${roundID}`, to: `/participanthomepage/quest/${questID}/round/${roundID}` }]} />

            {/* Tabs*/}
            <Tabs setTab={setTab} roundType={roundInfo.rounds && roundInfo.rounds.roundType} />

            {/* View Round Details */}
            {tab === `Round Details` && <HostRoundDetails roundDetails={roundInfo.rounds} left="3rem" right="3rem" top="3rem" />}

            {/* View Questions in case of rapid fire round*/}
            {/* <div className="mainBox"> */}
            {tab === `Questions` && (roundInfo.rounds && roundInfo.rounds.roundType === `Rapid Fire`) && <HostRapidFire roundInfo={roundInfo} setroundInfo={setroundInfo} />}
            {/* </div> */}

            <PageFooter />
        </React.Fragment>
    )
}


export default HostRound