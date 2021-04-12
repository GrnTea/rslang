import React, {useState, useEffect} from "react";
import {
  Route, Link, useLocation
  // BrowserRouter, Switch,HashRouter,
} from "react-router-dom";
import Sprint from "./Sprint/Sprint";
import GameAudioCall from "./AudioCall/GameAudioCall";
import GameSavannah from "./Savannah/GameSavannah";
import "./games.scss";

import GameDescription from "./GameDescription";
import {
  GAME_NAME_AUDIOCALL_RU, DESCRIPTION_AUDIOCALL_RU, DESCRIPTION_SPRINT_RU,
  GAME_NAME_SPRINT_RU, SELECT_AUDIOCALL, SELECT_SPRINT, DESCRIPTION_SAVANNA_RU, GAME_NAME_SAVANNA_RU, SELECT_SAVANNAH,
} from "./gameSettings";

export default function Games() {
  const audioCall = () => (<GameAudioCall />);
  const sprint = () => (<Sprint />);
  const savannah = () => (<GameSavannah />);

  let [hideMenu, setHideMenu] = useState(false);
  const location = useLocation();
 
  useEffect(() => {
    const locationPath = location.pathname;
    const test: any = locationPath.split('/').reverse()[0];
    
    if(!isNaN(test)){ 
      setHideMenu(true)
    } else {
      setHideMenu(false)
    }
  }, [location])

  
  return (
    <div className="games-container">
      

      <div className={hideMenu ? "games-routes hide" : "games-routes"}>
        <div className="games-description">Мини-игры</div>
        <div className="games-links">
          <Link className="links" to="/games/audiocall">audiocall</Link>
          <Link className="links" to="/games/sprint">sprint</Link>
          <Link className="links" to="/games/savannah">savannah</Link>
        </div>
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
