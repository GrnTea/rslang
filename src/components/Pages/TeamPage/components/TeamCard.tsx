import React from "react";
import TeamStyles from "../TeamCardStyles";

interface UserInfo {
    userInfo: any
}

const TeamCard = ({ userInfo }:UserInfo) => {
  const useStyles = TeamStyles();
  
  return (
    <div className={useStyles.userCardContainer}>
        <img className={useStyles.userImg} src={userInfo.userImg} alt={userInfo.userName} />
        <div className={useStyles.userDetails} >
            <h2 className={useStyles.userName}>{userInfo.userName}</h2>
            <p className={useStyles.userDescription}>{userInfo.userDescription}</p>
            <div className={useStyles.userLink}>
                <a href={userInfo.userGitHub}><img className={useStyles.githubImg} src="./assets/images/github.svg"/></a>
            </div>
        </div>
    </div>
  );
};

export default TeamCard;
