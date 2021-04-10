import React from "react"
import "../css/SignUp.css"
import "bootstrap"


const CreateAccountHost = (props) => {

    const switchNext = () => {
        props.setNext(false)
    }

    return (
        <div className="createAccount">
            <div className="header">
                <div className="title">
                    Create a{`\n`}Host Account
                </div>

            </div>

            <form className="form">
                <div className="formRow">
                    <div className="formCol">
                        <label className="formLabel">Organization Name</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <input type="text" className="input" placeholder="Enter here" />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <label className="formLabel">Representative Name</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <input type="text" className="input" placeholder="Enter here" />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <label className="formLabel">Representative Designation</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <input type="text" className="input" placeholder="Enter here" />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formCol">
                        <label className="formLabel">Contact #</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formCol">
                        <input type="password" className="input" placeholder="Enter here" />
                    </div>
                </div>
            </form>

            <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <button className="btnBack" onClick={switchNext}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                    &nbsp;&nbsp;Back
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btnSignUp">
                    Sign Up
                </button>
            </div>

            <div style={{ textAlign: "center", paddingTop: "0px" }}>
                <i className="fa fa-circle  fa-fw  circleLight" aria-hidden="true" ></i>
                &nbsp;&nbsp;
                <i className="fa fa-circle circleDark" aria-hidden="true"></i>

            </div>

        </div>
    )

}

export default CreateAccountHost