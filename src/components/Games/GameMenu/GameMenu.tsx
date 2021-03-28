import React, {useEffect} from 'react';
import GameAudioCall from '../AudioCall/GameAudioCall';
import './gamemenu.css';
import {
  Link,
  Route
} from "react-router-dom";
import { ButtonGroup, Button } from '@material-ui/core';

export default function GameMenu(props: any) {

  let arrLinks = [];
  for(let i = 1; i < 7; i++) {
    arrLinks.push(<Link key={i} className="link-navigation" to={`/games/audiocall/level/${i}`}>{i}</Link>)
  }

  return (
    <div className="game-menu">
      <div className="game-name">{props.gameName}</div>
      <div className="game-desription">{props.description}</div>
      <div className="game-level">выберите уровень</div>
      <div className="button-group">
        {arrLinks}
      </div>

      <div className="routes">
        <Route exact path="/games/audiocall/level/:num">
          <GameAudioCall /> 
        </Route>
      </div>
    </div>
  )
}