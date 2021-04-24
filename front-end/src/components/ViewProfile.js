import React from "react";
import ViewProfileFormat from "./ViewProfileFormat";
import ViewProfileFormatHost from "./ViewProfileFormatHost";

const ViewProfile = () => {
  const [response, setResponse] = React.useState({});
  const [userString, setuserString] = React.useState("");
  const [render, setRender] = React.useState(false);

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const ProfileAPI = async () => {
    const checkResp = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/who-am-i`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
      }
    );

    const checkRespBody = await checkResp.json();
    console.log("response", checkRespBody);
    setuserString(checkRespBody.type);
    //setuserString("host");
    console.log("Userstring: ", userString);

    const response = await fetch(
      //`http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/host/profile`,
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/${userString}/profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: "HassaanAW",
          password: "hassaan123",
        }),
      }
    );

    console.log("response is", response);

    const responseBody = await response.json();
    console.log("response", responseBody);
    setResponse(responseBody);

    if (response.status !== 200) {
      console.log(`Error in enrolment.`);
      showError(responseBody.errors);
    } else {
      console.log(`Profile Viewed.`);
    }
  };

  ProfileAPI();

  if (!render) {
    setRender(true);
  }

  return (
    <div>
      {userString === "participant" && (
        <ViewProfileFormat
          username={response.username}
          firstname={response.firstname}
          fullname={response.fullname}
          lastname={response.lastname}
          dob={response.dateofbirth}
          institution={response.organization}
          passwordlength={response.passwordlength}
          /*
        username="Hassaan1234"
        firstname="Hassaan"
        fullname="Hassaan Ahmed Waqar"
        lastname="Ahmad"
        dob="10th October, 1999"
        institution="Lahore Grammar School"
        password="123456"
        */
        />
      )}

      {userString === "host" && (
        <ViewProfileFormatHost
          username={response.username}
          repdesignation={response.representativeDesignation}
          repname={response.representativeName}
          phone={response.phone}
          rating={response.rating}
          institution={response.organization}
          passwordlength={response.passwordlength}
          //passwordlength={response.passwordlength}

          /*
          username={"IEEE LUMS"}
          repdesignation={"Member"}
          repname={"Hareem Raza"}
          phone={3004155276}
          rating={4}
          institution={"LUMS"}
          passwordlength={10}
          */
        />
      )}
    </div>
  );
};

export default ViewProfile;
