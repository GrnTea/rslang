import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Statistics from "./Statistics";

const styles = makeStyles({
  container: {
    maxWidth: "1024px",
    margin: "132px auto 64px auto",
    fontSize: "22px",
  },
});

const Main = () => {
  const classes = styles();
  return <div className={classes.container}>
    <Statistics />
  </div>
};

export default Main;
