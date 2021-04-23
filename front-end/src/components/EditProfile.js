import React from "react";
import MainNavbar from "./MainNavbar";
import "../css/Details.css";
import { Link, useHistory } from "react-router-dom";

// To Be Completed
const EditProfile = (props) => {
  const [user, setUser] = React.useState(true);
  const [FirstName, setFirstName] = React.useState();
  const [LastName, setLastName] = React.useState();
  const [Password, setPassword] = React.useState();
  const [DateofBirth, setDateofBirth] = React.useState();
  const [Institution, setInstitution] = React.useState();
  const [response1, setResponse1] = React.useState({});
  const [userString, setuserString] = React.useState("");

  const history = useHistory();

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const ProfileAPI = async () => {
    const checkResp = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      }
    );

    const checkRespBody = await checkResp.json();
    console.log("response", checkRespBody);
    setuserString(checkRespBody.type);

    const response1 = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/${userString}/profile/edit`,
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

  ProfileAPI();

  const updateState = (ev, stateUpdateFn) => {
    stateUpdateFn(ev.target.value);
  };

  const EditDets = async () => {
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/${userString}/edit`,
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
  for (let i = 0; i < response1.password.length; i++) {
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
              paddingTop: "0.5rem",
            }}
          >
            <input
              type="text"
              className="inputdetail"
              //placeholder="1"
              placeholder={response1.firstname}
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
              placeholder={response1.lastname}
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
              //placeholder="1"
              placeholder={response1.dateofbirth}
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
          <button className="btnBegin" onClick={EditDets}>
            Update <i class="fa fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
