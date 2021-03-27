import React, {useState, useEffect} from 'react';
import SpeakerIcon from '@material-ui/icons/Speaker';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import './game.css';
import {
  useParams,
} from "react-router-dom";

const URL = 'https://rslernwords.herokuapp.com/';

export default function GameAudioCall(){
  const { num } = useParams();
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [showImage, setShowImage] = useState(false);

  const [displayWords, setDisplayWords] = useState([]);

  const [trueAnswer, setTrueanswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [startGame, setStartGame] = useState(true);
  const [rebootButton, setRebootButton] = useState(false);

  const url = `https://react-learnwords-example.herokuapp.com/words?group=${num - 1}&page=1`;
  
  function initGame() {
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      jsonData = shuffle(jsonData);
      setData(jsonData)
      setWord(jsonData[counter])
     })
  }


  useEffect(() => {
    initGame();
  }, [])

  // -------
  useEffect(() => {
    if(isEmpty(data)) return;
    if(startGame !== true) return;

    let copyData = [...data];
    let elem = copyData.pop();
    setData(copyData);

    setWord(elem)
  }, [counter]);

  useEffect(() => {
    if(startGame !== true) return;
    playWord();
  }, [word]);

  useEffect(() => {
    console.log(counter)
    if(counter === 10){
      let result = 
      <div className="end-game">
        <div>правильных ответов: {trueAnswer}</div>  
        <div>не правильных ответов: {falseAnswer}</div>  
      </div>
      setEndGame(result);
      setStartGame(false);
      setRebootButton(true);

      document.querySelector('.content-conteiner').classList.add('hide');

    }
  }, [counter])


  useEffect(() => {
    let i = 0;

    let arrShuffle = shuffle(data);
    
    let res = arrShuffle.filter((elem) => { 
      if(elem.word === word.word) return;
      i++;

      if(i > 4) return;
      
      return elem.word;
    })

    res.push(word);
    res = shuffle(res);

    setDisplayWords(res);
    
  }, [counter, word])


  function isEmpty(obj) {
    for(let key in obj){
      return false;
    }
    return true;
  }

  function playWord() {
    const audio = new Audio(URL + word.audio);
    audio.play();
  }

  function checkWord(e) {
    let targetElem = e.target;
    let currentElem;
    if(e.target.innerHTML === word.word){
      setShowImage(true)
      setTrueanswer(prev => prev + 1);

      targetElem.classList.add('guessed')
      setTimeout(() => {
        setShowImage(false)
        setCounter(prev => prev + 1);
        targetElem.classList.remove('guessed');
      }, 2000);

    } else {
      currentElem = document.querySelector(`[data-value="${word.word}"]`);
      targetElem.classList.add('no-guessed')
      currentElem.classList.add('guessed')
      setShowImage(true)
      setFalseAnswer(prev => prev + 1);
     
      setTimeout(() => {
        targetElem.classList.remove('no-guessed')
        currentElem.classList.remove('guessed')
        setShowImage(false)
        setCounter(prev => prev + 1);
      }, 2000)
    }
    
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function rebootGame() {
    setCounter(0);
    setRebootButton(false);
    setEndGame(false);
    setTrueanswer(0);
    setFalseAnswer(0);
    setCounter(0);
    setWord({});
    setData([]);
    setDisplayWords([]);
    setStartGame(true);
    initGame();
    document.querySelector('.content-conteiner').classList.remove('hide');
  }

  let SpeakerIconStyles = {
    fontSize: 100, 
    color: '#3498db', 
    cursor: 'pointer',
    margin: '0 auto'
  }



  return (
    <div className="game-body-container">
      <h2>аудиовызов</h2>
      <LinearProgress color="secondary" variant="determinate" value={counter * 10 } />
      
      
      <div className="content-conteiner">

        <div className="random-words">
          {
          displayWords.map((e, i) => {
            return (
              <div key={i} 
                data-value={e.word}
                className="random-word"
                onClick={e => checkWord(e)} >
                  {e.word}
              </div>
            )
          } )
          }
        </div>

        <div className="word-image">
          {showImage ? <img src={URL + word.image} alt=""/> : ''}
        </div>

        <div className="speaker-icon">
          <SpeakerIcon style={{...SpeakerIconStyles}}  onClick={() => playWord()} />
        </div>

      </div>    
      
      {endGame ? endGame : ''}
      {rebootButton ? 
        <div className="button-reboot-game">
          <Button 
            onClick={rebootGame} 
            variant="contained" 
            color="primary">
              ебануть ещё разик
          </Button> 
        </div>
        : ''
      }
    </div> 


  )
}