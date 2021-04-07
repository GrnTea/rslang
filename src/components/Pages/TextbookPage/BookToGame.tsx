import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
} from "react-router-dom";

function BookToGame({ difficulty, page, from }) {
  const dispatch = useDispatch();
  const handleGame = useCallback(() => {
    if (from === 'TEXTBOOK') {
      dispatch({ type: "GAME_SET_TEXTBOOK" });
    } else if (from === 'DICTIONARY'){
      dispatch({ type: "GAME_SET_DICTIONARY" });
    }
  }, []);
  handleGame();
  return (
    <div className="game-links">
      <Link className="link-navigation" to={`/games/audiocall/level/${difficulty}/${page}`}>audiocall</Link>
      <Link className="link-navigation" to={`/games/sprint/level/${difficulty}/${page}`}>sprint</Link>
      <Link className="link-navigation" to={`/games/savannah/level/${difficulty}/${page}`}>savannah</Link>
    </div>
  );
}

export default BookToGame;
