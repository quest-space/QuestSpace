import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import {Link} from "react-router-dom"


const SignInCard = () => {

    const [user, setUser] = React.useState(true)

    const switchUser = () => {
        setUser(!user)
    }

    const signInUser = async () => {
        const userString = user ? "Participant" : "Host"
        const response = await fetch()
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
                        <input type="text" className="input" placeholder="Enter here" />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formCol">
                        <label className="formLabel">Password</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <input type="password" className="input" placeholder="Enter here" />
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