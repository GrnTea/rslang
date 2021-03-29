import React from "react";
import { withStyles } from '@material-ui/core/styles';


const GlobalCss = withStyles({
  "@global": {
    ".MuiDrawer-paper": {
      backgroundColor: "#BBDDE1",
    },
  },
})(() => null);

export default GlobalCss;