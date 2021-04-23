import React from "react";
import MainNavbar from "./MainNavbar";
import "../css/Details.css";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";

const CreateQuest = (props) => {
  const [QuestName, setQuestName] = React.useState();
  const [About, setAbout] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Type, setType] = React.useState();
  const [StartTime, setStartTime] = React.useState();
  const [EndTime, setEndTime] = React.useState();

  const Create = async () => {
    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/create-update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          questName: QuestName,
          nature: Type,
          description: Description,
          about: About,
          startTime: StartTime,
          endTime: EndTime,
        }),
      }
    );

    console.log(response.status);
    const responseBody = await response.json();

    if (response.status !== 200) {
      showError(responseBody.errors);
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
          Type
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
          Start
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
          End
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
          About
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
          Description
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
          Logo
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
              //onChange={(ev) => updateState(ev,)}
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
          <button className="btnBegin" onClick={Create}>
            Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuest;
