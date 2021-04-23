import React from "react"
import "../css/SignUp.css"
import "bootstrap"
import { useHistory } from "react-router-dom"

const CreateAccountParticipant = (props) => {

    const [details, setDetails] = React.useState({
        username: props.userName,
        password: props.password,
        firstname: "",
        lastname: "",
        dateofbirth: "",
        organization: ""
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

    const signUpParticipant = async () => {
        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/auth/signup/participant`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(details)
        })

        const responseBody = await response.json()

        if (response.status !== 201) {
            console.log("Error in participant sign up.")
            showError(responseBody.errors)
        } else {
            console.log("Participant sign up success")
            history.push("/participanthomepage")
        }

    }

    return (
        <div className="createAccount">
            <div className="header">
                <div className="titleSignUp">
                    Create a{`\n`}Participant Account
                </div>

            </div>

            <form className="formSignUp">
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">First Name</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.firstname} onChange={(ev) => updateDetails(ev, "firstname")} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Last Name</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.lastname} onChange={(ev) => updateDetails(ev, "lastname")} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Date of Birth</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="date" className="inputSignUp" placeholder="Enter here" value={details.dateofbirth} onChange={(ev) => updateDetails(ev, "dateofbirth")} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Institution</label>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.organization} onChange={(ev) => updateDetails(ev, "organization")} />
                    </div>
                </div>
            </form>

            <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <button className="btnBack" onClick={switchNext}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                    &nbsp;&nbsp;Back
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btnSignUp" onClick={signUpParticipant}>
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

export default CreateAccountParticipant