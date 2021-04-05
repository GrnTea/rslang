import {makeStyles} from "@material-ui/core/styles";

const appStyles = makeStyles({
    mainContent: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: "60px 0 0",
      minHeight: "calc(100% - 44px)",
    },
});

export default appStyles;
