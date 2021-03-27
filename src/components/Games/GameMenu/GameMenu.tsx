import React, {useEffect} from 'react';
import GameAudioCall from '../AudioCall/GameAudioCall';
import './gamemenu.css';
import {
  Link,
  Route
} from "react-router-dom";
import { ButtonGroup, Button } from '@material-ui/core';

export default function GameMenu(props) {
  return (
    <div className="game-menu">
      <div className="game-name">{props.gameName}</div>
      <div className="game-desription">{props.description}</div>
      <div className="game-level">выберите уровень</div>
      <div className="button-group">
        <Link className="link-navigation" to='/games/audiocall/level/1'>1</Link>
        <Link className="link-navigation" to='/games/audiocall/level/2'>2</Link>
        <Link className="link-navigation" to='/games/audiocall/level/3'>3</Link>
        <Link className="link-navigation" to='/games/audiocall/level/4'>4</Link>
        <Link className="link-navigation" to='/games/audiocall/level/5'>5</Link>
        <Link className="link-navigation" to='/games/audiocall/level/6'>6</Link>
      </div>

      <div className="routes">
        <Route exact path="/games/audiocall/level/:num">
          <GameAudioCall /> 
        </Route>
      </div>
    </div>
  )
}