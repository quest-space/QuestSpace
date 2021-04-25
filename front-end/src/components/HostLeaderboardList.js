import React from "react";
import Leaderboard from "./Leaderboard"

const HostLeaderboardList = (props) => {

    return (
        <div style={{ marginTop: "3rem" }}>

            {/* Added this check to ensure that Leaderboard component is only rendered when props.response.leaderboard is not null. Otherwise, it gives error.*/}
            {props.response.leaderboard && <Leaderboard board={props.response.leaderboard.full} />}
            {
                props.response.leaderboard === null &&
                <div style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "1px 2px 10px 2px rgba(0, 0, 0, 0.1)",
                    marginBottom: "5.5rem",
                    marginLeft: "9%",
                    marginRight: "9%",
                    padding: "2rem"
                }}>
                    <i class="fas fa-exclamation-circle"></i> Not Available
                </div>
            }
        </div>
    )
}

export default HostLeaderboardList