import React from "react"
import { useParams, useHistory } from "react-router-dom"
import MainNavbar from "./MainNavbar"
import PageFooter from "./PageFooter"
import Header from "./Header"
import BreadCrumb from "./BreadCrumb"
import Tabs from "./Tabs"

const HostRound = () => {

    const { roundID, questID } = useParams()

    const [tab, setTab] = React.useState("Details");

    



    return (
        <React.Fragment>
            <MainNavbar />
            <Header />
            {/* <BreadCrumb items={[{ text: "Home", to: "/participanthomepage" }, { text: roundDetails.questName, to: `/participanthomepage/quest/${questID}` }, { text: `Round ${roundID}`, to: `/participanthomepage/quest/${questID}/round/${roundID}` }]} /> */}

            {roundID} {questID} {tab}

            <Tabs setTab={setTab} submission={true}/>

            <PageFooter />
        </React.Fragment>
    )
}


export default HostRound