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

const Points = ({ bonus, checkbox }: { bonus: number, checkbox: boolean[] }) => {
  const classes = useStyles();
  const x = bonus;
  const right = { color: green[500] };
  const wrong = "secondary";
  const disabled = "disabled";
  return (
    <div className="sprint__point">
      <div className={classes.root}>
        {checkbox.map((item, index) => (item
          ? <HomeIcon key={Date.now() + index} style={right} /> : <HomeIcon key={Date.now() + index} color={wrong} />))}
      </div>
      <div className="sprint__bonus">
        {bonus !== 0 && (<div> +{x} за слово </div>)}
      </div>
    </div>
  );
};

export default Points;
