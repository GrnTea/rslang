import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import GameStatCard from "./GameStatCard/GameStatCard";
import "./styles.scss";

const getOverallPercent = (stat) => {
  const rightAnswers = stat.reduce((acc, itm) => acc + itm.rightAnswers, 0);
  const wrongAnswers = stat.reduce((acc, itm) => acc + itm.wrongAnswers, 0);
  return Math.round((rightAnswers / (rightAnswers + wrongAnswers)) * 100);
};

const DailyStat = ({ user, stat }) => {
  if (stat.length) {
    return <div>
      <h1>{"Today"}</h1>
      <div>
        <i className={"icon icon__study"}></i>
        <span>{`Words learned: ${stat.reduce((acc, itm) => acc + itm.learnedWords, 0)}`}</span>
      </div>
      <div>{`Correct answers: ${getOverallPercent(stat)}%`}</div>
      <div>{"Games activity:"}</div>
      {stat.map((itm, idx) => <GameStatCard
        key={idx}
        stat={itm}
      />)}</div>;
  }
  return <div>
    <h1>{"Today"}</h1>
    <div>{"You haven't had activity today"}</div>
    <div>{"Play"} <Link component={RouterLink} to={"/games"}>games</Link> to earn score</div>
  </div>;
};

export default DailyStat;
