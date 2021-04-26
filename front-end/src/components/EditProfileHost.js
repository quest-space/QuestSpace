import React from "react";
import MainNavbarHost from "./MainNavbarHost";
import "../css/Details.css";
import { useHistory } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";

const EditProfileHost = (props) => {
  const [response1, setResponse1] = React.useState({
    representativeDesignation: "",
    representativeName: "",
    password: "",
    phone: "",
    organization: "",
  });
  const history = useHistory();
  const [render, setRender] = React.useState(false);

  const [Password, setPassword] = React.useState("");
  const [Institution, setInstitution] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [RepName, setRepName] = React.useState("");
  const [RepDesignation, setRepDesignation] = React.useState("");
  const [HiddenPassword, setHiddenPassword] = React.useState("");
  const [errors, setErrors] = React.useState({})

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const makepw = (num) => {
    let hidden_password = "";
    for (let i = 0; i < num; i++) {
      hidden_password = hidden_password.concat("*");
    }
    return hidden_password;
  };
  const ProfileAPI = async () => {
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/profile`,
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
    setRepName(responseBody.representativeName);
    setRepDesignation(responseBody.representativeDesignation);
    setPassword(responseBody.password);
    setPhone(responseBody.phone);
    setInstitution(responseBody.organization);

    let hidden_password = "";
    for (let i = 0; i < responseBody.passwordlength; i++) {
      hidden_password = hidden_password.concat("*");
    }
    setHiddenPassword(hidden_password);

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

  const updatePW = (ev) => {
    setPassword(ev.target.value);
    setHiddenPassword(makepw(Password.length));
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
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/profile/submit`,
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
      if (responseBody.errors) {
        setErrors(responseBody.errors);
      } else if (responseBody.genericErrMsg) {
        alert(responseBody.genericErrMsg);
      } else {
        console.log(responseBody.genericErrMsg);
        alert(`There seems to be a problem. Pease contact QuestSpace team.`)
      }
      // showError(responseBody.errors);
    } else {
      history.push("/viewprofile");
    }
  };

  const Cancel = async () => {
    history.push("/viewprofile");
  };

  //setPassword(response1.password);

  return (
    <div style={{ marginBottom: "80px" }}>
      <MainNavbarHost />
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
      <BreadCrumb
        items={[
          { text: "My Profile", to: "/viewprofile" },
          { text: "Edit Profile", to: "/hosteditprofile" },
        ]}
      />
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
        </p>
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
        {/* </p> */}

        <p
          className="display-4"
          style={{
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Rating
        </p>
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
        {/* </p> */}

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
        </p>
        <div
          style={{
            paddingTop: "0.5rem",
          }}
        >
          <input
            type="text"
            className="inputdetail"
            value={RepName}
            onChange={(ev) => updateState(ev, setRepName)}
          />
          {errors.representativeName && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}>{errors.representativeName.message}</div>}
        </div>
        {/* </p> */}

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
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="text"
            className="inputdetail"
            value={RepDesignation}
            onChange={(ev) => updateState(ev, setRepDesignation)}
          />
          {errors.representativeDesignation && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}>{errors.representativeDesignation.message}</div>}
        </div>
        {/* </p> */}

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
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="text"
            className="inputdetail"
            value={Phone}
            onChange={(ev) => updateState(ev, setPhone)}
          />
          {errors.phone && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}>{errors.phone.message}</div>}
        </div>
        {/* </p> */}

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
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="text"
            className="inputdetail"
            value={Institution}
            onChange={(ev) => updateState(ev, setInstitution)}
          />
          {errors.organization && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}>{errors.organization.message}</div>}
        </div>
        {/* </p> */}

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
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="password"
            className="inputdetail"
            placeholder={HiddenPassword}
            onChange={(ev) => updateState(ev, setPassword)}
          />
          {errors.password && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}>{errors.password.message}</div>}
        </div>
        {/* </p> */}

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
            Cancel <i className="fa fa-times"></i>
          </button>
          <span style={{ paddingBottom: "0.5rem" }}>
            <button className="btnBegin" onClick={() => EditDets()}>
              Update <i className="fa fa-check"></i>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditProfileHost;
