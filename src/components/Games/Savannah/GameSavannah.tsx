import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
} from "react-router-dom";
import ResetGame from "../ResetGame/ResetGame";
import "./gameSavannah.css";
import useSound from "use-sound";
import succes from "../../../assets/sound/succes.mp3";
import error from "../../../assets/sound/error.mp3";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

import FullScreenButton from "./FullScreenButton";
import API_URL from "../../Constants/constants";

import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer";

const URL = API_URL;

function GameSavannah({ game, user }) {
  const { difficulty, page } = useParams();
  let pageCounter: number = Number(page);

  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [displayWords, setDisplayWords] = useState([]);
  let [gravityCounter, setGravityCounter] = useState(0);
  const [lifeCounter, setLifeCounter] = useState(2);


  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const [endGame, setEndGame] = useState(false);
  const [wordsDisplayedOnTheScreen, setWordsDisplayedOnTheScreen] = useState("");

  const [playError] = useSound(error);

  const filters = {
    studying: "{\"$and\":[{\"userWord.optional.studying\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
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
      UserStudying: `${API_URL}users/${user.id}/aggregatedWords?group=${Number(difficulty) - 1}&page=0&filter=${filters.studying}&wordsPerPage=20`,
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
          if (game.gameFrom === "DICTIONARY") {
            initGame(result[0].paginatedResults)
          } else {
            // console.log(result)
            initGame(result)
          }
        },
        (error) => {
          console.log(error);
        },
      );
  }


  function initGame(data) {
    if(data.length < 20) {
      addData(data);
    }

    const dataShuffle = shuffle(data);

    setWord(dataShuffle.pop());
    setData(dataShuffle);
  }
  

  function getData() {
    if (game.gameFrom === "DICTIONARY") {
      fetchingData(getUrl(pageCounter, "UserDiff"));
    } else {
      fetchingData(getUrl(pageCounter, "All"));
    }
  }

  useEffect(() => {
    getData();
  }, [difficulty]);


  function addData(data: any) {
    let data3;
    let currentDifficulty = data[0].group;
    fetch(`${API_URL}words?group=${Number(currentDifficulty)}&page=${Number(page)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(test => {
      let data2 = test.filter(elem => {
        if(!data.includes(elem)){
          return elem;
        }
        return;
      })

      data3 = [...data, ...data2];
      data3 = data3.splice(0, 20);
      data3 = shuffle(data3);

      setWord(data3.pop());
      setData(data3);
    }).catch(error => {
      console.log(error)
    })
  }

  

  useEffect(() => {
    if (counter === 0) return;

    setWord(data.pop());
    setData(data);
  }, [counter]);

  // запушить новую пачку слов в стейт для отображения на экране
  useEffect(() => {
    let res = data.filter((elem, index) => {
      if (index > 2) return;
      return elem;
    });

    res.push(word);
    res = shuffle(res);
    setDisplayWords(res);
  }, [data, word]);

  // запрос следующей партии слов и слова при бездействии пользователя
  useEffect(() => {
    if (gravityCounter < 170) return;

    setGravityCounter(0);
    setCounter((prev) => prev + 1);
    setLifeCounter((prev) => prev - 1);
    addAnswers(word, setWrongAnswers, wrongAnswers);
    playError();
  }, [gravityCounter]);

  //  проверка ответа
  function checkWord(e: any) {
    const selectElemValue = e.target.dataset.value;
    const selectElem = e.target;
    const currentElem = document.querySelector(`[data-value="${word.word}"]`);

    const resetWorld = (time: number) => {
      setTimeout(() => {
        setGravityCounter(0);
        setCounter((prev) => prev + 1);
      }, time);
    };

    if (selectElemValue === word.word) {
      selectElem.classList.add("guess");
      audioPlay(succes);
      resetWorld(500);
      // передаём слово, стейт правильных или не правильных ответов, состояние
      addAnswers(word, setRightAnswers, rightAnswers);
    } else {
      selectElem.classList.add("not-guess");
      currentElem.classList.add("guess");
      audioPlay(error);
      resetWorld(1500);
      setLifeCounter((prev) => prev - 1);
      addAnswers(word, setWrongAnswers, wrongAnswers);
    }
  }

  function addAnswers(word, state, elems) {
    if (elems.length === 0) {
      state([word]);
    } else {
      const copy = elems;
      copy.push(word);
      state(copy);
    }
  }

  function audioPlay(src) {
    const audio = new Audio(src);
    audio.play();
  }

  // сброс стилей угадал / не угадал
  useEffect(() => {
    if (counter === 0) return;
    document.querySelectorAll(".word-display").forEach((elem, index) => {
      elem.classList.remove("guess");
      elem.classList.remove("not-guess");
    });
  }, [counter]);

  // движение слова вниз
  useEffect(() => {
    if (endGame === true) return;

    const elem = document.querySelector(".word-absolute");

    const intervalId = setInterval(() => {
      gravityCounter++;
      setGravityCounter(gravityCounter);

      elem.style.top = `${gravityCounter}px`;
    }, 50);

    return () => clearInterval(intervalId);
  }, [gravityCounter, endGame]);

  function shuffle(array: any) {
    return array.sort(() => Math.random() - 0.5);
  }

  // конец игры
  useEffect(() => {
    if (counter === 10 || lifeCounter <= 0) {
      setEndGame(true);
    }
  }, [counter, lifeCounter]);

  useEffect(() => {
    const res = displayWords.map((elem, index) => (
      <div
        data-value={elem.word}
        className="word-display"
        key={index}
        onClick={(e) => checkWord(e)}
      >
        {elem.wordTranslate}
      </div>
    ));

    setWordsDisplayedOnTheScreen(res);
  }, [displayWords]);

  function resetgame() {
    setLifeCounter(2);
    setGravityCounter(0);
    setCounter(0);
    setEndGame(false);
    setRightAnswers([]);
    setWrongAnswers([]);
    getData();
  }

  return (
    <>
      {endGame === false
        ? <div className="words-container">
          <div className="words-display">
            <div className="life-container">
              <div className="life-counter">{lifeCounter}</div>
              <FavoriteTwoToneIcon className="life-icon" />
            </div>

            <div className="word-absolute">{word.word}</div>
            {wordsDisplayedOnTheScreen}
          </div>
          <div className="fullscreen-button">
            <FullScreenButton />
          </div>
          <input className="input-hidden" type="hidden" onClick={() => audioPlay(error)} />
        </div>

        : <ResetGame
          maxSerie={rightAnswers.length}
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          resetgame={resetgame}
          gameId={"1"}
        />
      }
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  game: state.game,
  user: state.user,
  lang: state.settingsReducer.lang.lang,
});

export default connect(mapStateToProps)(GameSavannah);
