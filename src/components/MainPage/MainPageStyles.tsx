import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../assets/images/main/bg.svg";

const mainStyles = makeStyles({
  wrapper: {
    // background: `no-repeat url(${bgImage}) fixed`,
    // backgroundPosition: "center",
    // backgroundSize: "cover",
    overflow: "hidden",
  },
  title: {
    boxSizing: "border-box",
  },
  card: {
    padding: "15px",
    margin: "30px 0",
    "&:hover": {
      boxShadow: "-1px 10px 29px 0px rgba(0,0,0,0.8)",
    },
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "10px 7%",
  },
  links: {
    display: "inline-block",
    margin: "10px",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid silver",
    borderRadius: "5px",
    textDecoration: "none",
    color: "#1639B4",
    fontSize: "20px",
    fontFamily: "sans-serif",
    '&:hover': {
      backgroundColor: "#1639B4",
      color: "#fff",
    },
  },
  description: {
    padding: "20px",
    margin: "20px",
    //backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: "10px",
    color: "#1639B4",
  },
});

export default mainStyles;