import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import codinguru from "../img/testing/CodinGuru.png";

const QuestDetails = () => {
  return (
    <div>
      <QuestDetailsFormat
        hostname="IEEE LUMS"
        hostrating="3"
        startingtime="11:00 am, 21st March 2021"
        endingtime="11:00 am, 22nd March 2021"
        type="Public"
        about="CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor.CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor."
        imgsrc={codinguru}
      />
    </div>
  );
};

export default QuestDetails;
