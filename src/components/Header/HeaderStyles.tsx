import { makeStyles } from "@material-ui/core/styles";


const headerStyles = makeStyles(
  {
  appBar: {
    backgroundColor: "#BBDDE1",
    color: "#FFFFFF",
    fontWeight: 700,
    padding: "0",

  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0 15px",

  },
  logo: {
    textAlign: "center",
  },

  drawer: {
    width: "300px",
    '& > div': {
      padding: "10px",
    },
  },
  list: {
    padding: "0",
    color: "#FFFFFF",
  },
  listLinkItem: {
    textDecoration: "none",
    color: "#FFFFFF",
    padding: "10px 0",
    marginTop: "5px",
  },
  collapsedList: {
    color: "#FFFFFF",
    margin: "0",
    paddingRight: "32px",
  },

  listLinkItemSection: {
    color: "#3f51b5",
    fontWeight: 700,
    lineHeight: 0.7,
  },
  listLinkItemLearn: {
    paddingTop: "0",
    paddingBottom: "0",
  },
});

export default headerStyles;