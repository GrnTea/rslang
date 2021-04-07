import React, { useState, useEffect } from "react";
import SpeakerIcon from "@material-ui/icons/Speaker";
import LinearProgress from "@material-ui/core/LinearProgress";

import { connect } from "react-redux";
import useSound from "use-sound";
import {
  useParams,
} from "react-router-dom";
import WordUpdate from "../WordUpdate/WordUpdate";
import { RootState } from "../../../redux/reducer";

import DisplayWordsComponent from "./DisplayWordsComponent";
import ResetGame from "../ResetGame/ResetGame";
import FullScreenButton from "./FullScreenButton";

import "./game.css";
import API_URL from "../../Constants/constants";

const URL = API_URL;

function GameAudioCall({ user }) {
  const { difficulty, page } = useParams();

  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState({});
  const [showImage, setShowImage] = useState(false);

  const [displayWords, setDisplayWords] = useState([]);

  const [trueAnswer, setTrueanswer] = useState(0);
  const [falseAnswer, setFalseAnswer] = useState(0);
  const [startGame, setStartGame] = useState(true);

  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const [maxSerie, setMaxSerie] = useState(0);

  function initGame() {
    fetch(`${URL}words?group=${difficulty - 1}&page=${page}`)
      .then((response) => response.json())
      .then((jsonData) => {
        const dataShuffle = shuffle(jsonData);

        setWord(dataShuffle.pop());
        setData(dataShuffle);
      });
  }

  useEffect(() => {
    initGame();
  }, []);

  // -------
  useEffect(() => {
    if (counter === 0) return;

    setWord(data.pop());
    setData(data);
  }, [counter]);

  useEffect(() => {
    if (startGame !== true) return;
    if (counter === 0) return;

    playWord();
  }, [word]);

  useEffect(() => {
    if (counter === 3) {
      setStartGame(false);
    }
  }, [counter]);

  useEffect(() => {
    let res = data.filter((elem, index) => {
      if (elem.word === word.word) return;
      if (index > 3) return;

      return elem.word;
    });

    res.push(word);
    res = shuffle(res);

    setDisplayWords(res);
  }, [data, word]);

  function playWord() {
    const audio = new Audio(URL + word.audio);
    audio.play();
  }

  function addAnswers(word: any, state: any, elems: any) {
    if (elems.length === 0) {
      state([word]);
    } else {
      const copy = elems;
      copy.push(word);
      state(copy);
    }
  }

  function checkWord(e) {
    const targetElem = e.target;
    let currentElem: any;
    if (e.target.dataset.value === word.word) {
      setShowImage(true);
      setTrueanswer((prev) => prev + 1);
      addAnswers(word, setRightAnswers, rightAnswers);
      setMaxSerie((prev) => prev + 1);

      targetElem.classList.add("guessed");
      setTimeout(() => {
        setShowImage(false);
        setCounter((prev) => prev + 1);
        targetElem.classList.remove("guessed");
      }, 2000);
    } else {
      currentElem = document.querySelector(`[data-value="${word.word}"]`);
      targetElem.classList.add("no-guessed");
      currentElem.classList.add("guessed");
      setShowImage(true);
      setFalseAnswer((prev) => prev + 1);
      addAnswers(word, setWrongAnswers, wrongAnswers);
      setMaxSerie(0);

      setTimeout(() => {
        targetElem.classList.remove("no-guessed");
        currentElem.classList.remove("guessed");
        setShowImage(false);
        setCounter((prev) => prev + 1);
      }, 2000);
    }
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function rebootGame() {
    setCounter(0);
    setTrueanswer(0);
    setFalseAnswer(0);
    setCounter(0);
    setWord({});
    setData([]);
    setDisplayWords([]);
    setStartGame(true);
    setRightAnswers([]);
    setWrongAnswers([]);
    initGame();
  }

  const LinearProgressStyles = {
    color: "primary",
    marginTop: "10px",
    width: "600px",
    height: "5px",
    margin: "0 auto",
    marginBottom: "20px",
  };

  const SpeakerIconStyles = {
    fontSize: 100,
    color: "#3498db",
    cursor: "pointer",
    margin: "0 auto",
  };

  return (
    <>
      {startGame
        ? <div className="game-body-container">

          <div className="content-conteiner">
            <LinearProgress style={{ ...LinearProgressStyles }} variant="determinate" value={counter * 10} />

            <div className="content">
              <DisplayWordsComponent displayWords={displayWords} checkWord={checkWord} />

              <div className="word-image">
                {showImage ? <img className="game-image" src={URL + word.image} alt="" /> : ""}
              </div>

              <div className="speaker-icon">
                <SpeakerIcon style={{ ...SpeakerIconStyles }} onClick={() => playWord()} />
              </div>
            </div>

            <div className="fullscreen-button">
              <FullScreenButton />
            </div>
          </div>
        </div>
        : <ResetGame
          rightAnswers={rightAnswers}
          wrongAnswers={wrongAnswers}
          resetgame={rebootGame}
          maxSerie={maxSerie}
          gameId={"2"}
        />
      }
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(GameAudioCall);
