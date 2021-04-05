import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../assets/images/bgimage.jpg";

const mainStyles = makeStyles({
    wrapper: {
      background: `no-repeat url(${bgImage}) fixed`,
      backgroundPosition: "center",
      overflow: "hidden",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "10px 7%",
    },
    description: {
      padding: "20px",
      margin: "20px",
      backgroundColor: "rgba(255,255,255,0.4)",
      borderRadius: "10px",
      color: "#1639B4",
    },
});

export default mainStyles;