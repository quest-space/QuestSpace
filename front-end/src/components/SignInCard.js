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
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/auth/signin/${userString}`, {
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
                <div className="titleSignUp">
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

            <form className="formSignUp">
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Username</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" onChange={(ev) => updateState(ev, setUserName)} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Password</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="password" className="inputSignUp" placeholder="Enter here" onChange={(ev) => updateState(ev, setPassword)} />
                    </div>
                </div>
            </form>

            <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <button className="btnNextSignUp" onClick={signInUser}>
                    Sign In
                </button>
            </div>


            <div className="titleCaptionSignUp" style={{ paddingTop: "10px" }}>
                Not registered?&nbsp;
                <Link className="titleCaptionSignUp" style={{ textDecorationLine: "underline" }} to="/signup">
                    Sign Up
                </Link>
            </div>

        </div>
    )
}

export default SignInCard