import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import CreateAccountCommon from "./CreateAccountCommon"
import CreateAccountParticipant from "./CreateAccountParticipant"
import CreateAccountHost from "./CreateAccountHost"


const CreateAccount = () => {

    const [user, setUser] = React.useState(true)


    return (
        <CreateAccountCommon user={user} setUser={setUser} />
        // <CreateAccountParticipant />
        // <CreateAccountHost />
    )
}

export default CreateAccount