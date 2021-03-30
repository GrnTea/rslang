import React, { useEffect, useState } from "react";
import {
  AccessAlarm, Score, VolumeUp, VolumeOff,
} from "@material-ui/icons";

const SprintHeader = ({ isVolume, score }: { isVolume: boolean, score: number}) => {
  const [time, setTime] = useState(0);
  return (
        <div className="sprint__interface">
            <div className="sprint___timer">
                <AccessAlarm />{time}
            </div>
            <div className="sprint___score">
                <Score />{score}
            </div>
            <div className="sprint___sound">
                {isVolume ? <VolumeUp /> : <VolumeOff />}
            </div>
        </div>
  );
};

export default SprintHeader;
