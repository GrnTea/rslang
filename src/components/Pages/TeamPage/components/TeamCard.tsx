import React from "react";
import TeamStyles from "../TeamCardStyles";
import github from "../../../../assets/images/github.svg";

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
                <a href={userInfo.userGitHub}><img className={useStyles.githubImg} src={github}/></a>
            </div>
        </div>
    </div>
  );
};

export default TeamCard;
