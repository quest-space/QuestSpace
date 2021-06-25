import React from "react"
import { useParams, useHistory } from "react-router-dom"
import MainNavbarHost from "./MainNavbarHost"
import PageFooter from "./PageFooter"
import Header from "./Header"
import BreadCrumb from "./BreadCrumb"
import Tabs from "./Tabs"
import HostRoundDetails from "./HostRoundDetails"
import HostRapidFire from "./HostRapidFire"
import HostQuiz from "./HostQuiz"
import HostSubmission from "./HostSubmission"
import HostLeaderboardList from "./HostLeaderboardList"
import ManualGrading from "./ManualGrading"
import "../css/HostRound.css"

const HostRound = () => {

    const { roundID, questID } = useParams()
    const history = useHistory()

    const [tab, setTab] = React.useState("Round Details");
    const [roundFetched, setRoundFetched] = React.useState(false)
    const [roundInfo, setroundInfo] = React.useState({})

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
            // alert(JSON.stringify(responseBody) + " Returning back to quest page.")
            alert("Error in fetching round information. Returning back to quest page.")
            history.replace(`/hosthomepage/quest/${questID}`) //uncomment this later
        } else {
            setroundInfo(responseBody)
        }
    }

    if (!roundFetched) {
        setRoundFetched(true)
        fetchRoundDetails()
        console.log(`Round details fetched.`)
    }

	console.log(roundInfo)

    return (
        <React.Fragment>
            <MainNavbarHost />
            <Header heading={`Round ${roundID}: ${roundInfo.rounds && roundInfo.rounds.roundName}`} subheading={roundInfo.rounds && roundInfo.rounds.roundType} />
            <BreadCrumb items={[{ text: "Home", to: "/hosthomepage" }, { text: roundInfo.rounds && roundInfo.rounds.questName, to: `/hosthomepage/quest/${questID}` }, { text: `Round ${roundID}`, to: `/hosthomepage/quest/${questID}/round/${roundID}` }]} />

            {/* Tabs*/}
            <Tabs setTab={setTab} roundType={roundInfo.rounds && roundInfo.rounds.roundType} />

            {/* View Round Details */}
            {tab === `Round Details` && <HostRoundDetails roundDetails={roundInfo.rounds} left="3rem" right="3rem" top="3rem" />}

            {/* View Questions in case of rapid fire round*/}
            {/* <div className="mainBox"> */}
            {tab === `Questions` && (roundInfo.rounds && roundInfo.rounds.roundType === `Rapid Fire`) && <HostRapidFire roundInfo={roundInfo} setroundInfo={setroundInfo} />}
            {/* </div> */}

            {/* View Questions in case of quiz round */}
            {tab === `Questions` && (roundInfo.rounds && roundInfo.rounds.roundType === `Quiz`) && <HostQuiz roundInfo={roundInfo} setroundInfo={setroundInfo} />}

            {/* View Questions in case of submission round */}
            {tab === `Questions` && (roundInfo.rounds && roundInfo.rounds.roundType === `Submission`) && <HostSubmission roundInfo={roundInfo} setroundInfo={setroundInfo} />}

            {/* Manual Grading in case of submission based round */}
            {tab === `Submissions` && <ManualGrading roundInfo={roundInfo} setroundInfo={setroundInfo} />}

            {/* Leaderboard */}
            {tab === `Leaderboard` && <HostLeaderboardList response={roundInfo} />}

            <PageFooter />
        </React.Fragment>
    )
}


export default HostRound
