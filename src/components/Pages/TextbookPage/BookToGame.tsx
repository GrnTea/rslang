import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Link,
} from "react-router-dom";
import { RootState } from "../../../redux/reducer";
import {
  GAME_NAME_AUDIOCALL_ENG, GAME_NAME_AUDIOCALL_RU, GAME_NAME_SAVANNA_ENG,
  GAME_NAME_SAVANNA_RU, GAME_NAME_SPRINT_ENG, GAME_NAME_SPRINT_RU,
} from "../../Games/gameSettings";

function BookToGame({
  difficulty, page, from, lang,
}) {
  const dispatch = useDispatch();
  const handleGame = useCallback(() => {
    if (from === "TEXTBOOK") {
      dispatch({ type: "GAME_SET_TEXTBOOK" });
    } else if (from === "DICTIONARY") {
      dispatch({ type: "GAME_SET_DICTIONARY" });
    }
  }, []);
  handleGame();
  return (
    <div className="game-links">
      <Link className="link-navigation" to={`/games/audiocall/level/${difficulty}/${page}`}>{lang === "ru"
        ? GAME_NAME_AUDIOCALL_RU : GAME_NAME_AUDIOCALL_ENG}</Link>
      <Link className="link-navigation" to={`/games/sprint/level/${difficulty}/${page}`}>{lang === "ru"
        ? GAME_NAME_SPRINT_RU : GAME_NAME_SPRINT_ENG}</Link>
      <Link className="link-navigation" to={`/games/savannah/level/${difficulty}/${page}`}>{lang === "ru"
        ? GAME_NAME_SAVANNA_RU : GAME_NAME_SAVANNA_ENG}</Link>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(BookToGame);
