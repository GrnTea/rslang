import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer";
import DictionaryStyles from "./DicrionaryPageStyles";
import CardOfWord from "./components/CardForWord/CardForWord";
import {useParams, useRouteMatch} from 'react-router';

type Props = {
    lang: string
}

const TEXTS = {
    en: {
        mainTitle: "Dictionary",
        studiedWords: "Studied",
        difficultWords: "Difficult",
        removedWords: "Deleted",
        toDifficultBtn: "To difficult",
        deleteBtn: "Delete",
        placeholderTab: "The list of words is empty.",
        section: "Section"
    },
    ru: {
        mainTitle: "Словарь",
        studiedWords: "Изучаемые",
        difficultWords: "Сложные",
        removedWords: "Удаленные",
        toDifficultBtn: "В сложные",
        deleteBtn: "Удалить",
        placeholderTab: "Список слов пуст.",
        section: "Раздел"
    }
};

const DictionaryPage: React.FC<Props> = ({ lang }) => {
  const { sectionId } = useParams();
  const useStyles = DictionaryStyles();
  const [category, setCategory] = useState("studiedWords");
  const [listOfWords, setListOfWords] = useState([]);

  useEffect(() => {
    fetch(`https://rslernwords.herokuapp.com/words?group=${sectionId}&page=1`)
      .then(
        (response) => response.json(),
      )
      .then((jsonData) => {
        setListOfWords(jsonData);
      });
  }, [sectionId]);

  return (
      <div>
          <h1>{`${TEXTS[lang].mainTitle} ->  ${TEXTS[lang].section} ${sectionId}`}</h1>
          <div className={useStyles.dictionaryMenu}>
              <button className={useStyles.dictionaryMenuItem} onClick={() => { setCategory("studiedWords"); }}>
                  {TEXTS[lang].studiedWords}
              </button>
              <button className={useStyles.dictionaryMenuItem} onClick={() => { setCategory("difficultWords"); }}>
                  {TEXTS[lang].difficultWords}
              </button>
              <button className={useStyles.dictionaryMenuItem} onClick={() => { setCategory("removedWords"); }}>
                  {TEXTS[lang].removedWords}
              </button>
          </div>
          {/* { category === "studiedWords" ? "studiedWords" : category === "difficultWords" ? "difficultWords" : "removedWords"} */}
          <div className={useStyles.cards}>
              {
                  listOfWords.map((card) => <CardOfWord key={card.id} cardInfo={card} />)
              }
          </div>
      </div>
  );
};

const mapStateToProps = (state:RootState) => ({
    lang: state.settingsReducer.lang.lang,
  });
  
  export default connect(mapStateToProps)(DictionaryPage);
  