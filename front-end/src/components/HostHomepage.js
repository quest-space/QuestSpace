import React from "react"
import MainNavbarHost from "./MainNavbarHost"
import PageFooter from "./PageFooter"
import JumbotronWithTabsHost from "./JumbotronWithTabsHost";
import CardsContainerHost from "./CardsContainerHost"
import "../css/Round.css"

const HostHomepage = () => {
    const [tab, setTab] = React.useState('all')
    return (

        <div>
            <MainNavbarHost setTab={setTab} />
            <JumbotronWithTabsHost setTab={setTab} />
            <CardsContainerHost tab={tab}/>
            <PageFooter />
        </div>
    )
}

export default HostHomepage