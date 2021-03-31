import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';

const ResetGame = (props: any) => {

  const herokuUrl = 'https://rslernwords.herokuapp.com/';

  let [trueWords, setTrueWords] = useState([]);
  let [falseWords, setFalseWords] = useState([]);

  useEffect(() => {
    let res = props.rightAnswers.map((elem: any, index: number) => {
      return (
        <div key={index} className="true-words">
          <div className="play-sound" onClick={() => playAudio(index, true)}>
            <VolumeUpIcon />
          </div>
          
          <div>{elem.word}</div>
          <span> - </span>  
          <div>{elem.wordTranslate}</div>
        </div>  
      )
    });

    setTrueWords(res)
  }, [])
  
  useEffect(() => {
    let res = props.wrongAnswers.map((elem: any, index: number) => {
      return (
        <div key={index} className="false-words">
          <div className="play-sound" onClick={() => playAudio(index, false)}>
            <VolumeUpIcon />
          </div>
          
          <div>{elem.word}</div>
          <span> - </span>  
          <div>{elem.wordTranslate}</div>
        </div>  
      )
    });

    setFalseWords(res)
  }, [])

  function playAudio(id: number, bool: boolean) {
    let audioUrl = '';

    if(bool) {
      audioUrl = props.rightAnswers[id].audio;
    } else {
      audioUrl = props.wrongAnswers[id].audio;
    }
   
    let audio = new Audio(herokuUrl + audioUrl);
    audio.play();
  }

  return (
    <div className="reset-game">
      <div className="end-game-emotion">это конец <EmojiEmotionsTwoToneIcon color="primary"/></div> 
      <h4>правильные ответы:</h4>
      <div className="right-answers">
        {trueWords}
      </div>
      <h4>не правильные ответы:</h4>
      <div className="wrong-answers">
        {falseWords}
      </div>
      <Button variant="contained" color="primary" onClick={props.resetgame}>
        попробовать ещё раз
      </Button>
    </div>
  )
}

export default ResetGame;