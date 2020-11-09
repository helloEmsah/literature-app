import React, { useContext } from "react";
import UserInfo from "../Components/Profile/UserInfo";
import { useQuery } from "react-query";
import { GlobalContext } from "../Context/GlobalContext";
import CardLiterature from "../Components/Literature/CardLiterature";
import { API } from "../Config/api";
import Spinner from "../Components/Utilities/Spinner";
import UserLiterature from "../Components/Profile/UserLiterature";

function Profile() {
  const [state, dispatch] = useContext(GlobalContext);


  

  return (
    <div id="profilePage">
      <UserInfo />
      <br />
      <UserLiterature />
    </div>
  );
}

export default Profile;
