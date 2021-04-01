import { makeStyles } from "@material-ui/core/styles";

const dictionaryStyles = makeStyles({
    dictionaryMenu: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
  },

  dictionaryMenuItem: {
      border: "none",
      background: "none",
      borderBottom: "3px solid #1665B4",
      fontWeight: "bold",
      color: "#1665B4",
      width: "32%",
      textAlign: "center",
      padding: "20px",
      fontSize: "23px",
      cursor: "pointer",
      outline: "none",
  },

  cards: {
    display: "flex",
    flexDirection: "column",
    rowGap: "3em",
  }
});

export default dictionaryStyles;
