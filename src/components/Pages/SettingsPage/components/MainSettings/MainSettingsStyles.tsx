import { makeStyles } from "@material-ui/core/styles";

const mainSettingsStyles = makeStyles({
  mainSettingsContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: "2em",
  },

  "MuiFormLabel-root": {
    marginBottom: "50px!important",
  },

  formControlLang: {
    minWidth: 200,
    maxWidth: "200px",
  },

  daylySettingsBtn: {
    backgroundColor: "#1665B4!important",
    fontWeight: "bold",

    "&:hover": {
      backgroundColor: "#2687e7!important",
    },
  },

  dailySettings: {
    display: "flex",
    flexDirection: "column",
    rowGap: "1em",
    marginTop: "1em",
  },

  dailySettingsBtnGroup: {
    display: "flex",
    flexDirection: "row",
    columnGap: "1em",
    alignItems: "center",
    fontWeight: "bold",
  },

  switchBase: {
    color: "#1665B4!important",
  },
});

export default mainSettingsStyles;
