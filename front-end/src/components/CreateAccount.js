import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import CreateAccountCommon from "./CreateAccountCommon"
import CreateAccountParticipant from "./CreateAccountParticipant"
import CreateAccountHost from "./CreateAccountHost"


const CreateAccount = () => {

    const [user, setUser] = React.useState(true)
    const [next, setNext] = React.useState(false)
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")

    return (
        <React.Fragment>
            {!next && <CreateAccountCommon user={user} setUser={setUser} setNext={setNext} setUserName={setUserName} setPassword={setPassword} userName={userName} password={password} />}
            {next && user && <CreateAccountParticipant setNext={setNext} userName={userName} password={password} />}
            {next && !user && <CreateAccountHost setNext={setNext} userName={userName} password={password} />}
        </React.Fragment>
    )
}

export default CreateAccount