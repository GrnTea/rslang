import React, { useEffect, useState, useCallback } from "react";
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
  let currentWord = {};

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
    return function cleanup() {
      setWords([]);
    };
  }, [num]);

  const playGame = useCallback((words: any) => {
    const wordData = {
      mainWord: "",
      translateWord: "вечность",
      isTrueTranslate: false,
    };
    const playWords = JSON.parse(JSON.stringify(words));
    const level = 0;
    wordData.isTrueTranslate = Boolean(Math.round(Math.random()));
    const numOfWord = random(words.length - 1);
    const numFakeWord = words.length < 19 ? numOfWord + 1 : numOfWord - 1;
    wordData.mainWord = playWords ? playWords[numOfWord].word : playWords;
    console.log(playWords);

    try {
      wordData.translateWord = wordData.isTrueTranslate
        ? playWords[numOfWord].wordTranslate : playWords[numFakeWord].wordTranslate;
    } catch {
      console.log("Error");
    }
    return wordData;
  }, [num]);

  if (isLoaded && words) {
    currentWord = playGame(words);
    console.log(currentWord);
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

const random = (max: number): number => {
  const min = 0;
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};
