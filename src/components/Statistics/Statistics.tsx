import { Link, CircularProgress } from "@material-ui/core";
import React, { Fragment, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import { RootState } from "../../redux/reducer";
import DailyStat from "./DailyStat";
import "./styles.scss";

type StatType = {
  learnedWords: Number,
  date: Number, //  (current time in UTCmiliseconds)
  gameId: String,
  rightAnswers: Number,
  wrongAnswers: Number,
  maxSerie: Number
}

const getStat = async (user) => {
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
  return stat;
};

const getDailyStat = (stat) => {
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getStat(user).then((stat) => {
      const dailyStat = getDailyStat(stat);
      setLoading(false);
      setStat(dailyStat);
    });
  }, []);
  return loading
    ? <CircularProgress size={128} className="progress" />
    : <Fragment >
      <DailyStat stat={stat} user={user} />
    </Fragment>;
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Statistics);
