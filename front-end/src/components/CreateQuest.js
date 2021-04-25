import React from "react";
import MainNavbar from "./MainNavbar";
import "../css/Details.css";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";

const CreateQuest = (props) => {
  const [QuestName, setQuestName] = React.useState(undefined);
  const [About, setAbout] = React.useState(undefined);
  const [Description, setDescription] = React.useState(undefined);
  const [Type, setType] = React.useState(undefined);
  const [StartTime, setStartTime] = React.useState(undefined);
  const [EndTime, setEndTime] = React.useState(undefined);
  const [logo, setLogo] = React.useState();

  const Create = async () => {
    const formData = new FormData();
    formData.append(`questName`, QuestName);
    formData.append(`nature`, Type);
    formData.append(`description`, Description);
    formData.append(`about`, About);
    formData.append(`startTime`, StartTime);
    if (!logo) {
      alert(`Please upload a logo`);
      return;
    }
    formData.append(`logo`, logo);
    formData.append(`endTime`, EndTime);

    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/create-edit-quest/create`,
      {
        method: "POST",
        header: { 'Content-Type': 'multipart/form-data' },
        body: formData,
        credentials: "include",
      }
    );

    console.log(response.status);
    const responseBody = await response.json();

    if (response.status !== 200) {
      showError(responseBody);
    } else {
      console.log("Quest  Created Successfully!");
      history.push("/hosthomepage");
    }
  };

  const history = useHistory();

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const updateState = (ev, stateUpdateFn) => {
    stateUpdateFn(ev.target.value);
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <MainNavbar />
      <Header heading="Create New Quest" subheading=" " />
      <BreadCrumb
        items={[
          { text: "Home", to: "/hosthomepage" },
          {
            text: "Create New Quest",
            to: `/hosthomepage/createquest`,
          },
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
          Quest Details
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
          Name
        </p>
        <div
          style={{
            paddingTop: "0.5rem",
          }}
        >
          <input
            type="text"
            className="inputdetail"
            placeholder="Enter quest name"
            onChange={(ev) => updateState(ev, setQuestName)}
          />
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
          Type
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="text"
            className="inputdetail"
            placeholder="Enter quest type"
            onChange={(ev) => updateState(ev, setType)}
          />
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
          Start
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="datetime-local"
            className="inputdetail"
            placeholder="Enter Start Time"
            onChange={(ev) => updateState(ev, setStartTime)}
          />
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
          End
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="datetime-local"
            className="inputdetail"
            placeholder="1"
            onfocus="this.type='datetime-local'"
            onblur="if(this.value==='')this.type='text'"
            //placeholder={response1.dateofbirth}
            onChange={(ev) => updateState(ev, setEndTime)}
          />
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
          About
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="text"
            className="longinputdetail"
            placeholder="Enter a short description of your quest"
            //placeholder={response1.organization}
            onChange={(ev) => updateState(ev, setDescription)}
          />
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
          Description
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="text"
            className="longinputdetail"
            placeholder="Enter complete description of your quest"
            //placeholder={response1.organization}
            onChange={(ev) => updateState(ev, setAbout)}
          />
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
          Logo
        </p>
        <div
          style={{
            paddingTop: "0.2rem",
          }}
        >
          <input
            type="file"
            accept="image/png, image/jpeg"
            //className="inputdetail"
            //placeholder={hidden_password}
            onChange={ev => {
              const file = ev.target.files[0];
              console.log({ file });
              setLogo(file);
            }}
          />
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
          <button className="btnBegin" onClick={Create}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuest;
