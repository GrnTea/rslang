import React from "react";
import {
  Route, Link,
  // BrowserRouter, Switch,HashRouter,
} from "react-router-dom";
import Sprint from "./Sprint/Sprint";
import GameAudioCall from "./AudioCall/GameAudioCall";
import GameSavannah from "./Savannah/GameSavannah";
import "./games.css";

import GameDescription from "./GameDescription";
import {
  GAME_NAME_AUDIOCALL_RU, DESCRIPTION_AUDIOCALL_RU, DESCRIPTION_SPRINT_RU,
  GAME_NAME_SPRINT_RU, SELECT_AUDIOCALL, SELECT_SPRINT, DESCRIPTION_SAVANNA_RU, GAME_NAME_SAVANNA_RU, SELECT_SAVANNAH,
} from "./gameSettings";

export default function Games() {
  const audioCall = () => (<GameAudioCall />);
  const sprint = () => (<Sprint />);
  const savannah = () => (<GameSavannah />);
  return (
    <div className="games-container">
      <h1>Мини-игры</h1>

      <div className="routes">
        <Link className="links" to="/games/audiocall">audiocall</Link>
        <Link className="links" to="/games/sprint">sprint</Link>
        <Link className="links" to="/games/savannah">savannah</Link>
      </div>

      <Route path="/games/audiocall">
        <GameDescription gameName={GAME_NAME_AUDIOCALL_RU} description={DESCRIPTION_AUDIOCALL_RU}
        game={audioCall} gameSelected ={SELECT_AUDIOCALL} />
      </Route>
      <Route path="/games/sprint">
        <GameDescription gameName={GAME_NAME_SPRINT_RU} description={DESCRIPTION_SPRINT_RU}
        game={sprint} gameSelected ={SELECT_SPRINT} />
      </Route>
      <Route path="/games/savannah">
        <GameDescription gameName={GAME_NAME_SAVANNA_RU} description={DESCRIPTION_SAVANNA_RU}
        game={savannah} gameSelected ={SELECT_SAVANNAH} />
      </Route>
    </div>

  );
}
