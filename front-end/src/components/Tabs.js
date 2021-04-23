import React from "react"

const Tabs = (props) => {
    const [bar1, setBorderBar1] = React.useState("3px solid #313131")
    const [bar2, setBorderBar2] = React.useState("1px solid #C4C4C4")
    const [bar3, setBorderBar3] = React.useState("1px solid #C4C4C4")
    const [bar4, setBorderBar4] = React.useState("1px solid #C4C4C4")
    const [width] = React.useState(props.submission ? "25%" : "33.33%")

    const setBar = (x) => {
        props.setTab(x)
        if (x === "Details") {
            setBorderBar3("1px solid #C4C4C4")
            setBorderBar2("1px solid #C4C4C4")
            setBorderBar1("3px solid #313131")
            setBorderBar4("1px solid #C4C4C4")
        } else if (x === "Rounds") {
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
                    style={{ borderBottom: bar1, width: width }}
                >
                    Details
                </button>
                <button
                    className="plain two"
                    onClick={() => setBar("Rounds")}
                    style={{ borderBottom: bar2, width: width }}
                >
                    Rounds
                </button>
                {props.submission && <button
                    className="plain two"
                    onClick={() => setBar("Submissions")}
                    style={{ borderBottom: bar3, width: width }}
                >
                    Submissions
                </button>}
                <button
                    className="plain three"
                    onClick={() => setBar("Leaderboard")}
                    style={{ borderBottom: bar4, width: width }}
                >
                    Leaderboard
                </button>
            </ul>
        </div>
    )

}


export default Tabs