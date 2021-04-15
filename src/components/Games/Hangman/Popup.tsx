import React, {useEffect, useState} from 'react';
import {checkWin, playSounds} from './helpers';
/*import win from "../audio/win.mp3";
import lose from "../audio/lose.mp3";*/

function Popup ({selectedWordObj, correctLetters, wrongLetters, selectedWord, errors, playAgain, setIsStartGame}) {

  let finalMessage = '';
  let finalMessageRevealWord = '';
  let isStartGame = true;
  const gameResult = checkWin(correctLetters, wrongLetters, selectedWord, errors);
  console.log("selectedWordObj", selectedWordObj, gameResult);

  if (gameResult === 'win') {
    isStartGame = false;
    finalMessage = "Congratulations! You guessed the word correctly!"
    finalMessageRevealWord =`...the word was: ${selectedWord} - ${selectedWordObj.wordTranslate}`;

    if(selectedWord) {
      const rightAnswersFromStorage = JSON.parse(localStorage.getItem("rightAnswers")) || [];
      rightAnswersFromStorage.push(selectedWord);
      localStorage.setItem("rightAnswers", JSON.stringify(rightAnswersFromStorage));

      const rightObjFromStorage = JSON.parse(localStorage.getItem("rightObj")) || [];
      rightObjFromStorage.push(selectedWordObj);
      localStorage.setItem("rightObj", JSON.stringify(rightObjFromStorage));

      let trueAnswersFromStorage = parseInt(localStorage.getItem("trueAnswers")) || 0;
      trueAnswersFromStorage = parseInt(trueAnswersFromStorage) + 1;
      localStorage.setItem("trueAnswers", trueAnswersFromStorage);
    }
  /*  setRightAnswers([...rightAnswers, selectedWord]);
    setTrueAnswer(trueAnswer + 1);*/
    // playable = false;
    // isAudioPlaying && playSounds(win);
    // setIsAudioPlaying(false);

  }

  if (gameResult === 'lose') {
    isStartGame = false;
    finalMessage = "Unfortunately you lost :(";
    finalMessageRevealWord = `...the word was: ${selectedWord} - ${selectedWordObj.wordTranslate}`;

    const wrongAnswersFromStorage = JSON.parse(localStorage.getItem("wrongAnswers")) || [];
    wrongAnswersFromStorage.push(selectedWord);
    localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswersFromStorage));

    const wrongObjFromStorage = JSON.parse(localStorage.getItem("wrongObj")) || [];
    wrongObjFromStorage.push(selectedWordObj);
    localStorage.setItem("wrongObj", JSON.stringify(wrongObjFromStorage));

    let falseAnswersFromStorage = parseInt(localStorage.getItem("falseAnswers")) || 0;
    console.log("falseAnswersFromStorage", typeof falseAnswersFromStorage);
    falseAnswersFromStorage = parseInt(falseAnswersFromStorage) + 1;
    console.log("falseAnswersFromStorage", typeof falseAnswersFromStorage);
    localStorage.setItem("falseAnswers", falseAnswersFromStorage);

    /*setWrongAnswers([...wrongAnswers, selectedWord]);
    setFalseAnswer(falseAnswer + 1);*/
    // playable = false;
    // isAudioPlaying && playSounds(lose);
    // setIsAudioPlaying(false);
  }

  useEffect(() => {console.log("isStartGame", isStartGame); setIsStartGame(isStartGame)});

  return(
    <div className="popup-container" style={finalMessage !== '' ? {display: 'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Next word</button>
      </div>
    </div>
  )
};

export default Popup



