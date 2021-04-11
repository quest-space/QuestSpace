import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import { Link, useHistory } from "react-router-dom"


const SignInCard = () => {

    const [user, setUser] = React.useState(true)
    const [userName, setUserName] = React.useState()
    const [password, setPassword] = React.useState()

    const history = useHistory()

    const switchUser = () => {
        setUser(!user)
    }

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }

    const signInUser = async () => {
        const userString = user ? "participant" : "host"
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/auth/signin/${userString}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                username: userName,
                password: password,
            }),
        })

        console.log("response is",response)

        const responseBody = await response.json()

        if (response.status !== 200) {
            console.log(`Error in sign in.`)
            showError(responseBody.errors)
        } else {
            console.log(`Sign in success.`)
            user ? history.push("/participanthomepage") : history.push("/hosthomepage")

        }

    }

    const updateState = (ev, stateUpdateFn) => {
        stateUpdateFn(ev.target.value)
    }

    return (
        <div className="createAccount">
            <div className="header">
                <div className="title">
                    Sign In
                </div>
            </div>

            <nav className="nav nav-pills nav-justified">
                <button className={`btn${user}`} onClick={switchUser} style={{ borderRadius: "30px 0px 0px 30px" }}>
                    Participant
                </button>
                <button className={`btn${!user}`} onClick={switchUser} style={{ borderRadius: "0px 30px 30px 0px" }}>
                    Host
                </button>
            </nav>

            <form className="form">
                <div className="formRow">
                    <div className="formCol">
                        <label className="formLabel">Username</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <input type="text" className="input" placeholder="Enter here" onChange={(ev) => updateState(ev, setUserName)} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formCol">
                        <label className="formLabel">Password</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <input type="password" className="input" placeholder="Enter here" onChange={(ev) => updateState(ev, setPassword)} />
                    </div>
                </div>
            </form>

            <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <button className="btnNext" onClick={signInUser}>
                    Sign In
                </button>
            </div>


            <div className="titleCaption" style={{ paddingTop: "10px" }}>
                Not registered?&nbsp;
                <Link className="titleCaption" style={{ textDecorationLine: "underline" }} to="/signup">
                    Sign Up
                </Link>
            </div>

        </div>
    )
}

export default SignInCard