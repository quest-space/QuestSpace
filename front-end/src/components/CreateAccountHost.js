import React from "react"
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

    const signUpHost = async () => {

        if (!checkRequiredFields()) return

        const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/auth/signup/host`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(details)
        })

        const responseBody = await response.json()

        if (response.status === 201) {
            history.push("/hosthomepage")
        } else if (response.status === 400) {
            processErrors(responseBody.errors)
        } else {
            alert("Unexpected status code received.")
        }
    }

    const checkRequiredFields = () => {
        const temp = [``, ``, ``, ``, ``, ``]
        let check = true

        if (details.organization === ``) {
            temp[2] = `This is a required field.`
            check = false
        }
        if (details.representativeName === ``) {
            temp[3] = `This is a required field.`
            check = false
        }
        if (details.representativeDesignation === ``) {
            temp[4] = `This is a required field.`
            check = false
        }
        if (details.phone === ``) {
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
            } else if (key === `organization`) {
                temp[2] = errorDict[key].message
            } else if (key === `representativeName`) {
                temp[3] = errorDict[key].message
            } else if (key === `representativeDesignation`) {
                temp[4] = errorDict[key].message
            } else if (key === `phone`) {
                temp[5] = errorDict[key].message
            }
        }
        props.setErrors(temp)
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
                        <div className="signUpError">
                            {props.errors[2]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.organization} onChange={(ev) => updateDetails(ev, "organization", 2)} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Representative Name</label>
                        <div className="signUpError">
                            {props.errors[3]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.representativeName} onChange={(ev) => updateDetails(ev, "representativeName", 3)} />
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Representative Designation</label>
                        <div className="signUpError">
                            {props.errors[4]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.representativeDesignation} onChange={(ev) => updateDetails(ev, "representativeDesignation", 4)} />
                    </div>
                </div>

                <div className="formRow">
                    <div className="formColSignUp">
                        <label className="formLabelSignUp">Contact #</label>
                        <div className="signUpError">
                            {props.errors[5]}
                        </div>
                    </div>
                </div>
                <div className="formRow">
                    <div className="formColSignUp">
                        <input type="text" className="inputSignUp" placeholder="Enter here" value={details.phone} onChange={(ev) => updateDetails(ev, "phone", 5)} />
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