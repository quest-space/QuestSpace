import React from "react"
import MainNavbarHost from "./MainNavbarHost"
import PageFooter from "./PageFooter"
import JumbotronWithTabsHost from "./JumbotronWithTabsHost";
import QuestionModal from "./QuestionModal"
import "../css/Round.css"

const HostHomepage = () => {
    const [tab, setTab] = React.useState('home')
    return (

        <div>
            <MainNavbarHost setTab={setTab} />
            <JumbotronWithTabsHost setTab={setTab} />
            <PageFooter />
        </div>
    )
}

export default HostHomepage