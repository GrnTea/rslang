import React, { Dispatch, useEffect, useState } from "react";
import { AccessAlarm } from "@material-ui/icons";

type BeginTipe = {
  setBegin: Dispatch<boolean>,
}
const Begin = ({ setBegin }: BeginTipe) => {
  const [beginTimer, setBeginTimer] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setBeginTimer(beginTimer - 1);
    }, 1000);
    if (beginTimer === 0) {
      setBegin(false);
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
