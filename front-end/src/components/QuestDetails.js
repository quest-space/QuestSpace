import React from "react";
import QuestDetailsFormat from "./QuestDetailsFormat";
import codinguru from "../img/testing/CodinGuru.png";
import Button from "./Button";
import Stack from "./Stack";



const QuestDetails = (props) => {
  const card= props.location.state
  
  const formatAMPM = (date) => {
    date = new Date(date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime + ', ' + date.toDateString();
  }

  const showError = (errors) => {
    alert(JSON.stringify(errors))
  }

  const requestQuest = async (id) => {
   
    const response = await fetch(`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/participant/quest/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
            username: 'userName',
            password: 'password',
        }),
    })

    console.log("response is",response)

    const responseBody = await response.json()

    if (response.status !== 200) {
        console.log(`Error in enrolment.`)
        showError(responseBody.errors)
    } else {
        console.log(`Successful enrolment.`)
        // user ? history.push("/participanthomepage") : history.push("/hosthomepage")

    }

}

  return (
    <div>
      <QuestDetailsFormat
        questname= {card.questName}
        hostname={card.hostUser}
        hostrating={card.rating}
        startingtime={formatAMPM(card.startTime)}
        endingtime= {formatAMPM(card.endTime)}
        type= {card.nature}
        about="CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor.CodinGuru is being organized at national level as students from different universities across Pakistan are invited to exhibit their coding skills. It is being supervised by Department of Computer Science, SSE, LUMS. ... CodinGuru 2020 is all set to be bigger, brighter and bolder than its predecessor."
        imgsrc={codinguru}
      />
      {/* brought this outside to implement flow of data on redirect */}
      <span className="responsive" style={{ float: "right", marginBottom:"3rem", marginRight:"10rem"}}>  
          <Stack button={<Button text="Enroll" class="btn3" link="" />} />
      </span>
    </div>
  );
};

export default QuestDetails;
