import React from "react"
import "bootstrap"
import { Link, useHistory } from "react-router-dom"


const SignInCard = () => {

    const [user, setUser] = React.useState(true) // true participant false host
    const [userName, setUserName] = React.useState(``)
    const [password, setPassword] = React.useState(``)
    const [errors, setErrors] = React.useState([``, ``])

    const history = useHistory()

    const switchUser = () => {
        setUser(!user)
        setErrors([``, ``])
        setUserName(``)
        setPassword(``)
    }

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }

    const checkRequiredFields = () => {
        if (userName.length === 0 && password.length === 0) {
            setErrors([`This is a required field.`, `This is a required field.`])
            return false
        } else if (userName.length === 0) {
            setErrors([`This is a required field.`, ``])
            return false
        } else if (password.length === 0) {
            setErrors([``, `This is a required field.`])
            return false
        } else {
            return true
        }
    }

    const signInUser = async () => {

        if (!checkRequiredFields()) return

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

        const responseBody = await response.json()

        if (response.status === 200) { // successful
            user ? history.push("/participanthomepage") : history.push("/hosthomepage")
        } else if (response.status === 400) { //backend sent some error
            processErrors(responseBody.errors)
        } else {
            alert("Unexpected status code received.")
        }
    }

    const processErrors = (errorDict) => {
        const temp = [``, ``]
        for (let key in errorDict) {
            if (key === `username`) {
                temp[0] = errorDict[key].message
            } else if (key === `password`) {
                temp[1] = errorDict[key].message
            }
        }
        setErrors(temp)
    }

    const updateState = (ev, stateUpdateFn, index) => {
        const temp = [...errors]
        temp[index] = ``
        setErrors(temp)
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

            <form className="formSignUp" onSubmit={signInUser}>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Username</label>
                        < div className="signUpError">
                            {errors[0]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={userName} onChange={(ev) => updateState(ev, setUserName, 0)} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Password</label>
                        < div className="signUpError">
                            {errors[1]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="password" className="inputSignUp" placeholder="Enter here" value={password} onChange={(ev) => updateState(ev, setPassword, 1)} />
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