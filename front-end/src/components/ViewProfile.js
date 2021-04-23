import React from "react";
import ViewProfileFormat from "./ViewProfileFormat";

const ViewProfile = () => {
  const [response, setResponse] = React.useState({});
  const [userString, setuserString] = React.useState("");

  const showError = (errors) => {
    alert(JSON.stringify(errors));
  };

  const ProfileAPI = async () => {
    const checkResp = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/api/check`,
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

    const response = await fetch(
      `http://ec2-13-233-137-233.ap-south-1.compute.amazonaws.com/apitest/${userString}/profile`,
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

  return (
    <div>
      <ViewProfileFormat
        username={response.username}
        firstname={response.firstname}
        fullname={response.fullname}
        lastname={response.lastname}
        dob={response.dateofbirth}
        institution={response.organization}
        password={response.password}

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
    </div>
  );
};

export default ViewProfile;
