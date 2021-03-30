import React, {
  useEffect, useState, useCallback, ReactEventHandler,
} from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./sprint.scss";
import Points from "./Points";
import SprintHeader from "./SprinInterface";

interface ICurrentWord {
  mainWord: string,
  translateWord: string,
  isTrueTranslate: boolean,
}

export default function Sprint() {
  const params: { num: string | undefined } = useParams();
  const [words, setWords] = useState<Promise<any>>();
  const [errorFetch, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [checkbox, setCheckbox] = useState(0);
  const isVolume = true;
  const bonus = 10;
  const { num } = params;
  let currentWord: ICurrentWord = {
    mainWord: "",
    translateWord: "",
    isTrueTranslate: false,
  };

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

  function handleClick(event: any) {
    const btn = event.target.innerHTML === "Верно";
    if (btn === currentWord.isTrueTranslate) {
      setScore(score + bonus);
    }
    if (checkbox < 3) {
      setCheckbox(checkbox + 1);
    } else {
      setCheckbox(0);
    }

    console.log(checkbox);
  }

  return (
    <div className="sprint" >
      <h2 className="sprint__header">sprint</h2>
      <SprintHeader isVolume={isVolume} score={score} />
      <Points bonus={bonus} />
      <div className="sprint__words-container">
        <h3 className="sprint__words">
          {currentWord.mainWord}
        </h3>
        <h4 className="sprint__translate">
          {currentWord.translateWord}
        </h4>
      </div>
      <div>
        <Button variant="contained" color="secondary" id="asd" onClick={handleClick}>
          Неверно
        </Button>
        <Button variant="contained" color="primary" id="fasf" onClick={handleClick}>
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
