import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import EditQuestDetailsFormat from "./EditQuestDetailsFormat";

const HostQuestDetails = (props) => {

    const [isEditing, setIsEditing] = React.useState(false);

    const edit = () => {
        setIsEditing(true);
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
            { !isEditing ?
                <div>
                    <QuestDetailsFormat
                        questname={props.response.quest.questName}
                        hostname={props.response.quest.hostUser}
                        hostrating={props.response.quest.rating}
                        startingtime={props.response.quest.startTime}
                        startTimeRaw={props.response.quest.startTimeRaw}
                        endingtime={props.response.quest.endTime}
                        endTimeRaw={props.response.quest.endTimeRaw}
                        type={props.response.quest.nature}
                        about={props.response.quest.about}
                        description={props.response.quest.description}
                        imgsrc={props.response.quest.logoURL}
                        left="3rem"
                        right="3rem"
                        top="3rem"
                    />
                    {props.response.editable === true &&
                    <div>
                        <div className="d-none d-md-block" style={{ textAlign: "right" }}>
                            <button className="btnBegin" onClick={() => edit()}>
                                Edit <i className="far fa-edit"></i>
                            </button>
                        </div>
                        <div className="d-md-none" style={{ textAlign: "center" }}>
                            <button className="btnBegin" onClick={() => edit()}>
                                Edit <i className="far fa-edit"></i>
                            </button>
                        </div>
                    </div>}
                </div>
            :
                <EditQuestDetailsFormat
                    questname={props.response.quest.questName}
                    hostname={props.response.quest.hostUser}
                    hostrating={props.response.quest.rating}
                    startingtime={props.response.quest.startTime}
                    startTimeRaw={props.response.quest.startTimeRaw}
                    endingtime={props.response.quest.endTime}
                    endTimeRaw={props.response.quest.endTimeRaw}
                    type={props.response.quest.nature}
                    about={props.response.quest.about}
                    description={props.response.quest.description}
                    imgsrc={props.response.quest.logoURL}
                    editable={props.response.editable}
                    requestQuest={props.requestQuest}
                    setIsEditing={setIsEditing}
                    left="3rem"
                    right="3rem"
                    top="3rem"
                />
            }
        </div>

    )

}

export default HostQuestDetails