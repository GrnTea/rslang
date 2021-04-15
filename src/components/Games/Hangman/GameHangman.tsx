import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import { RootState } from "../../../redux/reducer";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import "./GameHangmanStyles.scss";
import API_URL from "../../Constants/constants";
import { showNotification as show, checkWin, playSounds } from "./helpers";
import {useDispatch} from "react-redux";
import Popup from "./Popup";
import SelectLevel from "./SelectLevel";
import ResetGame from "./ResetGame";

const URL = API_URL;


interface ICurrentWord {
  word: string,
  checkTranslate: string,
  wordTranslate: string,
  isTrueTranslate: boolean,
  id?: string,
  _id?: string,
  audio: string,
}

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
  const [resultLength, setResultLength] = useState(0);
  const [wordsCounter, setWordsCounter] = useState(0);
  const [selectedWordObj, setSelectedWordObj] = useState({});
  const [errors, setErrors] = useState("");
  const [selectedWord, setSelectedWord] = useState("");
  const [isStartGame, setIsStartGame] = useState(false);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);


  const { difficulty, page } = useParams();
  const dispatch = useDispatch();
  let wordObj;

  function getWords() {
    //fetch(`${URL}words?group=${difficulty - 1}&page=${page}`)
    fetch(`${URL}words/5e9f5ee35eb9e72bc21af4a0`)
      .then((response) => response.json())
      .then((result) => {
        setResultLength(result.length);
        console.log("resultLength", resultLength);
        setIsLoaded(true);
        setWordsData(result);
        // wordObj = shuffle(result).pop();
        wordObj = [result].pop();
        setSelectedWordObj(wordObj);
        setSelectedWord(wordObj.word);

        console.log(wordObj.word);
        console.log(wordsData);

      })
  }

  useEffect(() => {
    getWords();
  }, []);

  function gameInit(errors){
    if (errors === ""){
      alert('Select maximum number of possible mistakes!');
    } else {
      dispatch({type: "START_GAME"});
      setIsStartGame(true);
      setWordsCounter(wordsCounter + 1);
    }
    console.log("selectedWordObj", selectedWordObj);
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

  function resetGame() {
    setResultLength(0);
    setWordsCounter(0);
    setIsLoaded(false);
    setWordsData([]);
    setSelectedWordObj({});
    setSelectedWord("");
    setCorrectLetters([]);
    setWrongLetters([]);
    getWords()
  }

  function getStat() {
    const rightAnswers = JSON.parse(localStorage.getItem('rightObj'));
    const wrongAnswers = JSON.parse(localStorage.getItem('wrongObj'));

    return (
      <ResetGame
        maxSerie={rightAnswers.length}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
        resetgame={resetGame}
        gameId={"4"}
      />
    )
  }

  function playAgain(){
    if (wordsData.length) {
    wordObj = wordsData.pop();
    setSelectedWordObj(wordObj);
    setSelectedWord(wordObj.word);
    setWordsCounter(wordsCounter + 1);

    console.log("wordsData game", wordsData);
    console.log("selected word game", selectedWord);
    setIsStartGame(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    } else {
      console.log("finish");
      //statistics
      getStat();
    }
    //setIsAudioPlaying(false);
    // window.location.reload();
    //setStatistics();
    console.log("selectedWordObj", selectedWordObj);
  }

  if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <div className="hangman-buttons">
          <div className="hangman-counter">{wordsCounter}  / {resultLength}</div>
          <div className="hangman-start" onClick={() => gameInit(errors)}>Start</div>
          <SelectLevel setErrors={setErrors} />
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
          {!!checkWin(correctLetters, wrongLetters, selectedWord, errors).length
          && <Popup
            selectedWordObj={selectedWordObj}
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            selectedWord={selectedWord}
            errors={errors}
            playAgain={playAgain}
            setIsStartGame={setIsStartGame}
            // isAudioPlaying={isAudioPlaying}
            // setIsAudioPlaying={setIsAudioPlaying}
          />}
          {notification(showNotification)}
        </div>
      </div>
    )
  }

};