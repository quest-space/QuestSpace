import React from "react";
import RoundDetailsFormat from "./RoundDetailsFormat";
import Header from "./Header";
import MainNavbar from "./MainNavbar";

const RoundDetails = () => {
  return (
    <div>
      <MainNavbar />
      <Header
        heading="Round 1: Programming Contest"
        subheading="CodinGuru3.0"
      />
      <div className="col-md-12" style={{ margin: "0em", padding: "0em" }}>
        <div id="top" style={{ margin: "0em", padding: "0em" }}></div>
      </div>
      <RoundDetailsFormat
        roundname="Round 1: Programming Contest" /*Can use string concatenation here*/
        questname="CodinGuru3.0"
        startingtime="11:00 am, 21st March 2021"
        endingtime="11:00 am, 22nd March 2021"
        allowedtime="10 minutes"
        about="This is a Rapid Fire Round. In this round, you will have a fixed time in which you should try to attempt maximum number of questions with correct answers..
        You will not be able to go back and attempt a question again. Upon selecting an option, you will be redirected to the next question"
      />
    </div>
  );
};

export default RoundDetails;
