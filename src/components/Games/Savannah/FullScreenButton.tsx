import React from "react";
import "./gameSavannah.css";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

const FullScreenButton = (props) => {
  const toggleFulscreen = () => {
    const elem = document.querySelector(".words-container");

    if (document.fullscreenElement === null) {
      // document.documentElement.requestFullscreen();
      elem.requestFullscreen();
    } else if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  };

  return (
    <AspectRatioIcon
      onClick={toggleFulscreen}
      className="fullscreen-button-cursor"
      fontSize="large"
      color="primary"
    />
  );
};

export default FullScreenButton;
