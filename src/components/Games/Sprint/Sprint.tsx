import React, {
  useEffect, useState, useCallback, ReactEventHandler,
} from "react";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./sprint.scss";
import Points from "./Points";
import SprintHeader from "./SprinInterface";
import Begin from "./Begin";

const random = (max: number): number => {
  const min = 0;
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

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
  const [checkbox, setCheckbox] = useState([]);
  const isVolume = true;
  const [bonus, setBonus] = useState(10);
  const [finish, setFinish] = useState(false);
  const [begin, setBegin] = useState(true);
  const { num } = params;
  let currentWord: ICurrentWord = {
    mainWord: "",
    translateWord: "",
    isTrueTranslate: false,
  };

  const URL = `http://localhost:3001/words?group=${Number(num) - 1}&page=1`;

  // const shufleWords = (words: Promise<Array<{}>) => {
  //   if (words) {
  //     words.sort(() => Math.random() - 0.5);
  //   }
  //   return words;
  // };

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
    wordData.isTrueTranslate = Boolean(Math.round(Math.random()));
    const numOfWord = random(words.length - 1);
    const numFakeWord = words.length < 19 ? numOfWord + 1 : numOfWord - 1;
    wordData.mainWord = playWords ? playWords[numOfWord].word : playWords;
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

  useEffect(() => {
    if (checkbox.length === 3) {
      const checked = checkbox.indexOf(false);
      if (checked === -1) {
        setBonus(bonus * 2);
        console.log(bonus);
      } else {
        setBonus(10);
      }
    }
  }, [checkbox.length]);

  function handleClick(event: any) {
    const addCheckbox = (state: boolean) => {
      if (checkbox.length < 3) {
        setCheckbox([...checkbox, state]);
      } else {
        setCheckbox([state]);
      }
    };
    const btn = event.target.innerHTML === "Верно" || event.key === "ArrowRight";

    // onst btn = event.key === ;

    console.log(btn);
    console.log(currentWord.isTrueTranslate);
    if (btn === currentWord.isTrueTranslate) {
      setScore(score + bonus);
      addCheckbox(true);
    } else {
      addCheckbox(false);
    }
  }

  if (begin) {
    return (
      <Begin setBegin={setBegin}/>
    );
  }

  if (errorFetch) {
    return <div>Ошибка: {errorFetch.message}</div>;
  }

  if (!isLoaded) {
    return <div>Загрузка...</div>;
  }

  if (finish) {
    return (
      <div className="sprint">
        <h2 className="sprint__header">Результаты</h2>
        <div className="sprint__words-container">
          <div>{score} очков</div>
          <div>{score / 2} опыта</div>
        </div>
        Ваш рекорд {score};
      </div>
    );
  }

  return (
    <div className="sprint" >
      <h2 className="sprint__header">sprint</h2>
      <SprintHeader setFinish={setFinish} isVolume={isVolume} score={score} />
      <Points bonus={bonus} checkbox={checkbox} key={Date.now()} />
      <div className="sprint__words-container">
        <h3 className="sprint__words">
          {currentWord.mainWord}
        </h3>
        <h4 className="sprint__translate">
          {currentWord.translateWord}
        </h4>
      </div>
      <div className="sprint__button">
        <Button variant="contained" color="secondary" onClick={handleClick} >
          Неверно
        </Button>
        <Button variant="contained" color="primary" onClick={handleClick} onKeyDown={handleClick}>
          Верно
        </Button>
      </div>
    </div>
  );
}

