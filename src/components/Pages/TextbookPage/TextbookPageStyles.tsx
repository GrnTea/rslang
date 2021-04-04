import {makeStyles} from "@material-ui/core";

const textbookStyles = makeStyles({
  textbookTitle : {
    margin: "10px 0",
  },
  settingsIcon: {
    width: "32px",
    height: "32px",
    marginTop: "3px",
  },
  textbookSectionTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    padding: "0 10px",
  },
});

export default textbookStyles;