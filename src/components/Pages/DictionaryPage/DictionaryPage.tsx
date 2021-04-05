import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../../redux/reducer";
import DictionaryStyles from "./DicrionaryPageStyles";
import WordsCategory from "./WordsCategory";

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
  const [category, setCategory] = useState("studiedWords");
  const filters = {
    studing: "{\"$and\":[{\"userWord.studing\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    difficult: "{\"$and\":[{\"userWord.difficulty\":\"true\", \"userWord.optional.deleted\":\"false\"}]}",
    deleted: "{\"userWord.optional.deleted\":\"true\"}",
  };

  return (
    <div className={useStyles.dictionaryContainer}>
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
          { category === "studiedWords"
            ? <WordsCategory user={user} section={sectionId} filter={filters.studing}/>
            : category === "difficultWords" ? <WordsCategory user={user} section={sectionId} filter={filters.difficult}/>
              : <WordsCategory user={user} section={sectionId} filter={filters.deleted} />}
    </div>
  );
};

const mapStateToProps = (state:RootState) => ({
  lang: state.settingsReducer.lang.lang,
  user: state.user,
});

export default connect(mapStateToProps)(DictionaryPage);
