import React from "react";
import EditHeadSubhead from "./EditHeadSubhead";
import "../css/Details.css";
import "../css/questdetails.css";

/*
How to use:
<QuestDetailsFormat hostname="IEEE LUMS" hostrating="3" startingtime="11:00 am, 21st March 2021" endingtime="11:00 am, 22nd March 2021" type="Public" about="CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor.CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor." imgsrc={codinguru}/>
*/

const parseDate = (date) => {
  // const d = new Date(date);
  // const val = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
  // console.log({val});
  // return val;
  new Date()
}

const EditQuestDetailsFormat = (props) => {

  // normal variables:
  const [questType, setQuestType] = React.useState(``);
  const [startDate, setStartDate] = React.useState(``);
  const [endDate, setEndDate] = React.useState(``);
  const [about, setAbout] = React.useState(``);
  const [description, setDescription] = React.useState(``);
  const [logo, setLogo] = React.useState();

  // props-setting:
  const [isPropsSet, setIsPropsSet] = React.useState(false);

  // errors:

  if (!isPropsSet && props.startTimeRaw) {
    setIsPropsSet(true);
    setQuestType(props.type);
    setStartDate((new Date(new Date(props.startTimeRaw).getTime() + 5 * 60 * 60 * 1000)).toISOString().substr(0, 23));
    setEndDate((new Date(new Date(props.endTimeRaw).getTime() + 5 * 60 * 60 * 1000)).toISOString().substr(0, 23));
    setAbout(props.about);
    setDescription(props.description);
  }

  const update = async () => {

    const formData = new FormData();
    formData.append(`questName`, props.questname);
    formData.append(`nature`, questType);
    formData.append(`description`, description);
    formData.append(`about`, about);
    formData.append(`startTime`, startDate);
    formData.append(`endTime`, endDate);
    if (logo) {
      formData.append(`logo`, logo);
    }

    const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/host/create-edit-quest/edit`, {
      method: "POST",
      header: { 'Content-Type': 'multipart/form-data' },
      body: formData,
      credentials: "include",
    });

    const responseBody = await response.json()
    console.log('responsee', responseBody)
    console.log('responseerros', responseBody.errors)

    if (response.status !== 200) {
      console.log(`Error in fetching`)
      alert(responseBody.errors);
    } else {
      console.log(`Successful fetching`)
      props.requestQuest();
      props.setIsEditing(false);
    }
  }

  console.log(`startDate`, startDate);
  console.log(`startTimeRaw`, props.startTimeRaw);
  props.endTimeRaw && console.log(`endTimeRaw`, new Date(props.endTimeRaw).toISOString());

  let full = [];
  let empty = [];
  for (let i = 0; i < parseInt(props.hostrating); i++) {
    full.push(1);
  }
  for (let i = 0; i < 5 - parseInt(props.hostrating); i++) {
    empty.push(0);
  }

  const updateState = (ev, stateUpdateFn) => {
    stateUpdateFn(ev.target.value);
  };

  return (
    <div style={{ marginBottom: "80px" }}>
      <div
        className="col-md-12"
        style={{ margin: "0em", padding: "0em" }}
      ></div>
      <div
        style={{
          marginLeft: props.left,
          marginRight: props.right,
          marginTop: props.top,
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

        <img
          className="image responsive resp2 d-none d-sm-none d-md-block d-lg-block"
          src={props.imgsrc}
          style={{ float: "right" }}
        />

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
          Host
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
          {props.hostname}
        </div>
        {full.map((a, index) => {
          return <i key={index} className="fa fa-star"></i>;
        })}
        {empty.map((a, index) => {
          return <i key={index} className="far fa-star"></i>;
        })}
        {/* </p> */}
        {/*  */}


        {/* ------------------------- */}

        <div>
          <div
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
            Type
          </div>
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "19px",
              color: "#313131",
              marginLeft: "0rem",
              wordWrap: "break-word",
              paddingTop: `0.9em`
            }}
          >
            <select defaultValue={questType} onChange={(ev) => updateState(ev, setQuestType)} className="form-control" style={{ width: '10rem', maxWidth: '100%' }}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div>
          <div
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
            Starts
          </div>
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "19px",
              color: "#313131",
              marginLeft: "0rem",
              wordWrap: "break-word"
            }}
          >
            <input
              required
              type="datetime-local"
              className="inputdetail responsive"
              style={{ fontSize: "19px", paddingTop: "0.5rem", display: "block", width: '25rem', maxWidth: '100%' }}
              // onblur="if(this.value==='')this.type='text'"
              value={startDate}
              onChange={(ev) => updateState(ev, setStartDate)}
            />
          </div>
        </div>

        <div>
          <div
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
            Ends
          </div>
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "19px",
              color: "#313131",
              marginLeft: "0rem",
              wordWrap: "break-word"
            }}
          >
            <input
              required
              type="datetime-local"
              className="inputdetail responsive"
              style={{ fontSize: "19px", paddingTop: "0.5rem", display: "block", width: '25rem', maxWidth: '100%' }}
              // onblur="if(this.value==='')this.type='text'"
              value={endDate}
              onChange={(ev) => updateState(ev, setEndDate)}
            />
          </div>
        </div>

        {/* ----------------------- */}

        <div>
          <div
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
            Description
          </div>
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "19px",
              color: "#313131",
              marginLeft: "0rem",
              wordWrap: "break-word",
            }}
          >
            <input
              required
              type="text"
              className="inputdetail responsive"
              style={{ fontSize: "19px", paddingTop: "0.5rem", display: "block", width: '25rem', maxWidth: '100%' }}
              value={description}
              onChange={(ev) => updateState(ev, setDescription)}
            />
          </div>
        </div>

        {/* ----------------------- */}

        <div>
          <div
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
            About
          </div>
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "18px",
              color: "#313131",
              marginLeft: "0rem",
              wordWrap: "break-word",
            }}
          >
            <textarea
              required
              type="text"
              className="inputdetail responsive"
              style={{ paddingTop: "0.5rem", fontSize: "19px", display: "block", width: '25rem', maxWidth: '100%' }}
              value={about}
              onChange={(ev) => updateState(ev, setAbout)}
            />
          </div>
        </div>

        {/* --------------------- */}

        <div>
          <div
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
            Replace Logo
          </div>
          <div
            className="display-4"
            style={{
              fontWeight: "400",
              fontSize: "18px",
              color: "#313131",
              marginLeft: "0rem",
              wordWrap: "break-word",
              paddingBottom: "2rem"
            }}
          >
            <input
              required
              type="file"
              style={{ paddingTop: "0.8rem", fontSize: "18px", display: "block", width: '25rem', maxWidth: '100%' }}
              accept="image/png, image/jpeg"
              onChange={ev => {
                const file = ev.target.files[0];
                console.log({ file });
                setLogo(file);
              }}
            />
          </div>
        </div>


        {props.editable && props.editable === true && <div>
          <div className="d-none d-md-block" style={{ textAlign: "right" }}>
            <button className="btnCancel" onClick={() => props.setIsEditing(false)}>
              Cancel <i className="fa fa-times"></i>
            </button>
            <span style={{ marginBottom: "0.5rem" }}>
              <button className="btnBegin" onClick={() => update()}>
                Update <i className="fa fa-check"></i>
              </button>
            </span>
          </div>
          <div className="d-md-none" style={{ textAlign: "center" }}>
            <button className="btnCancel" onClick={() => props.setIsEditing(false)}>
              Cancel <i className="fa fa-times"></i>
            </button>
            <span style={{ marginBottom: "0.5rem" }}>
              <button className="btnBegin" onClick={() => update()}>
                Update <i className="fa fa-check"></i>
              </button>
            </span>
          </div>
        </div>}

        {/* ----------------------- */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "1.5rem",
          }} */}

        {/* {props.buttonShow === "1" &&
            <button className="btnBegin" onClick={() => props.onClick(true)}>
              Enroll
            </button>
          } */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default EditQuestDetailsFormat;
