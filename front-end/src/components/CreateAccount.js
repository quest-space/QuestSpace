import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import CreateAccountCommon from "./CreateAccountCommon"
import CreateAccountParticipant from "./CreateAccountParticipant"
import CreateAccountHost from "./CreateAccountHost"


const CreateAccount = () => {

    const [user, setUser] = React.useState(true)
    const [next, setNext] = React.useState(false)

    return (
        <React.Fragment>
            {!next && <CreateAccountCommon user={user} setUser={setUser} setNext={setNext} />}
            {next && user && <CreateAccountParticipant setNext={setNext} />}
            {next && !user && <CreateAccountHost setNext={setNext} />}
        </React.Fragment>
    )
}

export default CreateAccount