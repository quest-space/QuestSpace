import React from "react"
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

    const updateDetails = (ev, attribute, index) => {
        let tempDetails = { ...details }
        tempDetails[attribute] = ev.target.value
        setDetails(tempDetails)

        const temp = [...props.errors]
        temp[index] = ``
        props.setErrors(temp)
    }

    const showError = (errors) => {
        alert(JSON.stringify(errors))
    }

    const signUpParticipant = async () => {

        if (!checkRequiredFields()) return

        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/auth/signup/participant`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(details)
        })

        const responseBody = await response.json()

        if (response.status === 201) {
            history.push("/participanthomepage")
        } else if (response.status === 400) {
            processErrors(responseBody.errors)
        } else {
            alert("Unexpected status code received.")
        }

    }

    const checkRequiredFields = () => {
        const temp = [``, ``, ``, ``, ``, ``]
        let check = true

        if (details.firstname === ``) {
            temp[2] = `This is a required field.`
            check = false
        }
        if (details.lastname === ``) {
            temp[3] = `This is a required field.`
            check = false
        }
        if (details.dateofbirth === ``) {
            temp[4] = `This is a required field.`
            check = false
        }
        if (details.organization === ``) {
            temp[5] = `This is a required field.`
            check = false
        }
        props.setErrors(temp)

        return check
    }

    const processErrors = (errorDict) => {
        const temp = [``, ``, ``, ``, ``, ``]
        for (let key in errorDict) {
            if (key === `username`) {
                temp[0] = errorDict[key].message
                props.setNext(false)
            } else if (key === `password`) {
                temp[1] = errorDict[key].message
                props.setNext(false)
            } else if (key === `firstname`) {
                temp[2] = errorDict[key].message
            } else if (key === `lastname`) {
                temp[3] = errorDict[key].message
            } else if (key === `dateofbirth`) {
                temp[4] = errorDict[key].message
            } else if (key === `organization`) {
                temp[5] = errorDict[key].message
            }
        }
        props.setErrors(temp)
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
                        <div className="signUpError">
                            {props.errors[2]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.firstname} onChange={(ev) => updateDetails(ev, "firstname", 2)} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Last Name</label>
                        <div className="signUpError">
                            {props.errors[3]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.lastname} onChange={(ev) => updateDetails(ev, "lastname", 3)} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Date of Birth</label>
                        <div className="signUpError">
                            {props.errors[4]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="date" className="inputSignUp" value={details.dateofbirth} onChange={(ev) => updateDetails(ev, "dateofbirth", 4)} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Institution</label>
                        <div className="signUpError">
                            {props.errors[5]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.organization} onChange={(ev) => updateDetails(ev, "organization", 5)} />
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