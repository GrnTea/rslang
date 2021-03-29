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
  },
  logo: {
    // fontWeight: 600,
    textAlign: "center",
  },
  list: {
    width: "200px",
  },

  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
});

export default headerStyles;