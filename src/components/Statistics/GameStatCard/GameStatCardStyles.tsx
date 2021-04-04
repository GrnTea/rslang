import { makeStyles } from "@material-ui/core";

const styles = makeStyles(
  {
    container: {
      maxWidth: 1200,
      margin: "0 auto",
    },
    img: {
      width: "100%",
      maxHeight: "150px",
      objectFit: "cover",
      position: "absolute",
      top: "0",
    },
    wrapper: {
      position: "relative",
      height: "150px",
      boxSizing: "border-box",
    },
    title: {
      position: "relative",
      zIndex: 1,
      margin: 0,
    },
    entry: {
      fontSize: "22px",
    },
  },
);

export default styles;
