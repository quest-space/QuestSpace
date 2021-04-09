import React from "react"
import "../css/SignUp.css"
import "bootstrap"


const CreateAccount = () => {

    const [user, setUser] = React.useState(true)

    const switchUser = () => {
        setUser(!user)
    }

    return (
        <div className="createAccount">
            <div className="header">
                <div className="title">
                    Create an Account
                </div>

                <div className="titleCaption">
                    Already have one?&nbsp;
                    <a className="titleCaption" style={{ textDecorationLine: "underline" }} href="/signin">
                        Sign In
                    </a>
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
                <button className="btnNext">
                    Next&nbsp;&nbsp;
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>





        </div>
    )
}

export default CreateAccount