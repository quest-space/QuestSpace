import React from "react";
import MainNavbar from "./MainNavbar";
import "../css/Details.css";
import { Link, useHistory } from "react-router-dom";

// To Be Completed
const EditProfile = () => {
  const [response1, setResponse1] = React.useState({});
  const [Password, setPassword] = React.useState("");
  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [DateofBirth, setDateofBirth] = React.useState("");
  const [Institution, setInstitution] = React.useState("");
  const [render, setRender] = React.useState(false);

  const history = useHistory();

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const ProfileAPI = async () => {
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      }
    );

    console.log("response is", response);

    const responseBody = await response.json();
    console.log("response", responseBody);
    setResponse1(responseBody);
    setDateofBirth(responseBody.dateofbirth);
    //setDateofBirth(responseBody.formatteddateofbirth);
    setFirstName(responseBody.firstname);
    setLastName(responseBody.lastname);
    setInstitution(responseBody.organization);
    setPassword(responseBody.password);

    if (response.status !== 200) {
      console.log(`Error in profile view.`);
      showError(responseBody.errors);
    } else {
      console.log(`Profile Viewed.`);
    }
  };

  if (!render) {
    setRender(true);
    ProfileAPI();
  }

  const updateState = (ev, stateUpdateFn) => {
    stateUpdateFn(ev.target.value);
  };

  const EditDets = async () => {
    console.log("starting");
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/participant/profile/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstname: FirstName,
          lastname: LastName,
          fullname: response1.fullname,
          dateofbirth: DateofBirth,
          organization: Institution,
          password: Password,
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
            {response1.fullname}
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
            paddingTop: "0.5rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          First Name
          <div
            style={{
              paddingTop: "0.2rem",
            }}
          >
            <input
              type="text"
              className="inputdetail"
              value={FirstName}
              onChange={(ev) => updateState(ev, setFirstName)}
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
          Last Name
          <div
            style={{
              paddingTop: "0.2rem",
            }}
          >
            <input
              type="text"
              className="inputdetail"
              //placeholder="1"
              //placeholder={response1.lastname}
              value={LastName}
              onChange={(ev) => updateState(ev, setLastName)}
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
          Date of Birth
          <div
            style={{
              paddingTop: "0.2rem",
            }}
          >
            <input
              type="date"
              className="inputdetail"
              value={"2020-10-02"}
              value={DateofBirth}
              onChange={(ev) => updateState(ev, setDateofBirth)}
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
              //placeholder="1"
              value={Institution}
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
              minLength="7"
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
          <button className="btnCancel" onClick={() => Cancel()}>
            Cancel <i class="fa fa-times"></i>
          </button>
          <span style={{ marginBottom: "0.5rem" }}>
            <button className="btnBegin" onClick={() => EditDets()}>
              Update <i class="fa fa-check"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
