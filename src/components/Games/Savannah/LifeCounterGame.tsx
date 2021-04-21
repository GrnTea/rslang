import React, { useState, useEffect } from "react";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

const LifeCounterGame = ({ lifeCounter } : {lifeCounter: number}) => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const lifes = [];

    for (let i = 0; i < lifeCounter; i++) {
      lifes.push(<FavoriteTwoToneIcon key={i} />);
    }

    setRes(lifes);
  }, [lifeCounter]);

  return (
    <div className="life-counter">
      {...res}
    </div>
  );
};

export default LifeCounterGame;
