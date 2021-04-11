import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import codinguru from "../img/testing/CodinGuru.png";
import {Link} from "react-router-dom"


const QuestDetails = (props) => {
  const card= props.location.state
  console.log(card)
  return (
    <div>
      <QuestDetailsFormat
        questname= {card.questName}
        hostname={card.hostUser}
        hostrating={card.rating}
        startingtime={card.startTime}
        endingtime= {card.endTime}
        type= {card.nature}
        about="CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor.CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor."
        imgsrc={codinguru}
      />
    </div>
  );
};

export default QuestDetails;
