import React from "react";
import ViewProfileFormat from "./ViewProfileFormat";

const ViewProfile = () => {
  return (
    <div>
      <ViewProfileFormat
        username="Hassaan1234"
        firstname="Hassaan"
        fullname="Hassaan Ahmed Waqar"
        lastname="Ahmad"
        dob="10th October, 1999"
        institution="Lahore Grammar School"
        password=""
      />
    </div>
  );
};

export default ViewProfile;
