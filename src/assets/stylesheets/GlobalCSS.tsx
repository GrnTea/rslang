import React from "react";
import { withStyles } from "@material-ui/core/styles";

const GlobalCss = withStyles({
  "@global": {
    ".MuiDrawer-paper": {
      width: "240px",
      paddingLeft: "36px",
      backgroundColor: "#3f51b5",
      color: "#fff",
    },
    ".MuiList-padding": {
      padding: "0",
    },
    "listLinkItem > .MuiListItem-root": {
      padding: "0",
    },
    ".MuiListItemText-root": {
      margin: "0",
    },
    ".MuiMenuItem-root": {
      margin: "8px 0",
    },
    ".MuiListItem-gutters": {
      paddingLeft: "0",
    },
  },
})(() => null);

export default GlobalCss;
