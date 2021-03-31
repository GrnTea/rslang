import { Drawer } from '@material-ui/core';
import React, {useState, useEffect, useRef} from 'react';
import {
  useParams,
} from "react-router-dom";
import './gameSavannah.css';

import succes from '../../../assets/sound/succes.mp3';
import error from '../../../assets/sound/error.mp3';

const URL = 'https://rslernwords.herokuapp.com/';

export default function GameSavannah() {
  const { num } = useParams();
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [displayWords, setDisplayWords] = useState([]);
  let [gravityCounter, setGravityCounter] = useState(0);

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

  // 
  useEffect(() => {
    if(counter === 0) return;

    setWord(data.pop());
    setData(data);
  }, [counter])


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


  useEffect(() => {
    if(gravityCounter < 170) return;

    setGravityCounter(0);
    setCounter(prev => prev + 1);
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
    } else {
      selectElem.classList.add("not-guess");
      currentElem.classList.add("guess");
      audioPlay(error);
      resetWorld(1500);
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
    let intervalId = setInterval(() => {
      gravityCounter++;
      setGravityCounter(gravityCounter)
      document.querySelector(`.word-absolute`).style.top = gravityCounter + "px";
    }, 50)

    // console.log(gravityCounter)    
    return () => clearInterval(intervalId);
  }, [gravityCounter])



  function isEmpty(obj: object) {
    for(let key in obj){
      return false;
    }
    return true;
  }

  function shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="words-display">
      <div className={`word-absolute`}>{word.word}</div>
      {displayWords.map((elem, index) => {
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
      })}
    </div> 
  )
}