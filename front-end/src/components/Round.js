import React from "react"
import MainNavbar from "./MainNavbar"
import Header from "./Header"
import Question from "./Question"
import "../css/Round.css"


const RapidFireRound = () => {
    return (
        <React.Fragment>
            <MainNavbar />
            <Header />
            
            <Question />
        </React.Fragment>
    )
}

export default RapidFireRound