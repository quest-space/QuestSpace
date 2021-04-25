import React from "react";
import "../css/QSAdmin.css";
import "bootstrap";
import { useHistory } from "react-router-dom";

const QSAdminSignInCard = () => {
  const [user, setUser] = React.useState(true);
  const [userName, setUserName] = React.useState();
  const [password, setPassword] = React.useState();

  const history = useHistory();

  const switchUser = () => {
    setUser(!user);
  };

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const signInUser = async () => {
    const userString = "QSAdmin";
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/auth/signin/${userString}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      }
    );

    console.log("response is", response);

    const responseBody = await response.json();

    history.push("/qsadminhomepage");

    /*
    if (response.status !== 200) {
      console.log(`Error in sign in.`);
      showError(responseBody.errors);
    } else {
      console.log(`Sign in success.`);
      history.push("/qsadminhomepage");
    }
    */
  };

  const updateState = (ev, stateUpdateFn) => {
    stateUpdateFn(ev.target.value);
  };

  return (
    <div
      className="signinBox"
      style={{
        boxShadow: "2px 2px 8px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="header">
        <div className="titleSignUp">Admin Sign In</div>
      </div>

      <form className="formSignUp">
        <div className="formRow">
          <div className="formColSignUp">
            <label className="formLabelSignUp">Username</label>
          </div>
        </div>
        <div className="formRow" style={{ paddingBottom: "5px" }}>
          <div className="formColSignUp">
            <input
              type="text"
              className="input"
              placeholder="Enter here"
              onChange={(ev) => updateState(ev, setUserName)}
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formColSignUp">
            <label className="formLabelSignUp">Password</label>
          </div>
        </div>
        <div className="formRow">
          <div className="formColSignUp">
            <input
              type="password"
              className="input"
              placeholder="Enter here"
              onChange={(ev) => updateState(ev, setPassword)}
            />
          </div>
        </div>
      </form>

      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          textAlign: "center",
        }}
      >
        <button className="btnNextSignUp" onClick={signInUser}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default QSAdminSignInCard;
