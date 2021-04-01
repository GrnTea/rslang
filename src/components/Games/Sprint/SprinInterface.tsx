import React, { useEffect, useState } from "react";
import {
  AccessAlarm, Score, VolumeUp, VolumeOff,
} from "@material-ui/icons";

let int = null;

const SprintHeader = ({ isVolume, score, setFinish }:
   { isVolume: boolean, score: number, finish: React.SetStateAction<boolean>}) => {
  const [time, setTime] = useState(60);
  const [timeIn, setTimeIn] = useState();

  useEffect(() => {
    int = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    setTimeIn(int);
    if (time === 0) {
      clearInterval(int);
      setFinish(true);
    }
    return () => clearInterval(int);
  }, [time]);

  return (
        <div className="sprint__interface">
            <div className="sprint__timer">
                <AccessAlarm />{time}
            </div>
            <div className="sprint__score">
                <Score />{score}
            </div>
            <div className="sprint__sound">
                {isVolume ? <VolumeUp /> : <VolumeOff />}
            </div>
        </div>
  );
};

export default SprintHeader;
