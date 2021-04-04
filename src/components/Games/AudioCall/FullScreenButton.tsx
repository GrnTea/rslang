import React from "react";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

const FullScreenButton = (props) => {

  const toggleFulscreen = () => {
    let elem = document.querySelector(".game-body-container");
    
    if(document.fullscreenElement === null) {
      // document.documentElement.requestFullscreen();
      elem.requestFullscreen();
    } else {
      if(document.fullscreenEnabled){
        document.exitFullscreen();
      }
    }
  }

  // let fullscreenButtonStyles = {
  //   backgroundColor: '#3498db', 
  //   color: 'white',
  //   cursor: 'pointer',
  //   margin: '0 auto'
  // }

  return (
    <AspectRatioIcon 
      // style={{...fullscreenButtonStyles}}
      onClick={toggleFulscreen} 
      className="fullscreen-button-cursor" 
      fontSize="large" 
      color="primary" 
    /> 
  )
}

export default FullScreenButton;