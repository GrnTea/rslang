import React, {
  useEffect, useState, useCallback, useRef,
} from "react";
import useSound from "use-sound";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { connect } from "react-redux";
import ResetGame from "../AudioCall/ResetGame";
import "./sprint.scss";
import Points from "./Points";
import SprintHeader from "./SprinInterface";
import Begin from "./Begin";
import correct from "../../../assets/sound/correct-choice.wav";
import wrong from "../../../assets/sound/error.wav";
import {
  ERROR, URL, ERROR_WORD, RIGHT_ARROW, RIGHT,
} from "./sprintconstants";

const random = (max: number): number => {
  const min = 0;
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

interface ICurrentWord {
  word: string,
  wordTranslate: string,
  isTrueTranslate: boolean,
  id: string,
}

function Sprint(props: any) {
  console.log(props);
  const params: { num: string | undefined } = useParams();
  const sprintEl = useRef(null);
  const [words, setWords] = useState<Promise<{}[]>>();
  const [errorFetch, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [score, setScore] = useState(0);
  const [checkbox, setCheckbox] = useState<boolean[]>([]);
  const [bonus, setBonus] = useState(10);
  const [finish, setFinish] = useState(false);
  const [begin, setBegin] = useState(true);
  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong);
  const [trueAnswer, setTrueanswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);
  const [rightAnswers, setRightAnswers] = useState<ICurrentWord[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<ICurrentWord[]>([]);
  const { num } = params;
  const isVolume = true;
  const [currentWord, setCurrentWord] = useState<ICurrentWord>({
    word: "",
    wordTranslate: "",
    isTrueTranslate: false,
    id: "",
  });

  const url = `${URL}/words?group=${Number(num) - 1}&page=1`;

  useEffect(() => {
    setIsLoaded(false);
    fetch(url)
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
      word: "",
      wordTranslate: ERROR_WORD,
      id: "",
      isTrueTranslate: false,
    };
    const playWords = JSON.parse(JSON.stringify(words));
    wordData.isTrueTranslate = Boolean(Math.round(Math.random()));
    const numOfWord = random(words.length - 1);
    const numFakeWord = words.length < 19 ? numOfWord + 1 : numOfWord - 1;
    wordData.id = playWords.id;
    wordData.word = playWords ? playWords[numOfWord].word : playWords;
    try {
      wordData.wordTranslate = wordData.isTrueTranslate
        ? playWords[numOfWord].wordTranslate : playWords[numFakeWord].wordTranslate;
    } catch (e) {
      console.log(ERROR + e);
    }
    console.log(wordData);
    setCurrentWord(wordData);
    return wordData;
  }, [num]);

  useEffect(() => {
    if (isLoaded && words) {
      playGame(words);
    }
  }, [checkbox.length]);

  useEffect(() => {
    if (isLoaded && words) {
      playGame(words);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (checkbox.length === 3) {
      const checked = checkbox.indexOf(false);
      if (checked === -1) {
        setBonus(bonus * 2);
      } else {
        setBonus(10);
      }
    }
  }, [checkbox.length]);

  function fullscreen() {
    const x = sprintEl.current;
    x.webkitRequestFullScreen();
    if (document.fullscreenEnabled) {
      document.webkitCancelFullScreen();
    }
  }

  function handleClick(event: any) {
    const addCheckbox = (state: boolean) => {
      if (checkbox.length < 3) {
        setCheckbox([...checkbox, state]);
      } else {
        setCheckbox([state]);
      }
    };
    const btn = event.target.innerHTML === RIGHT || event.key === RIGHT_ARROW;
    if (btn === currentWord.isTrueTranslate) {
      setScore(score + bonus);
      playCorrect();
      addCheckbox(true);
      setRightAnswers([...rightAnswers, currentWord]);
      setTrueanswer(trueAnswer + 1);
    } else {
      playWrong();
      addCheckbox(false);
      setWrongAnswers([...wrongAnswers, currentWord]);
      setFalseAnswer(falseAnswer + 1);
    }
    console.log(rightAnswers, wrongAnswers);
  }

  if (begin) {
    return (
      <Begin setBegin={setBegin} />
    );
  }

  if (errorFetch) {
    return <div>Ошибка: {errorFetch.message}</div>;
  }

  if (!isLoaded) {
    return <div>Загрузка...</div>;
  }

  function beginNow() {
    setScore(0);
    setCheckbox([]);
    setBonus(10);
    setFinish(false);
    setBegin(true);
  }

  if (finish) {
    return (
      <ResetGame
        rightAnswersCounter={trueAnswer}
        wrongAnswersCounter={falseAnswer}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
        resetgame={beginNow}
      />
    );
  }

  return (
    <div ref={sprintEl} className="sprint">
      <h2 className="sprint__header">sprint</h2>
      <SprintHeader setFinish={setFinish} isVolume={isVolume} score={score} />
      <Points bonus={bonus} checkbox={checkbox} key={Date.now()} />
      <div className="sprint__words-container">
        <h3 className="sprint__words">
          {currentWord.word}
        </h3>
        <h4 className="sprint__translate">
          {currentWord.wordTranslate}
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
      <Button variant="contained" onClick={fullscreen}>
        <AspectRatioIcon />
      </Button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  game: state.game,
});

export default connect(mapStateToProps, null)(Sprint);
