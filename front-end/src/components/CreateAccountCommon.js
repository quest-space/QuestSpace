import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import { Link } from "react-router-dom"

const CreateAccountCommon = (props) => {

    const switchUser = () => {
        props.setUser(!props.user)
    }

    const switchNext = () => {
        props.setNext(true)
    }

    const updateState = (ev, stateUpdateFn) => {
        stateUpdateFn(ev.target.value)
    }

    return (
        <div className="createAccount">
            <div className="header">
                <div className="titleSignUp">
                    Create an Account
                </div>

                <div className="titleCaptionSignUp">
                    Already have one?&nbsp;
                    <Link className="titleCaptionSignUp" style={{ textDecorationLine: "underline" }} to="/signin">
                        Sign In
                    </Link>
                </div>

            </div>

            <nav className="nav nav-pills nav-justified">
                <button className={`btn${props.user}`} onClick={switchUser} style={{ borderRadius: "30px 0px 0px 30px" }}>
                    Participant
                </button>
                <button className={`btn${!props.user}`} onClick={switchUser} style={{ borderRadius: "0px 30px 30px 0px" }}>
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
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={props.userName} onChange={(ev) => updateState(ev, props.setUserName)} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Password</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="password" className="inputSignUp" placeholder="Enter here" value={props.password} onChange={(ev) => updateState(ev, props.setPassword)} />
                    </div>
                </div>
            </form>

            <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <button className="btnNextSignUp" onClick={switchNext}>
                    Next&nbsp;&nbsp;
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>

            <div style={{ textAlign: "center", paddingTop: "0px" }}>
                <i className="fa fa-circle  fa-fw  circleDark" aria-hidden="true" ></i>
                &nbsp;&nbsp;
                <i className="fa fa-circle circleLight" aria-hidden="true"></i>

            </div>

        </div>
    )
}

export default CreateAccountCommon