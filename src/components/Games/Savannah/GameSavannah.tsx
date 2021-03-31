import { Drawer } from '@material-ui/core';
import React, {useState, useEffect, useRef} from 'react';
import ResetGame from './ResetGame';
import {
  useParams,
} from "react-router-dom";
import './gameSavannah.css';

import succes from '../../../assets/sound/succes.mp3';
import error from '../../../assets/sound/error.mp3';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

const URL = 'https://rslernwords.herokuapp.com/';

export default function GameSavannah() {
  const { num } = useParams();
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [displayWords, setDisplayWords] = useState([]);
  let [gravityCounter, setGravityCounter] = useState(0);
  let [lifeCounter, setLifeCounter] = useState(2);
  
  let [rightAnswersCounter, setRightAnswersCounter] = useState(0);
  let [wrongAnswersCounter, setWrongAnswersCounter] = useState(0);

  let [rightAnswers, setRightAnswers] = useState([]);
  let [wrongAnswers, setWrongAnswers] = useState([]);

  let [endGame, setEndGame] = useState(false);
  let [wordsDisplayedOnTheScreen, setWordsDisplayedOnTheScreen] = useState('');

  function initGame() {
    fetch(`${URL}words?group=${num - 1}&page=1`)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      const dataShuffle = shuffle(jsonData);
      
      setWord(dataShuffle.pop());
      setData(dataShuffle);
     })
  }

  useEffect(() => {
    initGame();
  }, []);


  useEffect(() => {
    if(counter === 0) return;

    setWord(data.pop());
    setData(data);
  }, [counter]);


  // запушить новую пачку слов в стейт для отображения на экране
  useEffect(() => {
    let res = data.filter((elem, index) => {
      if(index > 2) return;
      return elem;
    })
    
    res.push(word)
    res = shuffle(res);
    setDisplayWords(res);

  }, [data, word])


  // запрос следующей партии слов и слова при бездействии пользователя
  useEffect(() => {
    if(gravityCounter < 170) return;

    setGravityCounter(0);
    setCounter(prev => prev + 1);
    setLifeCounter(prev => prev - 1);
    setWrongAnswersCounter(prev => prev + 1);
    addAnswers(word, setWrongAnswers, wrongAnswers);
    // audioPlay(error);
  }, [gravityCounter])


//  проверка ответа
  function checkWord(e: any) {
    let selectElemValue = e.target.dataset.value;
    let selectElem = e.target;
    let currentElem = document.querySelector(`[data-value="${word.word}"]`);

    const resetWorld = (time: number) => {
      setTimeout(() => {
        setGravityCounter(0);
        setCounter(prev => prev + 1);
      }, time);
    }

    if(selectElemValue === word.word){
      selectElem.classList.add("guess");
      audioPlay(succes);
      resetWorld(500);
      setRightAnswersCounter(prev => prev + 1);
      // передаём слово, стейт правильных или не правильных ответов, состояние
      addAnswers(word, setRightAnswers, rightAnswers);
    } else {
      selectElem.classList.add("not-guess");
      currentElem.classList.add("guess");
      audioPlay(error);
      resetWorld(1500);
      setLifeCounter(prev => prev - 1);
      setWrongAnswersCounter(prev => prev + 1);
      addAnswers(word, setWrongAnswers, wrongAnswers);
    }
  }

  function addAnswers(word, state, elems) {
    if(elems.length === 0) {
      state([word])
    } else {
      let copy = elems;
      copy.push(word);
      state(copy);
    }
  }


  function audioPlay(src) {
    const audio = new Audio(src);
    audio.play();
  }


// сброс стилей угадал / не угадал
  useEffect(() => {
    if(counter === 0) return;
    document.querySelectorAll(".word-display").forEach((elem, index) => {
      elem.classList.remove("guess");
      elem.classList.remove("not-guess");
    })
  }, [counter])


  // движение слова вниз
  useEffect(() => {
    if(endGame === true) return;
    
    let elem = document.querySelector(".word-absolute");

    let intervalId = setInterval(() => {
      gravityCounter++;
      setGravityCounter(gravityCounter);

      elem.style.top = gravityCounter + "px";
    }, 50);

    return () => clearInterval(intervalId);
  }, [gravityCounter, endGame])

  function shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  // конец игры
  useEffect(() => {
    if(counter === 10 || lifeCounter <= 0){
      setEndGame(true);
    }
  }, [counter, lifeCounter]);


  useEffect(() => {
    let res = displayWords.map((elem, index) => {
      return(
        <div 
        data-value={elem.word} 
        className="word-display" 
        key={index}
        onClick={e => checkWord(e)}
        >
          {elem.wordTranslate}
        </div>
      )
    })

    setWordsDisplayedOnTheScreen(res);
  }, [displayWords])

  function resetgame() {
    initGame();
    setLifeCounter(2);
    setGravityCounter(0);
    setRightAnswersCounter(0);
    setWrongAnswersCounter(0);
    setCounter(0);
    setEndGame(false);
    setRightAnswers([]);
    setWrongAnswers([]);
  }

  return (
    <>
      {endGame === false ? 
        <div className="words-display">
          <div className="life-container">
            <div className="life-counter">{lifeCounter}</div>
            <FavoriteTwoToneIcon className="life-icon" />
          </div>
          
          <div className="word-absolute">{word.word}</div>
            {wordsDisplayedOnTheScreen}
        </div> 
      : 
        <ResetGame 
          rightAnswersCounter={rightAnswersCounter} 
          wrongAnswersCounter={wrongAnswersCounter} 
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          resetgame={resetgame}
        />  
      }
    </>
  )
}