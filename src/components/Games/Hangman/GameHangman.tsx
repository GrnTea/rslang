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
  const [isStartGame, setIsStartGame] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);

  const { difficulty, page } = useParams();
  const dispatch = useDispatch();
  let resultLength;
  function getWords() {
    fetch(`${URL}words?group=${difficulty - 1}&page=${page}`)
      .then((response) => response.json())
      .then((result) => {
        resultLength = result.length;
        console.log("resultLength", resultLength);
        setIsLoaded(true);
        setWordsData(shuffle(result));
       })
  }

  useEffect(() => {
    getWords();
    /*console.log("isLoaded", isLoaded);
    console.log("shuffled", wordsData);*/
  }, []);

  const wordsAmount = wordsData.length;
  console.log("wordsData", wordsData);
  console.log("wordsAmount", wordsAmount);


  function gameInit(){
    //= useCallback(() => {
    dispatch({type: "START_GAME"});

    if(wordsData.length) {
      const selectedWordObj = wordsData.pop();
      const selectedWord = selectedWordObj["word"];
      setIsStartGame(true);

      setSelectedWordObj(selectedWordObj);
      setSelectedWord(selectedWord);
      console.log("selectedWordObj", selectedWordObj);
      console.log("selectedWord", selectedWord);
      /*console.log("wordsData from game start after state", wordsData);
      console.log("wordsAmount from game start after state", wordsAmount);*/
    }
  }//, []);

  // gameInit();

  let wordsSelectedCounter = 0;


  useEffect(() => {
    const handleKeydown = (event: any) => {
      const {key, keyCode} = event;

      if (isStartGame && keyCode >= 65 && keyCode <= 90) {
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
  }, [correctLetters, wrongLetters, isStartGame]);

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
        </div>
      </div>
    )
  }

};