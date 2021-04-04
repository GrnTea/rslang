import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import "./resetGame.css";

import { signOut } from "../../../redux/user_reducer";
import { RootState } from "../../../redux/reducer";
import { connect } from "react-redux";

const ResetGame = (props: any) => {

  let buttonStyles = {
    backgroundColor: '#3498db', 
    color: 'white',
    cursor: 'pointer',
    margin: '0 auto'
  }

  const herokuUrl = 'https://rslernwords.herokuapp.com/';

  let [trueWords, setTrueWords] = useState([]);
  let [falseWords, setFalseWords] = useState([]);

  const [gameStatistics, setGameStatistics] = useState(0);

  useEffect(() => {
    console.log(RootState)
  }, []);

  useEffect(() => {
    let res = props.rightAnswers.map((elem: any, index: number) => {
      return (
        <div key={index} className="true-words">
          <div className="play-sound" onClick={() => playAudio(index, props.rightAnswers)}>
            <VolumeUpIcon />
          </div>
          
          <div className="word-answer en">{elem.word}</div>
          <span className="separator"></span>  
          <div className="word-answer ru">{elem.wordTranslate}</div>
        </div>  
      )
    });

    setTrueWords(res)
  }, []);
  
  useEffect(() => {
    let res = props.wrongAnswers.map((elem: any, index: number) => {
      return (
        <div key={index} className="false-words">
          <div className="play-sound" onClick={() => playAudio(index, props.wrongAnswers)}>
            <VolumeUpIcon />
          </div>
          
          <div className="word-answer en">{elem.word}</div>
          <span className="separator"></span>  
          <div className="word-answer ru">{elem.wordTranslate}</div>
        </div>  
      )
    });

    setFalseWords(res)
  }, [])

  
  function playAudio(id: number, answers: any) {
    let audioUrl = answers[id].audio;
    let audio = new Audio(herokuUrl + audioUrl);
    audio.play();
  }

  type StatType = {
    learnedWords: Number,
    date: Number, //  (current time in UTCmiliseconds)
    gameId: String,
    rightAnswers: Number,
    wrongAnswers: Number,
    maxSerie: Number
  }

  useEffect(() => {
    let res = {
      "learnedWords": props.rightAnswersCounter,
      "date": Date.now(), //(current time in UTCmiliseconds)
      "gameId": "1",
      "rightAnswers": props.rightAnswersCounter,
      "wrongAnswers": props.wrongAnswersCounter,
      "maxSerie": props.maxSerie
    }
    setGameStatistics(res);
  }, []);

  useEffect(() => {
    if(gameStatistics === 0) return;
    // let userId = "42";
    
    // const sendStat = async (gameStatistics: StatType, userId: String) => {
    //   fetch(`https://rslernwords.herokuapp.com/users/${userId}/statistics`, {
    //     method: "POST",
    //     headers: {
    //       "Accept": "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(gameStatistics),
    //   })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => {
    //     console.log(error);
    //   })

    // };

    // sendStat(gameStatistics, userId);
  }, [gameStatistics]);
 

  return (
    <div className="reset-game">
      <div className="end-game-emotion">это конец <EmojiEmotionsTwoToneIcon color="primary"/></div> 
      <div className="right-answers-counter">
        <div className="answers">Знаю: </div>
        <div className="right-counter">{props.rightAnswers.length}</div>
      </div>
      <div className="right-answers">
        {trueWords}
      </div>
      <div className="answers-separator"></div>
      <div className="wrong-answers-counter">
        <div className="answers">Ошибок: </div>
        <div className="wrong-counter">{props.wrongAnswers.length}</div>
      </div>
      <div className="wrong-answers">
        {falseWords}
      </div>
      <Button style={{...buttonStyles}} variant="contained" onClick={props.resetgame}>
        попробовать ещё раз
      </Button>
    </div>
  )
}

export default ResetGame;