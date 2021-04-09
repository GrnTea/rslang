import React, {useEffect, useState} from "react";
import { RootState } from "../../../redux/reducer";

import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import Button from "@material-ui/core/Button";
import "./GameHangmanStyles.scss";



const words = {
  fruits: ['apple', 'banana', 'grapes', 'pear', 'orange'],
  animals: ['cat', 'frog', 'dog', 'goat', 'elephant'],
  IT: ['application', 'programming', 'interface', 'function', 'wizard']
};

let topic = "animals";

function getWord(topic: string) {
  return words[topic][Math.floor(Math.random() * words[topic].length)]
}

let selectedWord = getWord(topic);
console.log("selectedWord", selectedWord);


function setFullScreen(){
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export default function GameHangman() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  console.log("selectedWord inside", selectedWord);

  useEffect(() => {
    const handleKeydown = event => {
      const {key, keyCode} = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        // isAudioPlaying && playSounds(click);

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter])
          } else {
            // show(setShowNotification);
            // isAudioPlaying && playSounds(note);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);

          } else {
            // show(setShowNotification);
            // isAudioPlaying && playSounds(note);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return() => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);


  return (
    <div className="hangman-container">
      <Figure wrongLetters={wrongLetters}/>
      <WrongLetters wrongLetters={wrongLetters}/>
      <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      <div className="hangman-fullscreen-button">
          <AspectRatioIcon
            onClick={setFullScreen}
            className="fullscreen-button-cursor"
            fontSize="large"
            color="primary"
          />
      </div>
    </div>
  )

};