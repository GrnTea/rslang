import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import { RootState } from "../../../redux/reducer";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import "./GameHangmanStyles.scss";
import API_URL from "../../Constants/constants";
import { showNotification as show, checkWin } from "./helpers";
import {useDispatch} from "react-redux";

const URL = API_URL;

function setFullScreen(){
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function shuffle(array: any) {
  return array.sort(() => Math.random() - 0.5);
}

export default function GameHangman() {
  const [isLoaded, setIsLoaded] = useState(false);
  //const [wordsData, setWordsData] = useState([]);
  //const [selectedWordObj, setSelectedWordObj] = useState({});
  const [selectedWord, setSelectedWord] = useState('');
  const [isStartGame, setIsStartGame] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const { difficulty, page } = useParams();
  const dispatch = useDispatch();
  let resultLength = 0,
      wordObj,
      wordsAmount = 0;

  function getWords() {
    fetch(`${URL}words?group=${difficulty - 1}&page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        resultLength = result.length;
        console.log("resultLength", resultLength);
        setIsLoaded(true);
        wordObj = shuffle(result).pop();
        setSelectedWord(wordObj.word);
        console.log(wordObj.word);
      })
  }

  useEffect(() => {
    getWords();
  }, []);

  function gameInit(){
    dispatch({type: "START_GAME"});
    setIsStartGame(true);
  }

  useEffect(() => {
    const handleKeydown = (event: any) => {
      const {key, keyCode} = event;

      if (isStartGame && selectedWord && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        // isAudioPlaying && playSounds(click);

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter])
          } else {
            show(setShowNotification);
            // isAudioPlaying && playSounds(note);
          }
        } else {
          console.log("selectedWord from letters", selectedWord);
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);

          } else {
            show(setShowNotification);
            // isAudioPlaying && playSounds(note);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return() => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, isStartGame]);


  const notification = (showNotification) => {
    return(
      <div className={`notification-container ${showNotification ? 'show' : ''}`}>
        <p>You have already entered this letter</p>
      </div>
    )
  };


  if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <div className="hangman-buttons">
          <div className="hangman-counter">{wordsAmount}  / {resultLength}</div>
          <div className="hangman-start"  onClick={gameInit}>Start</div>
        </div>
        <div className="hangman-container">
          <Figure wrongLetters={wrongLetters}/>
          <WrongLetters wrongLetters={wrongLetters}/>
          {isStartGame && <Word selectedWord={selectedWord} correctLetters={correctLetters}/>}
          <div className="hangman-fullscreen-button">
            <AspectRatioIcon
              onClick={setFullScreen}
              className="fullscreen-button-cursor"
              fontSize="large"
              color="primary"
            />
          </div>
          {notification(showNotification)}
        </div>
      </div>
    )
  }

};