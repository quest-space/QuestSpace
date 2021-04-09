import React from "react"
import CardsContainer from "./CardsContainer"
import JumbotronWithTabs from "./JumbotronWithTabs"
import InitialNavbar from "./InitialNavbar"


const Header = () => {

  return(
    <div>
      <InitialNavbar/>
      <JumbotronWithTabs/>
      <CardsContainer/>
    </div>
  )

}

export default Header