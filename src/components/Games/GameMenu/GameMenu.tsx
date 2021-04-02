import React, { useEffect } from "react";

import "./gamemenu.css";
import {
  Link,
  Route,
} from "react-router-dom";
import { ButtonGroup, Button } from "@material-ui/core";

export default function GameMenu(props: any) {
  const arrLinks = [];
  for (let i = 1; i < 7; i++) {
    arrLinks.push(<Link key={i} className="link-navigation" to={`/games/${props.gameSelected}/level/${i}`}>{i}</Link>);
  }
  const gamePath = `/games/${props.gameSelected}/level/:num`;

  return (
    <div className="game-menu">
      <div className="game-name">{props.gameName}</div>
      <div className="game-desription">{props.description}</div>
      <div className="game-level">выберите уровень</div>
      <div className="button-group">
        {arrLinks}
      </div>

      <div className="routes">
        <Route exact path={gamePath}>
          {props.game()}
        </Route>
      </div>
    </div>
  );
}
