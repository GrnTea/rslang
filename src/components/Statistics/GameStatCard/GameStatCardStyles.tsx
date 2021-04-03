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
    },
    title: {
      position: "absolute",
    },
  },
);

export default styles;
