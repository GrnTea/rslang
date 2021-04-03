import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer";
import GameStatCard from "./GameStatCard/GameStatCard";
import img from "../../assets/images/games/Savanna/bg.jpg";

const testStat = [
  {
    _id: "6065f28180cb9659000dbf4a",
    userId: "6065e5e773774f14d0af1833",
    learnedWords: 10,
    date: 1617310804000,
    gameId: "1",
    rightAnswers: 5,
    wrongAnswers: 7,
    maxSerie: 3,
    __v: 0
  },
  {
    _id: "6067334ab95b261038625b10",
    userId: "6065e5e773774f14d0af1833",
    learnedWords: 15,
    date: 1617310806000,
    gameId: "1",
    rightAnswers: 8,
    wrongAnswers: 10,
    maxSerie: 5,
    __v: 0
  },
  {
    _id: "6067334ab95b261038625b11",
    userId: "6065e5e773774f14d0af1833",
    learnedWords: 12,
    date: 1617310800500,
    gameId: "1",
    rightAnswers: 9,
    wrongAnswers: 10,
    maxSerie: 5,
    __v: 0
  },
  {
    _id: "6067334ab95b261038625b12",
    userId: "6065e5e773774f14d0af1833",
    learnedWords: 9,
    date: 1617310800000,
    gameId: "2",
    rightAnswers: 2,
    wrongAnswers: 10,
    maxSerie: 5,
    __v: 0
  }
];

testStat.forEach((itm) => {itm.date = (new Date()).getTime()});

const getDailyStat = async (user) => {
  /*   const rawData = await fetch(`https://rslernwords.herokuapp.com/users/${user.id}/statistics`, {
      method: "GET",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!rawData) {
      return null;
    }
    const stat = await rawData.toJSON(); */
  const stat = testStat;
  const cDate = new Date();
  const timeStart = cDate
    .setHours(0, 0, 0, 0);
  const timeEnd = cDate.setDate(cDate.getDate() + 1);
  console.log(timeStart, timeEnd);
  return stat.filter((itm) => (itm.date >= timeStart)
    && (itm.date < timeEnd))
    .reduce((acc, itm) => {
      const gameStat = acc[itm.gameId];
      if (gameStat) {
        gameStat.learnedWords += itm.learnedWords;
        gameStat.rightAnswers += itm.rightAnswers;
        gameStat.wrongAnswers += itm.wrongAnswers;
        gameStat.maxSerie = Math.max(itm.wrongAnswers, gameStat.maxSerie);
      } else {
        acc[itm.gameId] = {
          learnedWords: itm.learnedWords,
          rightAnswers: itm.rightAnswers,
          wrongAnswers: itm.wrongAnswers,
          maxSerie: itm.maxSerie,
        };
      }
      return acc;
    }, {});
};

const renderGameStat = (gameId, gameStat) => <div key={gameId}>
  <h2>{gameId}</h2>
  {Object.keys(gameStat).map((key) => <div key={key}>
    <span>{`${key}: `}</span>
    <span>{gameStat[key]}</span>
  </div>)}
</div>;

const DailyStat = ({ user }) => {
  const [stat, setStat] = useState({});
  useEffect(() => {
    console.log('getDailyStat');
    getDailyStat(user).then((res) => {
      console.log(res);
      setStat(res);
    });
  }, []);
  useEffect(() => {
    console.log(Object.keys(stat).map((key) => console.log(key, stat[key])));
  }, [stat]);
  return <div>{Object.keys(stat).map((key) => <GameStatCard
    key={key}
    gameName={key}
    stat={stat[key]}
    img={img}
    />)}</div>;
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DailyStat);
