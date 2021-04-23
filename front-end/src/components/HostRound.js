import React from "react"
import { useParams, useHistory } from "react-router-dom"
import MainNavbar from "./MainNavbar"
import PageFooter from "./PageFooter"
import Header from "./Header"
import BreadCrumb from "./BreadCrumb"
import Tabs from "./Tabs"

const HostRound = () => {

    const { roundID, questID } = useParams()
    const history = useHistory()

    const [tab, setTab] = React.useState("Details");
    const [roundFetched, setRoundFetched] = React.useState(false)
    const [roundDetails, setRoundDetails] = React.useState({})

    const fetchRoundDetails = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/quest/${questID}/${roundID}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
        })

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in fetching roundDetails.`)
            alert(JSON.stringify(responseBody), "Returning back to quest page")
            // history.replace(`/hosthomepage/quest/${questID}`)
        } else {
            responseBody["roundType"] = `Submission`
            setRoundDetails(responseBody)
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
            <Header heading={`Round ${roundID}: ${roundDetails.roundName}`} subheading={roundDetails.roundType} />
            <BreadCrumb items={[{ text: "Home", to: "/participanthomepage" }, { text: roundDetails.questName, to: `/participanthomepage/quest/${questID}` }, { text: `Round ${roundID}`, to: `/participanthomepage/quest/${questID}/round/${roundID}` }]} />

            {tab} {roundDetails.roundType}

            <Tabs setTab={setTab} roundType={roundDetails.roundType} />

            <PageFooter />
        </React.Fragment>
    )
}


export default HostRound