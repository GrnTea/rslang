import React, { useEffect, useState } from "react";

import "./gamemenu.css";
import {
  Link,
  Route,
  useLocation,
} from "react-router-dom";

export default function GameMenu(props: any) {
  const arrLinks = [];
  for (let i = 1; i < 7; i++) {
    arrLinks.push(<Link key={i} className="link-navigation" to={`/games/${props.gameSelected}/level/${i}`}>{i}</Link>);
  }

  const gamePath = `/games/${props.gameSelected}/level/:num`;
  const location = useLocation();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const currentLocatin = location.pathname;
    const chunckL = currentLocatin.split("/").pop();
    const num = Number(chunckL);

    if (typeof num === "number" && !isNaN(num)) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [location]);

  return (
    <div className="game-container">

      <div className={hide ? "game-menu hide" : "game-menu"}>
        <div className="game-name">{props.gameName}</div>
        <div className="game-desription">{props.description}</div>
        <div className="game-level">выберите уровень</div>
        <div className="button-group">
          {arrLinks}
        </div>
      </div>

    <div className="game-body">
      <Route exact path={gamePath}>
        {props.game()}
      </Route>
    </div>
    </div>

  );
}
