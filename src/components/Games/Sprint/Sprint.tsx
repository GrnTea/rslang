import React, {
  useEffect, useState, useCallback, useRef,
} from "react";
import useSound from "use-sound";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { connect } from "react-redux";
import { Key } from "readline";
import ResetGame from "../ResetGame/ResetGame";
import "./sprint.scss";
import Points from "./Points";
import SprintHeader from "./SprinInterface";
import Begin from "./Begin";
import correct from "../../../assets/sound/correct-choice.wav";
import wrong from "../../../assets/sound/error.wav";
import {
  ERROR, ERROR_WORD, RIGHT_ARROW, RIGHT, DICTIONARY, Buttons,
  IButtons,
} from "./sprintconstants";
import { RootState } from "../../../redux/reducer";
import API_URL from "../../Constants/constants";

const random = (max: number): number => {
  const min = 0;
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

interface ICurrentWord {
  word: string,
  wordTranslate: string,
  isTrueTranslate: boolean,
  id?: string,
  _id?: string,
}

interface IWordData {
  word: string,
  wordTranslate: string,
  id: string | undefined,
  isTrueTranslate: boolean,
}

function Sprint({ game, user, lang }: { game: { gameFrom: string }, user: { id: any, token: any }, lang: any }) {
  const { difficulty, page }: { difficulty: string, page: string } = useParams();
  let pageCounter: number = Number(page);
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
  const [playWords, setPlayWords] = useState<ICurrentWord[]>([]);

  const isVolume = true;
  const [currentWord, setCurrentWord] = useState<ICurrentWord>({
    word: "",
    wordTranslate: "",
    isTrueTranslate: false,
    id: "",
  });

  const filters = {
    studing: "{\"$and\":[{\"userWord.optional.studying\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    difficult: "{\"$and\":[{\"userWord.difficulty\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    deleted: "{\"userWord.optional.deleted\":\"true\"}",
    not_deleted: "{\"userWord.optional.deleted\":\"false\"}",
  };

  interface IGetURL {
    [key: string]: string;
  }

  function getUrl(numOfPage: number, urlKey: string) {
    const url:IGetURL = {
      All: `${API_URL}words?group=${Number(difficulty) - 1}&page=${numOfPage}`,
      UserAll: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=${numOfPage}&filter=${filters.not_deleted}&wordsPerPage=20`,
      UserDiff: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=0&filter=${filters.difficult}&wordsPerPage=20`,
      UserStuding: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=0&filter=${filters.studing}&wordsPerPage=20`,
    };
    return url[urlKey];
  }

  function fetchingData(url: string) {
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (game.gameFrom === DICTIONARY) {
            setWords(result[0].paginatedResults);
          } else {
            setWords(result);
          }
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error);
        },
      );
    return function cleanup() {
      setWords([]);
    };
  }

  useEffect(() => {
    if (game.gameFrom === DICTIONARY) {
      fetchingData(getUrl(pageCounter, "UserDiff"));
    } else {
      fetchingData(getUrl(pageCounter, "All"));
    }
    setIsLoaded(false);
  }, [difficulty]);

  const playGame = useCallback((wordArr: ICurrentWord[]) => {
    const wordData: IWordData = {
      word: "",
      wordTranslate: ERROR_WORD,
      id: "",
      isTrueTranslate: false,
    };

    wordData.isTrueTranslate = Boolean(Math.round(Math.random()));
    const numOfWord = random(wordArr.length - 1);
    const numFakeWord = numOfWord < wordArr.length ? numOfWord + 1 : numOfWord - 1;
    wordData.word = wordArr ? wordArr[numOfWord].word : wordArr;
    const idCheck = game.gameFrom === DICTIONARY ? "_id" : "id";
    wordData.id = wordArr ? wordArr[numOfWord][idCheck] : wordArr;
    try {
      wordData.wordTranslate = wordData.isTrueTranslate
        ? wordArr[numOfWord].wordTranslate : wordArr[numFakeWord].wordTranslate;
    } catch (e) {
      console.log(ERROR + e);
    }
    setPlayWords(wordArr.filter((item, index) => numOfWord !== index));
    if (wordArr.length === 1) {
      if (game.gameFrom === DICTIONARY) {
        setFinish(true);
      }
      pageCounter += 1;
      if (pageCounter === 31) setFinish(true);
      fetchingData(getUrl(pageCounter, "All"));
      setIsLoaded(false);
    }

    setCurrentWord(wordData);
    return wordData;
  }, [difficulty]);

  useEffect(() => {
    if (isLoaded && words) {
      playGame(playWords);
    }
  }, [checkbox.length]);

  useEffect(() => {
    if (isLoaded && words) {
      setPlayWords(JSON.parse(JSON.stringify(words)));
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
    const x: any = sprintEl.current;
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
  }

  function restart() {
    setScore(0);
    setCheckbox([]);
    setBonus(10);
    setFinish(false);
    setBegin(true);
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

  if (finish) {
    return (
      <ResetGame
        maxSerie={trueAnswer}
        rightAnswers={rightAnswers}
        wrongAnswers={wrongAnswers}
        resetgame={restart}
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
          {Buttons[lang].rightButton}
        </Button>
        <Button variant="contained" color="primary" onClick={handleClick} onKeyDown={handleClick}>
          {Buttons[lang].wrongButton}
        </Button>
      </div>
      <Button variant="contained" onClick={fullscreen}>
        <AspectRatioIcon />
      </Button>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  game: state.game,
  user: state.user,
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps, null)(Sprint);

// function updateListOfUserWords(data: any, metod: string, url: string, authorizationToken: string): void {
//   fetch(url, {
//     method: metod,
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${authorizationToken}`,
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw Error(response.statusText);
//       }
//       return response;
//     })
//     .catch((error) => { alert(error); });
// }

// const handleSetAsDifficult = (url, userId, cardInfo, authorizationToken) => {
//   const data = {
//     optional: {
//       studing: "true",
//     },
//   };

//   const urlRequest = `${url}users/${userId}/words/${cardInfo.id}`;
//   updateListOfUserWords(data, "POST", urlRequest, authorizationToken);
// };
