import React from "react";
import EditHeadSubhead from "./EditHeadSubhead";
import "../css/Details.css";
import "../css/questdetails.css";

/*
How to use:
<QuestDetailsFormat hostname="IEEE LUMS" hostrating="3" startingtime="11:00 am, 21st March 2021" endingtime="11:00 am, 22nd March 2021" type="Public" about="CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor.CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor." imgsrc={codinguru}/>
*/

const EditQuestDetailsFormat = (props) => {
  const [questType, setQuestType] = React.useState(props.type);
  const [startDate, setStartDate] = React.useState(props.startingtime);
  const [endDate, setEndDate] = React.useState(props.endingtime);

  console.log(startDate);
  
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

  const setType = (ev) => {
    setQuestType(ev.target.value)
  }

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
              paddingTop: "1rem",
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
            <select defaultValue={props.type} onChange={(ev) => updateState(ev, setQuestType)} className="form-control" style={{ width: '10rem', maxWidth: '100%' }}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
          </div>
        </div>

        <div>
          <div
            className="display-4"
            style={{
              paddingTop: "1rem",
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
              style={{ fontSize: "19px", paddingTop: "0.5rem", display: "block" }}
              // onblur="if(this.value==='')this.type='text'"
              value={startDate}
              onChange={(ev) => updateState(ev, setStartDate)}
            />
          </div>
        </div>


        <div>
          <EditHeadSubhead heading="Starts" subheading={props.startingtime} />
          <EditHeadSubhead heading="Ends" subheading={props.endingtime} />
          <EditHeadSubhead heading="About" subheading={props.about} />
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "2rem",
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
