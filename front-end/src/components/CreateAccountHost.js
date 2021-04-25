import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import { useHistory } from "react-router-dom"


const CreateAccountHost = (props) => {

    const [details, setDetails] = React.useState({
        username: props.userName,
        password: props.password,
        organization: "",
        phone: "",
        representativeName: "",
        representativeDesignation: ""
    })

    const history = useHistory()

    const switchNext = () => {
        props.setNext(false)
    }

    const updateDetails = (ev, attribute) => {
        let tempDetails = { ...details }
        tempDetails[attribute] = ev.target.value

        setDetails(tempDetails)
    }

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }

    const signUpHost = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/auth/signup/host`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(details)
        })

        const responseBody = await response.json()

        if (response.status !== 201) {
            showError(responseBody.errors)
        } else {
            console.log("Host sign up success")
            history.push("/hosthomepage")
        }

    }

    return (
        <div className="createAccount">
            <div className="header">
                <div className="titleSignUp">
                    Create a{`\n`}Host Account
                </div>

            </div>

            <form className="formSignUp">
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Organization Name</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.organization} onChange={(ev) => updateDetails(ev, "organization")} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Representative Name</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.representativeName} onChange={(ev) => updateDetails(ev, "representativeName")} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Representative Designation</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.representativeDesignation} onChange={(ev) => updateDetails(ev, "representativeDesignation")} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Contact #</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.phone} onChange={(ev) => updateDetails(ev, "phone")} />
                    </div>
                </div>
            </form>

            <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <button className="btnBack" onClick={switchNext}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                    &nbsp;&nbsp;Back
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btnSignUp" onClick={signUpHost}>
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