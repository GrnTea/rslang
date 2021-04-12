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
  GAME_NAME_SPRINT_RU, SELECT_AUDIOCALL, SELECT_SPRINT, DESCRIPTION_SAVANNAH_RU, 
  GAME_NAME_SAVANNA_RU, SELECT_SAVANNAH, GAME_NAME_SPRINT_ENG, DESCRIPTION_SPRINT_ENG, 
  DESCRIPTION_SAVANNAH_ENG, GAME_NAME_SAVANNA_ENG, DESCRIPTION_AUDIOCALL_ENG, GAME_NAME_AUDIOCALL_ENG, GAME,
} from "./gameSettings";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducer";

function Games({ lang }: {lang:string}}) {
  console.log(lang);
  const audioCall = () => (<GameAudioCall />);
  const sprint = () => (<Sprint />);
  const savannah = () => (<GameSavannah />);
  return (
    <div className="games-container">
      <h1 className="games-header">Мини-игры</h1>

      <div className="routes">
        <Link className="links" to="/games/audiocall">{GAME[lang].AUDIOCALL.NAME}</Link>
        <Link className="links" to="/games/sprint">{GAME[lang].SPRINT.NAME}</Link>
        <Link className="links" to="/games/savannah">{GAME[lang].SAVANNA.NAME}</Link>
      </div>

      <Route path="/games/audiocall">
        <GameDescription gameName={GAME[lang].AUDIOCALL.NAME} description={GAME[lang].AUDIOCALL.DESCRIPTION()}
        game={audioCall} gameSelected ={SELECT_AUDIOCALL} />
      </Route>
      <Route path="/games/sprint">
        <GameDescription gameName={GAME[lang].SPRINT.NAME} description={GAME[lang].SPRINT.DESCRIPTION()}
        game={sprint} gameSelected ={SELECT_SPRINT} />
      </Route>
      <Route path="/games/savannah">
        <GameDescription gameName={GAME[lang].SAVANNA.NAME} description={GAME[lang].SAVANNA.DESCRIPTION()}
        game={savannah} gameSelected ={SELECT_SAVANNAH} />
      </Route>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(Games);
