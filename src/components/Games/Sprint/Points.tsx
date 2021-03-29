import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    "& > svg": {
      margin: theme.spacing(2),
    },
  },
}));

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Points = ({ bonus } : {bonus: number}) => {
  const classes = useStyles();
  const x = bonus;
  return (
    <div>
      <div className={classes.root}>
      <HomeIcon color="secondary" />
      <HomeIcon style={{ color: green[500] }} />
      <HomeIcon color="disabled" />
    </div>
      <div className="sprint__bonus">
      {bonus !== 0 && (<div> +{x} </div>)}
    </div>
    </div>
  );
};

export default Points;
