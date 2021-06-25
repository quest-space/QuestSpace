import React from "react"

const Tabs = (props) => {
    const [bar1, setBorderBar1] = React.useState("3px solid #313131")
    const [bar2, setBorderBar2] = React.useState("1px solid #C4C4C4")
    const [bar3, setBorderBar3] = React.useState("1px solid #C4C4C4")
    const [bar4, setBorderBar4] = React.useState("1px solid #C4C4C4")
    // const [width] = React.useState()

    // console.log("width", width, props.roundType)

    const setBar = (x) => {
        props.setTab(x)
        if (x === "Round Details") {
            setBorderBar3("1px solid #C4C4C4")
            setBorderBar2("1px solid #C4C4C4")
            setBorderBar1("3px solid #313131")
            setBorderBar4("1px solid #C4C4C4")
        } else if (x === "Questions") {
            setBorderBar1("1px solid #C4C4C4")
            setBorderBar3("1px solid #C4C4C4")
            setBorderBar2("3px solid #313131")
            setBorderBar4("1px solid #C4C4C4")
        } else if (x == "Submissions") {
            setBorderBar1("1px solid #C4C4C4")
            setBorderBar2("1px solid #C4C4C4")
            setBorderBar3("3px solid #313131")
            setBorderBar4("1px solid #C4C4C4")
        } else if (x == "Leaderboard") {
            setBorderBar1("1px solid #C4C4C4")
            setBorderBar2("1px solid #C4C4C4")
            setBorderBar3("1px solid #C4C4C4")
            setBorderBar4("3px solid #313131")
        }
    }

    return (
        <div>
        <div className="col-md-12 d-none d-sm-none d-md-block d-lg-block" style={{ margin: "0em", padding: "0em" }}>
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
                    onClick={() => setBar("Round Details")}
                    style={{ borderBottom: bar1, width: props.roundType === `Submission` ? "25%" : "33.33%", whiteSpace: "nowrap" }}
                >
                    Round Details
                </button>
                <button
                    className="plain two"
                    onClick={() => setBar("Questions")}
                    style={{ borderBottom: bar2, width: props.roundType === `Submission` ? "25%" : "33.33%" }}
                >
                    {props.roundType === `Submission` ? `Question` : `Questions`}
                </button>
                {props.roundType === `Submission` && <button
                    className="plain two"
                    onClick={() => setBar("Submissions")}
                    style={{ borderBottom: bar3, width: props.roundType === `Submission` ? "25%" : "33.33%" }}
                >
                    Submissions
                </button>}
                <button
                    className="plain three"
                    onClick={() => setBar("Leaderboard")}
                    style={{ borderBottom: bar4, width: props.roundType === `Submission` ? "25%" : "33.33%" }}
                >
                    Leaderboard
                </button>
            </ul>
        </div>

        {/* TABS MOBILE */}

        <div className="dropdown d-lg-none d-sm-block" style={{marginLeft:"9%", marginRight:"9%", marginBottom:"0", paddingBottom:"0rem", marginBottom:"-2.7rem", paddingTop:"5rem"}}>
                
                 <button
                    className="plainSp dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton top"
                    data-toggle="dropdown"
                    style={{width:"100%", fontSize:"18px", fontWeight:"500", paddingTop:"0.5rem", paddingBottom:"0.5rem"
                    }}
                    >
                    Manage Your Round
                </button>
                
                <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
                style={{margin:"0", padding:"0", width:"100%"}}
                >

                <button
                    className="dropdown-item dropKid1"
                    onClick={() => setBar("Round Details")}
                >
                    Round Details
                </button>
                {props.roundType === `Submission` && <button
                    className="dropdown-item dropKid1"
                    onClick={() => setBar("Submissions")}
                >
                    Submissions
                </button>}

                {props.roundType === `Submission` ? <button
                    className="dropdown-item dropKid1"
                    onClick={() => setBar("Questions")}
                >
                    Question
                </button>:
                <button
                className="dropdown-item dropKid1"
                onClick={() => setBar("Questions")}
                >
                    Questions
                </button>}

                <button
                    className="dropdown-item dropKid1"
                    onClick={() => setBar("Leaderboard")}
                >
                    Leaderboard
                </button>
                </div>
            </div>
        </div>
    )

}


export default Tabs