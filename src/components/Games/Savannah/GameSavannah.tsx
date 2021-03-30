import { Drawer } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import {
  useParams,
} from "react-router-dom";
import './gameSavannah.css';

const URL = 'https://rslernwords.herokuapp.com/';

export default function GameSavannah() {
  const { num } = useParams();
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [displayWords, setDisplayWords] = useState([]);
  const [gravity, setGravity] = useState(true);

  function initGame() {
    fetch(`https://react-learnwords-example.herokuapp.com/words?group=${num - 1}&page=1`)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      setWord(jsonData.pop());
      setData(jsonData);
     })
  }

  useEffect(() => {
    initGame();
  }, []);

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
    if(gravity === true) return;

    console.log(gravity)
  }, [gravity])

  function checkWord(e: any) {
    let selectElemValue = e.target.dataset.value;
    let selectElem = e.target;
    let currentElem = document.querySelector(`[data-value="${word.word}"]`);
    let gravityElem = document.querySelector(".word-absolute");

    // console.log(gravityElem)

    if(selectElemValue === word.word){
      selectElem.classList.add("guess");
      setCounter(prev => prev + 1);
      // gravityElem.style.top = 0 + 'px';
    } else {
      selectElem.classList.add("not-guess");
      currentElem.classList.add("guess");
    }
  }

  useEffect(() => {
    if(counter === 0) return;
    const dataShuffle = shuffle(data);

    setTimeout(() => {
      setWord(dataShuffle.pop());
      setData(dataShuffle);
    }, 2000);

    setTimeout(() => setGravity(false), 1500);
  }, [counter])


// restart
  useEffect(() => {
    if(counter === 0) return;
    // let elem: any = document.querySelector(`.word-absolute-${counter}`);
    let elem: any = document.querySelector(`.word-absolute`);
    
    // console.log(elem)
    setTimeout(() => {
      elem.style.top = 0 + 'px';
      // elem.style.color = 'blue';
      
      document.querySelectorAll(".word-display").forEach((elem, index) => {
        elem.classList.remove("guess");
      })
    }, 2000);
  }, [counter])

  useEffect(() => {
    // if(counter === 0) return;
    // let documentElem = document.querySelector(`.word-absolute-${counter}`);
    let documentElem = document.querySelector(`.word-absolute`);
    let start = Date.now();

    // let coordinates = documentElem.getBoundingClientRect();

    let intervalId = setInterval(() => {
      let diffTime = Date.now() - start;

      if(diffTime > 6000){
        clearInterval(intervalId);
        setGravity(false);
        return;
      }
      
      draw(diffTime, documentElem);
    }, 20);
  }, [counter])



  function draw(diffTime: number, elem: any){
    elem.style.top = diffTime / 20 + 'px';
  }

  function isEmpty(obj: object) {
    for(let key in obj){
      return false;
    }
    return true;
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="words-display">
      {/* <div className={`word-absolute-${counter}`}>{word.word}</div> */}
      <div className={`word-absolute`}>{word.word}</div>
      {displayWords.map((elem, index) => {
        // console.log(elem)
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