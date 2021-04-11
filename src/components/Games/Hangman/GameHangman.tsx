import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import { RootState } from "../../../redux/reducer";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import "./GameHangmanStyles.scss";
import API_URL from "../../Constants/constants";
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
  const [wordsData, setWordsData] = useState([]);
  const [selectedWordObj, setSelectedWordObj] = useState({});
  const [selectedWord, setSelectedWord] = useState('');
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const { difficulty, page } = useParams();
  const dispatch = useDispatch();

  function getWords() {
    fetch(`${URL}words?group=${difficulty - 1}&page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        setIsLoaded(true);
        setWordsData(shuffle(result));
       })
  }

  useEffect(() => {
    getWords();
    console.log("isLoaded", isLoaded);
    console.log("shuffled", wordsData);
  }, []);

  let wordsAmount = wordsData.length;
  console.log("wordsData", wordsData);
  console.log("wordsAmount", wordsAmount);


  const gameInit = useCallback(() => {
    dispatch({type: "START_GAME"});


    if(wordsData.length) {
      const selectedWordObj1 = wordsData.pop();
      const selectedWord1 = selectedWordObj1["word"];


      console.log("selectedWordObj1", selectedWordObj1);
      console.log("selectedWord1", selectedWord1);


      /*setSelectedWordObj(selectedWordObj1);
      setSelectedWord(selectedWord1);
      console.log("selectedWordObj", selectedWordObj);
      console.log("selectedWord", selectedWord);*/
    }
  }, []);

  // gameInit();

  let wordsSelectedCounter = 0;


  useEffect(() => {
    const handleKeydown = (event: any) => {
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

  if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {

    return (
      <div>
        <div className="hangman-buttons">
          <div className="hangman-counter">{wordsSelectedCounter} / {wordsAmount}</div>
          <div className="hangman-start"  onClick={gameInit}>Start</div>
        </div>
        <div className="hangman-container">
          <Figure wrongLetters={wrongLetters}/>
          <WrongLetters wrongLetters={wrongLetters}/>
          {isStartGame && <Word selectedWord={selectedWord1} correctLetters={correctLetters}/>}
          <div className="hangman-fullscreen-button">
            <AspectRatioIcon
              onClick={setFullScreen}
              className="fullscreen-button-cursor"
              fontSize="large"
              color="primary"
            />
          </div>
        </div>
      </div>
    )
  }

};