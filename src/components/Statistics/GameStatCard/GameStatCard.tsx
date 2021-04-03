import React, { useState } from "react";
import styles from "./GameStatCardStyles";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Grid, Paper } from "@material-ui/core";


const getPercent = (stat) => Math.round((stat.rightAnswers / (stat.rightAnswers + stat.wrongAnswers)) * 100);

const GameStatCard = ({ stat, img }) => {
  console.log(stat);
  const classes = styles();
  return <Grid container spacing={3} className={classes.container}>
    <Grid item xs={12}>
      <Paper>
        <Grid container>
          <Grid item xs={6}>
            <span className={classes.title}>{stat.gameId}</span>
            <img src={img} className={classes.img}></img>
          </Grid>
          <Grid item xs={6}>
              <div>
                <span>{"Words learned: "}</span>
                <span>{stat.learnedWords}</span>
              </div>
              <div>
                <span>{"Correct answers: "}</span>
                <span>{`${getPercent(stat)}%`}</span>
              </div>
              <div>
                <span>{"Maximum serie of right answers: "}</span>
                <span>{stat.maxSerie}</span>
              </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
}

export default GameStatCard;
