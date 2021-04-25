import React from "react"
import MainNavbarHost from "./MainNavbarHost"
import PageFooter from "./PageFooter"
import JumbotronWithTabsHost from "./JumbotronWithTabsHost";
import CardsContainerHost from "./CardsContainerHost"
import "../css/Round.css"

const HostHomepage = (props) => {
    const [tab, setTab] = React.useState(props.location ? (props.location.state ? props.location.state.tab : 'all') : 'all');
    
    return (
        <div>
            <MainNavbarHost setTab={setTab} />
            <JumbotronWithTabsHost setTab={setTab} tab={tab} />
            <CardsContainerHost tab={tab}/>
            <PageFooter />
        </div>
    )
}

export default HostHomepage