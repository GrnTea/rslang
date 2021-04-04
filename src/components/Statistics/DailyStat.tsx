import React, { useState, useEffect } from "react";
import GameStatCard from "./GameStatCard/GameStatCard";
import "./styles.scss";

const getOverallPercent = (stat) => {
  const rightAnswers = stat.reduce((acc, itm) => acc + itm.rightAnswers, 0);
  const wrongAnswers = stat.reduce((acc, itm) => acc + itm.wrongAnswers, 0);
  return Math.round((rightAnswers / (rightAnswers + wrongAnswers)) * 100);
}

const DailyStat = ({ user, stat }) => <div>
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

export default DailyStat;
