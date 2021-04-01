import React, {useEffect, useState} from "react";
import Pagination from "../../Pagination/Pagination";

interface IWord {
  id: string
  group: number
  page: number
  word: string
  image: string
  audio: string
  audioMeaning: string
  audioExample: string
  textMeaning: string
  textExample: string
  transcription: string
  textExampleTranslate: string
  textMeaningTranslate: string
  wordTranslate: string
}

const TextbookPage: React.FC = () => {

  const group = 1;
  const page = 1;
  const url = `https://rslernwords.herokuapp.com/words?group=${group - 1}&page=${page - 1}`;

  const [pageWords, setPageWords] = useState([]);

  function getWords() {
    fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        setPageWords(jsonData);
      });
  }

  useEffect(() => {
    getWords();
  }, []);

  console.log("pageWords", pageWords);

  return (

    <div>
      <h3>Textbook</h3>
      <div>{pageWords.map((wordObj: IWord) => (

        <div key={wordObj.id}>{wordObj.word}</div>
        )
      )}
      </div>

      <Pagination />
    </div>

  )
};

export default TextbookPage;