import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./sprint.scss";
import Points from "./Points";
import SprintHeader from "./SprinInterface";

export default function Sprint() {
  const params: { num: string | undefined } = useParams();
  const [words, setWords] = useState<Promise<any>>();
  const [errorFetch, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVolume = true;
  const bonus = 20;
  const { num } = params;

  const URL = `http://localhost:3001/words?group=${Number(num) - 1}&page=1`;

  useEffect(() => {
    setIsLoaded(false);
    console.log(num);
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setWords(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, [num]);

  const getMainWord = () => {

  };

  if (errorFetch) {
    return <div>Ошибка: {errorFetch.message}</div>;
  } if (!isLoaded) {
    return <div>Загрузка...</div>;
  }
  return (
      <div className="sprint" >
        <h2 className="sprint__header">sprint</h2>
        <SprintHeader isVolume={isVolume} />
        <Points bonus={bonus} />
        <div className="sprint__words-container">
          <h3 className="sprint__words">

          </h3>
          <h4 className="sprint__translate">

          </h4>
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
