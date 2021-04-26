import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import EditQuestDetailsFormat from "./EditQuestDetailsFormat";

const HostQuestDetails = (props) => {

    const Edit = () => {

    }

    return (

        <div
            style={{
                border: "1px solid #C4C4C4",
                boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)",
                marginLeft: "9%",
                marginRight: "9%",
                marginBottom: "5.5rem",
                marginTop: "3rem",
                paddingBottom: "3rem",
                paddingRight: "3rem"
            }}
        >
            <EditQuestDetailsFormat
                questname={props.response.quest.questName}
                hostname={props.response.quest.hostUser}
                hostrating={props.response.quest.rating}
                startingtime={props.response.quest.startTime}
                endingtime={props.response.quest.endTime}
                type={props.response.quest.nature}
                about={props.response.quest.about}
                imgsrc={props.response.quest.logoURL}
                left="3rem"
                right="3rem"
                top="3rem"
            />

            {props.response.editable == true && <div style={{ textAlign: "right" }}>
                <button className="btnBegin" onClick={() => Edit()}>
                    Edit <i className="far fa-edit"></i>
                </button>
            </div>}

        </div>

    )

}

export default HostQuestDetails