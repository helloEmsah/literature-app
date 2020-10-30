import React, { useContext } from "react";
import UserInfo from "../Components/Profile/UserInfo";
import { useQuery } from "react-query";
import { GlobalContext } from "../Context/GlobalContext";
import CardLiterature from "../Components/Literature/CardLiterature";
import { API } from "../Config/api";
import Spinner from "../Components/Utilities/Spinner";

function Profile() {
  const [state, dispatch] = useContext(GlobalContext);

  const userId = localStorage.getItem("id");

  const { isLoading, data: literatureProfile } = useQuery("getUserBooks", () =>
    API.get(`/user/${userId}/literature`)
  );

  console.log(literatureProfile);

  return (
    <div id="profilePage">
      <UserInfo />
      <br />
      {isLoading ? (
        <Spinner />
      ) : (
        <CardLiterature
          loading={isLoading}
          dataLiterature={literatureProfile.data.data.literature}
        />
      )}
    </div>
  );
}

export default Profile;
