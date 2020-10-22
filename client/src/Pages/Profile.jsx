import React from "react";
import UserInfo from "../Components/Profile/UserInfo";
import UserLiterature from "../Components/Profile/UserLiterature";

function Profile() {
  return (
    <div id="profilePage">
      <UserInfo />
      <br />
      <UserLiterature />
    </div>
  );
}

export default Profile;
