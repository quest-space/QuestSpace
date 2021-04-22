import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import Header from "./Header";
import MainNavbar from "./MainNavbar";
import codinguru from ".././img/testing/CodinGuru.png";
import BreadCrumb from "./BreadCrumb";

const QuestDetails = () => {
  return (
    <div>
      <MainNavbar />
      <Header heading="CodinGuru 3.0" subheading="IEEE LUMS" />
      <BreadCrumb
        items={[
          { text: "Home", to: "/participanthomepage" },
          {
            text: "CodinGuru3.0",
            //text: props.x.quest.questName,
            // Abhi ke liye, will fix it with APIs
            to: `/questdetails`,
          },
        ]}
      />
      <QuestDetailsFormat
        left="9%"
        right="9%"
        top="5.5rem"
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
