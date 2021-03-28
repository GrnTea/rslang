import { makeStyles } from "@material-ui/core/styles";

const mainSettingsStyles = makeStyles({
    "mainSettingsContainer": {
        display: "flex",
        flexDirection: "column",
        rowGap: "1em"
    },

    "formControl": {
        minWidth: 200,
    },

    "daylySettingsBtn": {
        backgroundColor: "#1665B4!important",        
        fontWeight: "bold",

        "&:hover": {
            backgroundColor: "#2687e7!important",
        }
    },

    "dailySettings": {
        display: "flex",
        flexDirection: "column",
        rowGap: "1em",
        marginTop: "1em",
    },

    "dailySettingsBtnGroup": {
        display: "flex",
        flexDirection: "row",
        columnGap: "1em",
        alignItems: "center",
        fontWeight: "bold"
    },

    "switchBase": {
        color: "#1665B4!important",
    },
});

export default mainSettingsStyles;