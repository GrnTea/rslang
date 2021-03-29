import { makeStyles } from "@material-ui/core/styles";


const headerStyles = makeStyles(
  {
  appBar: {
    backgroundColor: "#BBDDE1",
    padding: "0",
    color: "#FFFFFF",
    fontWeight: 700,
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "0 15px",
    backgroundColor: "#BBDDE1",

  },
  logo: {
    // fontWeight: 600,
    textAlign: "center",
  },

  drawerPaper: {
    backgroundColor: "red",
  },
  drawer: {
    width: "200px",
    '& > div': {
      padding: "10px",
    },
  },
  list: {

  },
  listLinkItem: {
    textDecoration: "none",
  },
  listMenuItem: {
    margin: "10px",

  },
  drawerContainer: {
    // padding: "20px 30px",
  },
});

export default headerStyles;