import React, {useState, useEffect} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

function BookToGame() {

  const location = useLocation();

  const [page, setPage] = useState(1);
  const [difficulty, setDifficulty] = useState(1);

  useEffect(() => {
    let pathName = location.pathname.split('/');
    
    setPage(pathName.pop());
    setDifficulty(pathName.pop());
  }, [])

  
  return(
    <div className="game-links">
      <Link className="link-navigation" to={`/games/audiocall/level/${difficulty}/${page}`}>audiocall</Link>
      <Link className="link-navigation" to={`/games/savannah/level/${difficulty}/${page}`}>savannah</Link>
      <Link className="link-navigation" to={`/games/sprint/level/${difficulty}/${page}`}>sprint</Link>
    </div>    
  )
}

export default BookToGame;