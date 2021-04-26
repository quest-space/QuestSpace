import React from "react";
import MainNavbar from "./MainNavbar";
import "../css/Details.css";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import BreadCrumb from "./BreadCrumb";

const CreateQuest = (props) => {
  const [QuestName, setQuestName] = React.useState(``);
  const [About, setAbout] = React.useState(``);
  const [Description, setDescription] = React.useState(``);
  const [Type, setType] = React.useState(`public`);
  const [StartTime, setStartTime] = React.useState(``);
  const [EndTime, setEndTime] = React.useState(``);
  const [logo, setLogo] = React.useState();

  // errors:
  const [errors, setErrors] = React.useState({});

  const Create = async () => {
    const formData = new FormData();
    formData.append(`questName`, QuestName);
    formData.append(`nature`, Type);
    formData.append(`description`, Description);
    formData.append(`about`, About);
    formData.append(`startTime`, StartTime);
    // if (!logo) {
    //   alert(`Please upload a logo`);
    //   return;
    // }
    formData.append(`logo`, logo);
    formData.append(`endTime`, EndTime);

    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/create-edit-quest/create`,
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
      console.log(`Error in fetching`);
        if (responseBody.errors) {
          setErrors(responseBody.errors);
          console.log('responseBody.errors', responseBody.errors);
        } else {
          console.log('genericErrMsg', responseBody.genericErrMsg);
          console.log('responseBody', responseBody);
          alert(`There seems to be a problem. Pease contact QuestSpace team.${responseBody.genericErrMsg ? ` Error message: ${responseBody.genericErrMsg}` : ""}`);
        }
    } else {
      console.log("Quest Created Successfully!");
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
            paddingTop: "2rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Name&nbsp;<span style={{color:"#F70000"}}><sup>*</sup></span>
        </p>
        <div>
          <input
            type="text"
            className="inputdetail"
            placeholder="Enter quest name"
            onChange={(ev) => updateState(ev, setQuestName)}
          />
          {errors.questName && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}><i className="fas fa-exclamation-circle"></i>&nbsp;{errors.questName.message}</div>}
        </div>
        {/* </p> */}

        <p
          className="display-4"
          style={{
            paddingTop: "2rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Type&nbsp;<span style={{color:"#F70000"}}><sup>*</sup></span>
        </p>
        <div>
          <select defaultValue={Type} onChange={(ev) => updateState(ev, setType)} className="form-control" style={{ width: '10rem', maxWidth: '100%' }}>
              <option value="public">Public</option>
              <option value="private">Private</option>
          </select>
          {errors.nature && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}><i className="fas fa-exclamation-circle"></i>&nbsp;{errors.nature.message}</div>}
        </div>
        {/* </p> */}

        <p
          className="display-4"
          style={{
            paddingTop: "2rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Start Time&nbsp;<span style={{color:"#F70000"}}><sup>*</sup></span>
        </p>
        <div>
          <input
            type="datetime-local"
            className="inputdetail"
            placeholder="Enter Start Time"
            onChange={(ev) => updateState(ev, setStartTime)}
          />
          {errors.startTime && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}><i className="fas fa-exclamation-circle"></i>&nbsp;{errors.startTime.message}</div>}
        </div>
        {/* </p> */}

        <p
          className="display-4"
          style={{
            paddingTop: "2rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          End Time&nbsp;<span style={{color:"#F70000"}}><sup>*</sup></span>
        </p>
        <div>
          <input
            type="datetime-local"
            className="inputdetail"
            placeholder="1"
            onfocus="this.type='datetime-local'"
            onblur="if(this.value==='')this.type='text'"
            // placeholder={response1.dateofbirth}
            onChange={(ev) => updateState(ev, setEndTime)}
          />
          {errors.endTime && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}><i className="fas fa-exclamation-circle"></i>&nbsp;{errors.endTime.message}</div>}
        </div>
        {/* </p> */}

        <p
          className="display-4"
          style={{
            paddingTop: "2rem",
            paddingBottom: "0rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Description&nbsp;<span style={{color:"#F70000"}}><sup>*</sup></span>
        </p>
        <div>
          <input
            type="text"
            className="longinputdetail"
            placeholder="Enter a short description of your quest"
            //placeholder={response1.organization}
            onChange={(ev) => updateState(ev, setDescription)}
          />
          {errors.description && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}><i className="fas fa-exclamation-circle"></i>&nbsp;</div>}
        </div>
        {/* </p> */}

        <p
          className="display-4"
          style={{
            paddingTop: "2rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          About&nbsp;<span style={{color:"#F70000"}}><sup>*</sup></span>
        </p>
        <div>
          <textarea
            type="text"
            className="longinputdetail"
            placeholder="Enter the complete description of your quest"
            //placeholder={response1.organization}
            onChange={(ev) => updateState(ev, setAbout)}
          />
          {errors.about && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}><i className="fas fa-exclamation-circle"></i>&nbsp;{errors.about.message}</div>}
        </div>
        {/* </p> */}

        <p
          className="display-4"
          style={{
            paddingTop: "2rem",
            fontWeight: "400",
            fontSize: "20px",
            color: "#46B7A1",
            marginLeft: "0rem",
            wordWrap: "break-word",
          }}
        >
          Logo&nbsp;<span style={{color:"#F70000"}}><sup>*</sup></span>
        </p>
        <div>
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
          {errors.logo && <div style={{ paddingTop: "0.4rem", fontSize: "18px", color: "#F70000" }}><i className="fas fa-exclamation-circle"></i>&nbsp;{errors.logo.message}</div>}
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
