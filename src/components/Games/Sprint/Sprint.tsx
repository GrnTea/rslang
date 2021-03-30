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

  const shufleWords = (words) => {
    if (words) {
      words.sort(() => Math.random() - 0.5);
    }
    return words;
  };

  useEffect(() => {
    setIsLoaded(false);
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          setWords(result);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        },
      );
  }, [num]);

  const playGame = (words: any) => {
    const level = 0;
    const isTrueTranslate = Math.round(Math.random());
    console.log(words);
    random(words.length);
    const mainWord = getWordLesson(words);
    const translateWord = getWordLesson(words);
  };

  if (isLoaded) {
    playGame(words);
  }

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

const getWordLesson = (words) => {

};

const random = (max: number): number => {
  const min = 0;
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
