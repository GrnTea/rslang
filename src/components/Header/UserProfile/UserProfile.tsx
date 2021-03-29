import React, {useState} from "react";
import UserInfo from "./UserInfo/UserInfo";
import SignInButton from "../../Authorisation/SignInButton/SignInButton";

function UserProfile() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div>
      {isLoggedIn
        ? <UserInfo/>
        : <SignInButton/>
      }
    </div>
  )
}

export default UserProfile
