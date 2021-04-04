import React, {useState, useEffect} from 'react';
import SpeakerIcon from '@material-ui/icons/Speaker';
import LinearProgress from '@material-ui/core/LinearProgress';

import useSound from "use-sound";
import DisplayWordsComponent from "./DisplayWordsComponent";
import ResetGame from "./ResetGame";
import FullScreenButton from "./FullScreenButton";

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

  let [rightAnswers, setRightAnswers] = useState([]);
  let [wrongAnswers, setWrongAnswers] = useState([]);
  

  const url = `https://react-learnwords-example.herokuapp.com/words?group=${num - 1}&page=1`;
  
  function initGame() {
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((jsonData) => {
      const dataShuffle = shuffle(jsonData);

      setWord(dataShuffle.pop())
      setData(dataShuffle)
     })
  }


  useEffect(() => {
    initGame();
  }, [])

  // -------
  useEffect(() => {
    if(counter === 0) return;

    setWord(data.pop());
    setData(data);
  }, [counter]);

  useEffect(() => {
    if(startGame !== true) return; 
    if(counter === 0) return;

    playWord();
  }, [word]);

  useEffect(() => {
    if(counter === 10){
      setEndGame(true);
      setStartGame(false);
      document.querySelector('.content-conteiner').classList.add('hide');
    }
  }, [counter])


  useEffect(() => {
    let res = data.filter((elem, index) => { 
      if(elem.word === word.word) return;
      if(index > 3) return;
      
      return elem.word;
    })

    res.push(word);
    res = shuffle(res);

    setDisplayWords(res);
  }, [data, word])


  function playWord() {
    const audio = new Audio(URL + word.audio);
    audio.play();
  }

  function checkWord(e) {
    let targetElem = e.target;
    let currentElem: any;
    if(e.target.dataset.value === word.word){
      setShowImage(true)
      setTrueanswer(prev => prev + 1);
      addAnswers(word, setRightAnswers, rightAnswers);

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
      addAnswers(word, setWrongAnswers, wrongAnswers);
     
      setTimeout(() => {
        targetElem.classList.remove('no-guessed')
        currentElem.classList.remove('guessed')
        setShowImage(false)
        setCounter(prev => prev + 1);
      }, 2000)
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

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function rebootGame() {
    setCounter(0);
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

  let LinearProgressStyles = {
    color: "primary",
    marginTop: "10px"
  }

  return (
    <div className="game-body-container">
      <LinearProgress style={{...LinearProgressStyles}} variant="determinate" value={counter * 10 } />
      <div className="content-conteiner">
        <DisplayWordsComponent displayWords={displayWords} checkWord={checkWord} />

        <div className="word-image">
          {showImage ? <img src={URL + word.image} alt=""/> : ''}
        </div>

        <div className="speaker-icon">
          <SpeakerIcon style={{...SpeakerIconStyles}}  onClick={() => playWord()} />
        </div>
      </div>    
      
      {endGame ? 
        <ResetGame 
          rightAnswersCounter={trueAnswer} 
          wrongAnswersCounter={falseAnswer} 
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          resetgame={rebootGame}
        />  
        : ''
      }
      <div className="fullscreen-button">
        <FullScreenButton />
      </div>
    </div> 
  )
}