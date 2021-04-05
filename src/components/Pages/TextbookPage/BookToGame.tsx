import React, {useState, useEffect} from "react";
import {
  Link,
} from "react-router-dom";

function BookToGame({ difficulty, page }) {
  return(
    <div className="game-links">
      <Link className="link-navigation" to={`/games/audiocall/level/${difficulty}/${page}`}>audiocall</Link>
      <Link className="link-navigation" to={`/games/sprint/level/${difficulty}/${page}`}>sprint</Link>
      <Link className="link-navigation" to={`/games/savannah/level/${difficulty}/${page}`}>savannah</Link>
    </div>    
  )
}

export default BookToGame;