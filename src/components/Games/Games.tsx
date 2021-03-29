import React from "react";
import {
  Route, Link,
  // BrowserRouter, Switch,HashRouter,
} from "react-router-dom";
import Sprint from "./Sprint/Sprint";
import GameAudioCall from "./AudioCall/GameAudioCall";
import "./games.css";

import GameDescription from "./GameDescription";
import {
  GAME_NAME_AUDIOCALL_RU, DESCRIPTION_AUDIOCALL_RU, DESCRIPTION_SPRINT_RU,
  GAME_NAME_SPRINT_RU, SELECT_AUDIOCALL, SELECT_SPRINT,
} from "./gameSettings";

export default function Games() {
  const audioCall = () => (<GameAudioCall />);
  const sprint = () => (<Sprint />);
  return (
    <div className="games">
      <h2>games</h2>

      <div className="routes">
        <Link className="links" to="/games/audiocall">audiocall</Link>
        <Link className="links" to="/games/sprint">sprint</Link>
      </div>

      <Route path="/games/audiocall">
        <GameDescription gameName={GAME_NAME_AUDIOCALL_RU} description={DESCRIPTION_AUDIOCALL_RU}
        game={audioCall} gameSelected ={SELECT_AUDIOCALL} />
      </Route>
      <Route path="/games/sprint">
        <GameDescription gameName={GAME_NAME_SPRINT_RU} description={DESCRIPTION_SPRINT_RU}
        game={sprint} gameSelected ={SELECT_SPRINT} />
      </Route>
    </div>

  );
}
