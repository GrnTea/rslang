import { Link } from "@material-ui/core";
import React, { Fragment, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { RootState } from "../../redux/reducer";
import DailyStat from "./DailyStat";

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

testStat.forEach((itm) => { itm.date = (new Date()).getTime() });

type StatType = {
  learnedWords: Number,
  date: Number, //  (current time in UTCmiliseconds)
  gameId: String,
  rightAnswers: Number,
  wrongAnswers: Number,
  maxSerie: Number
}

const sendStat = async (stat: StatType, user) => {
  await fetch(`https://rslernwords.herokuapp.com/users/${user.id}/statistics`, {
    method: "POST",
    withCredentials: true,
    headers: {
      "Authorization": `Bearer ${user.token}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stat),
  });
};


const getDailyStat = async (user) => {
  const res = await fetch(`https://rslernwords.herokuapp.com/users/${user.id}/statistics`, {
    method: "GET",
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return [];
  }
  const stat = await res.json();
  //const stat = testStat;
  const cDate = new Date();
  const timeStart = cDate
    .setHours(0, 0, 0, 0);
  const timeEnd = cDate.setDate(cDate.getDate() + 1);
  return stat.filter((itm) => (itm.date >= timeStart)
    && (itm.date < timeEnd))
    .reduce((acc, itm) => {
      const gameStat = acc.find((stat) => itm.gameId === stat.gameId);
      if (gameStat) {
        gameStat.learnedWords += itm.learnedWords;
        gameStat.rightAnswers += itm.rightAnswers;
        gameStat.wrongAnswers += itm.wrongAnswers;
        gameStat.maxSerie = Math.max(itm.wrongAnswers, gameStat.maxSerie);
      } else {
        acc.push({
          gameId: itm.gameId,
          learnedWords: itm.learnedWords,
          rightAnswers: itm.rightAnswers,
          wrongAnswers: itm.wrongAnswers,
          maxSerie: itm.maxSerie,
        });
      }
      return acc;
    }, []);
};

const Statistics = ({ user }) => {
  if (!user.id || !user.token) {
    return <Fragment>
      <Typography variant="subtitle1">
        Statistics is available only after authorization
      </Typography>
      <Link component={RouterLink} to={"/signin"}>Sign In</Link>
      <br></br>
      <Link component={RouterLink} to={"/signup"}>Sign Up</Link>
    </Fragment>;
  }
  const [stat, setStat] = useState([]);
  useEffect(() => {
    getDailyStat(user).then((stat) => {
      setStat(stat);
    });
  }, []);
  return <Fragment >
    <DailyStat stat={stat} user={user} />
  </Fragment>;
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Statistics);
