import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../../redux/reducer";
import DictionaryStyles from "./DicrionaryPageStyles";
import WordsCategory from "./WordsCategory";

import CardOfWord from "./components/CardForWord/CardForWord";
import BookToGame from "../../Pages/TextbookPage/BookToGame";

type Props = {
    lang: string,
    user: any
}

interface IDictionaryProps {
    lang: string,
    user: any
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
    section: "Section",
  },
  ru: {
    mainTitle: "Словарь",
    studiedWords: "Изучаемые",
    difficultWords: "Сложные",
    removedWords: "Удаленные",
    toDifficultBtn: "В сложные",
    deleteBtn: "Удалить",
    placeholderTab: "Список слов пуст.",
    section: "Раздел",
  },
};

const DictionaryPage: React.FC<Props> = ({ lang, user }: IDictionaryProps) => {
  const { sectionId } = useParams();
  const useStyles = DictionaryStyles();
  const [category, setCategory] = useState("studying");
  const filters = {
    studying: "{\"$and\":[{\"userWord.studing\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    difficult: "{\"$and\":[{\"userWord.difficulty\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    deleted: "{\"userWord.optional.deleted\":\"true\"}",
  };

  return (
    user.id ?
    <div className={useStyles.dictionaryContainer}>
      <h1>{`${TEXTS[lang].mainTitle} ->  ${TEXTS[lang].section} ${sectionId}`}</h1>
      <BookToGame difficulty={sectionId} page={0} />
      <div className={useStyles.dictionaryMenu}>
          <button className={useStyles.dictionaryMenuItem} onClick={() => { setCategory("studying") }}>
              {TEXTS[lang].studiedWords}
          </button>
          <button className={useStyles.dictionaryMenuItem} onClick={() => { setCategory("difficult") }}>
              {TEXTS[lang].difficultWords}
          </button>
          <button className={useStyles.dictionaryMenuItem} onClick={() => { setCategory("deleted") }}>
              {TEXTS[lang].removedWords}
          </button>
      </div>
      <WordsCategory user={user} section={sectionId} filter={filters[category]}/>
    </div> : <div className={useStyles.emptyTab}>User is not logged!</div>
  );
};

const mapStateToProps = (state:RootState) => ({
  lang: state.settingsReducer.lang.lang,
  user: state.user,
});

export default connect(mapStateToProps)(DictionaryPage);
