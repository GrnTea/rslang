import {makeStyles} from "@material-ui/core";

const sectionStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "wrap",
    height: "72vh",
  },
  sectionTitle: {
    margin: "10px 0",
    padding: "10px",
  },
  sectionLink: {
    textDecoration: "none",
    color: "#2980b9",
    fontWeight: 600,
    margin: "13px auto",
    "&:hover": {
      cursor: "pointer",
      color: "#1010B9",
    },
    "&:visited": {
      textDecoration: "none",
    }
  },

});

export default sectionStyles;