import React from "react";
import MainNavbar from "./MainNavbar";
import "../css/Details.css";
import { Link, useHistory } from "react-router-dom";

// To Be Completed
const EditProfileHost = (props) => {
  const [Password, setPassword] = React.useState();
  const [Institution, setInstitution] = React.useState();
  const [response1, setResponse1] = React.useState({});
  const [userString, setuserString] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [RepName, setRepName] = React.useState("");
  const [RepDesignation, setRepDesignation] = React.useState("");

  const history = useHistory();

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const ProfileAPI = async () => {
    const response1 = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: "Hassaan",
          password: "hassaan123",
        }),
      }
    );

    console.log("response is", response1);

    const responseBody = await response1.json();
    console.log("response", responseBody);
    setResponse1(responseBody);

    if (response1.status !== 200) {
      console.log(`Error in enrolment.`);
      showError(responseBody.errors);
    } else {
      console.log(`Profile Viewed.`);
    }
  };

  console.log("Here");
  ProfileAPI();

  const updateState = (ev, stateUpdateFn) => {
    stateUpdateFn(ev.target.value);
  };

  let full = [];
  let empty = [];
  for (let i = 0; i < parseInt(response1.rating); i++) {
    full.push(1);
  }
  for (let i = 0; i < 5 - parseInt(response1.rating); i++) {
    empty.push(0);
  }

  const EditDets = async () => {
    console.log("starting");
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/profile/edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: Password,
          phone: Phone,
          representativeName: RepName,
          representativeDesignation: RepDesignation,
          organization: Institution,
        }),
      }
    );

    console.log("response is", response);

    const responseBody = await response.json();

    if (response.status !== 200) {
      console.log(`Error.`);
      showError(responseBody.errors);
    } else {
      history.push("/viewprofile");
    }
  };

  const Cancel = async () => {
    history.push("/viewprofile");
  };

  let hidden_password = "";
  for (let i = 0; i < response1.passwordlength; i++) {
    hidden_password = hidden_password.concat("*");
  }

  return (
    <div style={{ marginBottom: "80px" }}>
      <MainNavbar />
      <div
        id="fancy"
        className="jumbotron jumbotron-fluid"
        style={{
          marginBottom: "0em",
          background:
            "linear-gradient(209.34deg, rgba(71, 111, 143, 0) 17.99%, #335875 177.27%), #1F394E",
        }}
      >
        <div style={{ marginLeft: "9%", marginRight: "9%" }}>
          <h1
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "40px",
              color: "#ffffff",
              //marginLeft: "0em",
              wordWrap: "break-word",
            }}
          >
            {response1.username}
          </h1>
        </div>
      </div>
      <div className="col-md-12" style={{ margin: "0em", padding: "0em" }}>
        <div id="top" style={{ margin: "0em", padding: "0em" }}></div>
      </div>
      <div
        style={{
          marginLeft: "9%",
          marginRight: "9%",
          marginTop: "5rem",
        }}
      >
        <p
          className="display-4"
          style={{
            fontWeight: "400",
            fontSize: "32px",
            color: "#313131",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Edit My Profile
        </p>

        <p
          className="display-4"
          style={{
            paddingTop: "1.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Username
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {response1.username}
          </div>
        </p>

        <p
          className="display-4"
          style={{
            //paddingTop: "1.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Rating
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "20px",
              color: "#313131",
              wordWrap: "break-word",
            }}
          >
            {full.map((a, index) => {
              return <i key={index} className="fa fa-star"></i>;
            })}
            {empty.map((a, index) => {
              return <i key={index} className="far fa-star"></i>;
            })}
          </div>
        </p>

        <p
          className="display-4"
          style={{
            paddingTop: "0.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Representative Name
          <div
            style={{
              paddingTop: "0.5rem",
            }}
          >
            <input
              type="text"
              className="inputdetail"
              //placeholder="1"
              placeholder={response1.representativeName}
              onChange={(ev) => updateState(ev, setRepName)}
            />
          </div>
        </p>

        <p
          className="display-4"
          style={{
            paddingTop: "0.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Representative Designation
          <div
            style={{
              paddingTop: "0.2rem",
            }}
          >
            <input
              type="text"
              className="inputdetail"
              //placeholder="1"
              placeholder={response1.representativeDesignation}
              onChange={(ev) => updateState(ev, setRepDesignation)}
            />
          </div>
        </p>

        <p
          className="display-4"
          style={{
            paddingTop: "0.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Phone
          <div
            style={{
              paddingTop: "0.2rem",
            }}
          >
            <input
              type="date"
              className="inputdetail"
              //placeholder="1"
              placeholder={response1.phone}
              onChange={(ev) => updateState(ev, setPhone)}
            />
          </div>
        </p>

        <p
          className="display-4"
          style={{
            paddingTop: "0.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Institution
          <div
            style={{
              paddingTop: "0.2rem",
            }}
          >
            <input
              type="text"
              className="inputdetail"
              placeholder="1"
              placeholder={response1.organization}
              onChange={(ev) => updateState(ev, setInstitution)}
            />
          </div>
        </p>

        <p
          className="display-4"
          style={{
            paddingTop: "0.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Password
          <div
            style={{
              paddingTop: "0.2rem",
            }}
          >
            <input
              type="password"
              className="inputdetail"
              placeholder={hidden_password}
              onChange={(ev) => updateState(ev, setPassword)}
            />
          </div>
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          {/* <Button class="btnBegin" text="Begin" onClick={props.onClick} /> */}
          <button className="btnCancel" onClick={Cancel}>
            Cancel <i class="fa fa-times"></i>
          </button>
          <span style={{ paddingBottom: "0.5rem" }}>
            <button className="btnBegin" onClick={EditDets}>
              Update <i class="fa fa-check"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditProfileHost;
