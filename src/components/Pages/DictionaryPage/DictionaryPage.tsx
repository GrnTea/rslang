import React, { useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducer";
import DictionaryStyles from "./DicrionaryPageStyles";

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
        placeholderTab: "Список слов пуст."
    }
}

const DictionaryPage: React.FC<Props> = ({lang}) => {
    const useStyles = DictionaryStyles();
    const [category, setCategory] = useState("studiedWords");

    return (
        <div>
            <h1>{TEXTS[lang].mainTitle}</h1>
            <div className={useStyles.dictionaryMenu}>
                <button className={useStyles.dictionaryMenuItem} onClick={() => {setCategory("studiedWords")}}>
                    {TEXTS[lang].studiedWords}
                </button>
                <button className={useStyles.dictionaryMenuItem} onClick={() => {setCategory("difficultWords")}}>
                    {TEXTS[lang].difficultWords}
                </button>
                <button className={useStyles.dictionaryMenuItem} onClick={() => {setCategory("removedWords")}}>
                    {TEXTS[lang].removedWords}
                </button>
            </div>
            { category === "studiedWords" ? "studiedWords" : category === "difficultWords" ? "difficultWords" : "removedWords"}
        </div>
    )
}

const mapStateToProps = (state:RootState) => ({
    lang: state.lang.lang,
  });
  
  export default connect(mapStateToProps)(DictionaryPage);
  