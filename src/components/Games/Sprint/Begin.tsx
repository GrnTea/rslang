import React, { Dispatch, useEffect } from "react";
import { AccessAlarm } from "@material-ui/icons";

type BeginTipe = {
  beginTimer: number,
  setBeginTimer: Dispatch<number>,
}
const Begin = ({ beginTimer, setBeginTimer }: BeginTipe) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setBeginTimer(beginTimer - 1);
    }, 1000);
    if (beginTimer === 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="sprint">
      <h2 className="sprint__header">Приготовьтесь!</h2>
      <div className="sprint__words-container">
        <AccessAlarm />
        <div>{beginTimer}</div>
      </div>
    </div>
  );
};

export default Begin;
