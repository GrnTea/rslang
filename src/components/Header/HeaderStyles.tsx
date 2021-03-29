import { makeStyles } from "@material-ui/core/styles";


const headerStyles = makeStyles(
  {
 /* header: {
    backgroundColor: "#BBDDE1",
  },*/
  header: {
    backgroundColor: "#BBDDE1",
    paddingLeft: "0",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "0",
  },
  logo: {
    fontWeight: 600,
    color: "#FFFFFF",
    textAlign: "center",
  },
  menuButton: {
    fontWeight: 700,
    size: "18px",
    marginLeft: "30px",
  },
  list: {
    width: "130px",
  },
    listItem: {
    color: "yellow",
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