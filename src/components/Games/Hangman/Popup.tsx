import React, {useEffect, useState} from 'react';
import {checkWin, playSounds} from './helpers';
/*import win from "../audio/win.mp3";
import lose from "../audio/lose.mp3";*/

function Popup ({selectedWordObj,
                  correctLetters,
                  wrongLetters,
                  selectedWord,
                  errors,
                  playAgain,
                  setIsStartGame}) {

  let finalMessage = '';
  let finalMessageRevealWord = '';
  let isStartGame = true;
  const gameResult = checkWin(correctLetters, wrongLetters, selectedWord, errors);

  if (gameResult === 'win') {
    isStartGame = false;
    finalMessage = "Congratulations! You guessed the word correctly!"
    finalMessageRevealWord =`...the word was: ${selectedWord} - ${selectedWordObj.wordTranslate}`;

    if(selectedWord) {
      const rightObjFromStorage = JSON.parse(localStorage.getItem("rightObj")) || [];
      rightObjFromStorage.push(selectedWordObj);
      localStorage.setItem("rightObj", JSON.stringify(rightObjFromStorage));
    }

    // playable = false;
    // isAudioPlaying && playSounds(win);
    // setIsAudioPlaying(false);
  }

  if (gameResult === 'lose') {
    isStartGame = false;
    finalMessage = "Unfortunately you lost :(";
    finalMessageRevealWord = `...the word was: ${selectedWord} - ${selectedWordObj.wordTranslate}`;

    const wrongObjFromStorage = JSON.parse(localStorage.getItem("wrongObj")) || [];
    wrongObjFromStorage.push(selectedWordObj);
    localStorage.setItem("wrongObj", JSON.stringify(wrongObjFromStorage));

    // playable = false;
    // isAudioPlaying && playSounds(lose);
    // setIsAudioPlaying(false);
  }

  useEffect(() => {setIsStartGame(isStartGame)});

  return(
    <div className="popup-container" style={finalMessage.length ? {display: 'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Next</button>
      </div>
    </div>
  )
};

export default Popup



