import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer";
import DictionaryStyles from "./DicrionaryPageStyles";
import CardOfWord from "./components/CardForWord/CardForWord";

type Props = {
    lang: string
}

const TEXTS = {
  en: {
    mainTitle: "Dictionary",
    studiedWords: "Studied",
    difficultWords: "Сomplicated",
    removedWords: "Deleted",
    toDifficultBtn: "To difficult",
    deleteBtn: "Delete",
    placeholderTab: "The list of words is empty.",
  },
  ru: {
    mainTitle: "Словарь",
    studiedWords: "Изученные",
    difficultWords: "Сложные",
    removedWords: "Удаленные",
    toDifficultBtn: "В сложные",
    deleteBtn: "Удалить",
    placeholderTab: "Список слов пуст.",
  },
};

const DictionaryPage: React.FC<Props> = ({ lang }) => {
  const useStyles = DictionaryStyles();
  const [category, setCategory] = useState("studiedWords");
  const [listOfWords, setListOfWords] = useState([]);

  useEffect(() => {
    fetch("https://rslernwords.herokuapp.com/words?group=1&page=1")
      .then(
        (response) => response.json(),
      )
      .then((jsonData) => {
        setListOfWords(jsonData);
      });
  }, []);

  return (
        <div>
            <h1>{TEXTS[lang].mainTitle}</h1>
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
