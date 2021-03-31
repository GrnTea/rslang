import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ResetGame = (props) => {
  return (
    <div className="reset-game">
      <div>это конец :)</div> 
      <div className="right-answers">правильные ответы: {props.rightAnswers}</div>
      <div className="wrong-answers">не правильные ответы: {props.wrongAnswers}</div>
      <Button variant="contained" color="primary" onClick={props.resetgame}>
        попробовать ещё раз
      </Button>
    </div>
  )
}

export default ResetGame;