import React, {useState} from "react";
import userInfoStyles from "./UserInfoStyles";

import userLogo from "../../../../assets/icons/user_default_logo.svg";


function UserInfo() {

  const { userInfo } = userInfoStyles();


  return (
    <div className={userInfo}>
      <span>UserName</span>
      <img src={userLogo} alt=""/>
    </div>
  )
}

export default UserInfo
