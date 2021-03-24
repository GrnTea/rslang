import { makeStyles } from "@material-ui/core/styles";

const mainSettingsStyles = makeStyles({
    "mainSettingsContainer": {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "column",
        rowGap: "3em"
    },

    "formControl": {
        minWidth: 200,
    },

    "daylySettingsBtn": {
        backgroundColor: "#1665B4!important",

        "&:hover": {
            backgroundColor: "#2687e7!important",
        }
    },

    "dailySettings": {
        display: "flex",
        flexDirection: "column",
        rowGap: "1em",
        marginTop: "1em"
    },

    "dailySettingsBtnGroup": {
        display: "flex",
        flexDirection: "row",
        columnGap: "1em",
        alignItems: "center"
    }
});

export default mainSettingsStyles;