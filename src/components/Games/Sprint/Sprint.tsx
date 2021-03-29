import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./sprint.scss";
import Points from "./Points";
import SprintHeader from "./SprinInterface";

export default function Sprint() {
  const params = useParams();
  const [words, setWords] = useState({ words: "ewrwer", translate: "werew" });
  const isVolume = true;
  const bonus = 20;
  console.log(params);
  return (
    <div className="sprint" >
      <h2 className="sprint__header">sprint</h2>
      <SprintHeader isVolume={isVolume} />
      <Points bonus={bonus} />
      <div className="sprint__words-container">
         <div className="sprint__words">
        {words.words}
      </div>
      <div className="sprint__translate">
        {words.translate}
      </div>
      </div>
      <div>
        <Button variant="contained" color="secondary">
          Неверно
      </Button>
        <Button variant="contained" color="primary">
          Верно
      </Button>
      </div>
    </div>
  );
}
