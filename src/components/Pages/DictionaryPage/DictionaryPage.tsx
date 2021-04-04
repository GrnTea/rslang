import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer";
import DictionaryStyles from "./DicrionaryPageStyles";
import {useParams, useRouteMatch} from 'react-router';
import WordsCategory from "./WordsCategory";
// import DifficultWords from "./DifficultWords";
// import DeletedWords from "./DeletedWords";

type Props = {
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

const DictionaryPage: React.FC<Props> = ({ lang, user }) => {
  const { sectionId } = useParams();
  const useStyles = DictionaryStyles();
  const [category, setCategory] = useState("studiedWords");
  const filters = {
      studing: '{"userWord.optional.studed":"true"}',
      difficult: '{"$and":[{"userWord.difficulty":"true", "userWord.optional.deleted":"false"}]}',
      deleted: '{"userWord.optional.deleted":"true"}'
  }

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
          { category === "studiedWords" ? 
          <WordsCategory user={user} section={sectionId} filter={filters.studing}/>
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
  