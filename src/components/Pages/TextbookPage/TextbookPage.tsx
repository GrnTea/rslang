import React, {useEffect, useState} from "react";
import Pagination from "../../Pagination/Pagination";
//import Pagination from "@material-ui/lab/Pagination";
import {useParams, useRouteMatch} from "react-router";

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

  const { sectionId, pageId } = useParams();
  let { path, url } = useRouteMatch();
  console.log('tbook: path url', path, url, 'ids:', sectionId, pageId);

  /*const group = 1;
  const page = 1;*/
  const wordsUrl = `https://rslernwords.herokuapp.com/words?group=${sectionId - 1}&page=${pageId - 1}`;

  const [pageWords, setPageWords] = useState([]);

  function getWords() {
    fetch(wordsUrl)
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        setPageWords(jsonData);
      });
  }

  useEffect(() => {
    getWords();
  }, [wordsUrl]);

  console.log("pageWords", pageWords);

  return (

    <div>
      <h3>Textbook</h3>
      <div>
        {pageWords.map((wordObj: IWord) => (
          <div key={wordObj.id}>{wordObj.word}</div>
        ))}
      </div>

      <Pagination page={pageId} count={20} />
    </div>

  )
};

export default TextbookPage;
