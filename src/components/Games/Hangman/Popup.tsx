import React, {useEffect, useState} from 'react';
import {checkWin, playSounds} from './helpers';
/*import win from "../audio/win.mp3";
import lose from "../audio/lose.mp3";*/

function Popup({correctLetters, wrongLetters, selectedWord, errors, playAgain,
                 /*setPlayable, isAudioPlaying, setIsAudioPlaying: setIsAudioPlaying*/}) {

  const [trueAnswer, setTrueAnswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  let finalMessage = '';
  let finalMessageRevealWord = '';
  // let playable = true;


    // setRightAnswers([...rightAnswers, selectedWord]);
    // setTrueAnswer(trueAnswer + 1);


  if (checkWin(correctLetters, wrongLetters, selectedWord, errors) === 'win') {
    finalMessage = 'Congratulations! You guessed the word correctly!';


   /* setRightAnswers([...rightAnswers, selectedWord]);
    setTrueAnswer(trueAnswer + 1);*/
    // playable = false;
    // isAudioPlaying && playSounds(win);
    // setIsAudioPlaying(false);

  } else if (checkWin(correctLetters, wrongLetters, selectedWord, errors) === 'lose') {
    finalMessage = 'Unfortunately you lost :(';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    /*setWrongAnswers([...wrongAnswers, selectedWord]);
    setFalseAnswer(falseAnswer + 1);*/
    // playable = false;
    // isAudioPlaying && playSounds(lose);
    // setIsAudioPlaying(false);
  }

  // useEffect(() => setPlayable(playable));

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



