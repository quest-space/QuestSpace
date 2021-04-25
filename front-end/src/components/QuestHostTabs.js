import React from "react";
import PageFooter from "./PageFooter";
import HostLeaderboardList from "./HostLeaderboardList";
import HostParticipantList from "./HostParticipantList";
import HostQuestDetails from "./HostQuestDetails";
import HostRoundsList from "./HostRoundsList";


const QuestHostTabs = (props) => {

    const [bar1, setBorderBar1] = React.useState("3px solid #313131");
    const [bar2, setBorderBar2] = React.useState("1px solid #C4C4C4");
    const [bar3, setBorderBar3] = React.useState("1px solid #C4C4C4");
    const [bar4, setBorderBar4] = React.useState("1px solid #C4C4C4");
    const [tab, setTab] = React.useState("Details");

    const setBar = (x) => {
        setTab(x);
        if (x === "Details") {
            setBorderBar3("1px solid #C4C4C4");
            setBorderBar2("1px solid #C4C4C4");
            setBorderBar1("3px solid #313131");
            setBorderBar4("1px solid #C4C4C4");
        } else if (x === "Rounds") {
            setBorderBar1("1px solid #C4C4C4");
            setBorderBar3("1px solid #C4C4C4");
            setBorderBar2("3px solid #313131");
            setBorderBar4("1px solid #C4C4C4");
        } else if (x == "Participant") {
            setBorderBar1("1px solid #C4C4C4");
            setBorderBar2("1px solid #C4C4C4");
            setBorderBar3("3px solid #313131");
            setBorderBar4("1px solid #C4C4C4");
        } else if (x == "Leaderboard") {
            setBorderBar1("1px solid #C4C4C4");
            setBorderBar2("1px solid #C4C4C4");
            setBorderBar4("3px solid #313131");
            setBorderBar3("1px solid #C4C4C4");
        }
    };

    return (
        <div>
            <div className="col-md-12" style={{ margin: "0em", padding: "0em" }}>
                <ul
                    id="top"
                    style={{
                        backgroundColor: "#ffffff",
                        margin: "0em",
                        padding: "0em",
                        paddingLeft: "9%",
                        paddingRight: "9%",
                        paddingTop: "5.5rem",
                    }}
                >
                    <button
                        className="plain one"
                        onClick={() => setBar("Details")}
                        style={{ borderBottom: bar1, width: "25%" }}
                    >
                        Details
                    </button>
                    <button
                        className="plain two"
                        onClick={() => setBar("Rounds")}
                        style={{ borderBottom: bar2, width: "25%" }}
                    >
                        Rounds
                    </button>
                    <button
                        className="plain two"
                        onClick={() => setBar("Participant")}
                        style={{ borderBottom: bar3, width: "25%" }}
                    >
                        Participant
                    </button>
                    <button
                        className="plain three"
                        onClick={() => setBar("Leaderboard")}
                        style={{ borderBottom: bar4, width: "25%" }}
                    >
                        Leaderboard
                    </button>
                </ul>
            </div>

            {
                tab == "Details" && <HostQuestDetails response={props.response} />
            }

            {
                tab == "Rounds"  && <HostRoundsList response={props.response} setRender={props.setRender} />
            }

            {
                tab == "Participant" && props.response.participants !== null && <HostParticipantList response={props.response} />
            }

            {
                tab == "Leaderboard" && <HostLeaderboardList response={props.response} />
            }
            {
                tab == "Participant" && props.response.editable === false && props.response.participants === null &&
                <div style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)",
                    marginBottom: "5.5rem",
                    marginTop: "3rem",
                    marginLeft: "9%",
                    marginRight: "9%",
                    padding: "2rem"
                }}>
                    <i class="fas fa-exclamation-circle"></i> No Participants found!
                </div>
            }
            <PageFooter />
        </div>
    )

}


export default QuestHostTabs