import React, { useState } from 'react';
import LearnSettingsStyles from "./LearnSettingsStyles";
import FormControl from '@material-ui/core/FormControl';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { connect } from "react-redux";
import  { RootState }  from "../../../../../redux/reducer";
import { toggleButtonsSettings, toggleCardSetting } from "../../../../../redux/learning-settings_reducer";
import { FormControlLabel, FormGroup, FormLabel, withStyles } from '@material-ui/core';

const BlueCheckbox = withStyles({
    root: {
      color: "#1665B4",
      '&$checked': {
        color: "#1665B4",
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const TEXTS = {
    en: {
        mainTitle: "CARDS VIEW SETTINGS",
        buttonSettings: "BUTTON DISPLAY SETTINGS",
        cardSettings: "CARD DISPLAY SETTINGS",
    },
    ru: {
        mainTitle: "НАСТРОЙКИ ИЗУЧЕНИЯ СЛОВ",
        buttonSettings: "НАСТРОЙКИ ОТОБРАЖЕНИЯ КНОПОК",
        cardSettings: "НАСТРОЙКИ ОТОБРАЖЕНИЯ КАРТОЧКИ",
    }
}

const BUTTON_NAME = {
    en: {
        repeateBtn: "«Repeat» button",
        difficultBtn: "«Difficult» button",
        goodBtn: "«Good» button",
        easyBtn: "«Easy» button",
        deleteBtn: "«Delete» button",
    },
    ru: {
        repeateBtn: "Кнопка «Повторить»",
        difficultBtn: "Кнопка «Сложно»",
        goodBtn: "Кнопка «Хорошо»",
        easyBtn: "Кнопка «Легко»",
        deleteBtn: "Кнопка «Удалить»",
    }
}

const CARD_SETTINGS = {
    en: {
        wordTranslate: "Word translation",
        wordMean: "Meaning of the word",
        wordUsing: "An example of using the word",
        wordTranscription: "Word transcription",
        wordAssociation: "Picture association",
        wordAnswer: "Show answer button"
    },
    ru: {
        wordTranslate: "Перевод слова",
        wordMean: "Смысл слова",
        wordUsing: "Пример использования слова",
        wordTranscription: "Транскрипция слова",
        wordAssociation: "Картинка-ассоциация",
        wordAnswer: "Кнопка «Показать ответ»"
    }
}

type Props = {
    lang: string,
    toggleButtonsSettings: (value: React.ChangeEvent<HTMLInputElement>) => void,
    buttonsSettings: any,
    toggleCardSetting:  (value: React.ChangeEvent<HTMLInputElement>) => void,
    cardSettings: any
}

function createCheckboxSettings(checkbox:any, name:string, toggleFunction: (value: React.ChangeEvent<HTMLInputElement>) => void) {
    return (
        <FormControlLabel
            key={checkbox.id}
            control={<BlueCheckbox  checked={checkbox.state} onChange={toggleFunction} name={checkbox.id} />}
            label={name}
        />
    )
}

const LearnWordSettings: React.FC<Props> = ({lang,  buttonsSettings, toggleButtonsSettings, cardSettings, toggleCardSetting}) => {
  const useStyles = LearnSettingsStyles();
  return (
    <div>
        <h1>{TEXTS[lang].mainTitle}</h1>
        <div className={useStyles.formsContainer}>
        <FormControl component="fieldset" className={useStyles.formControl}>
            <FormLabel component="legend">{TEXTS[lang].buttonSettings}</FormLabel>
            <FormGroup>
            {buttonsSettings.map((checkbox: any) => {
                const buttonName = BUTTON_NAME[lang][checkbox.id] || undefined;
                return createCheckboxSettings(checkbox, buttonName, toggleButtonsSettings)
            })}
            </FormGroup>
       </FormControl>
       <FormControl component="fieldset" className={useStyles.formControl}>
            <FormLabel component="legend">{TEXTS[lang].cardSettings}</FormLabel>
            <FormGroup>
            {cardSettings.map((checkbox: any) => {
                const cardName = CARD_SETTINGS[lang][checkbox.id] || undefined;
                return createCheckboxSettings(checkbox, cardName, toggleCardSetting)
            })}
            </FormGroup>
       </FormControl>
       </div>
    </div>
   );
};

const mapStateToProps = (state:RootState) => ({
    lang: state.lang.lang,
    buttonsSettings: state.buttonsSettings.buttonsSettings,
    cardSettings: state.cardSettings.cardSettings
  });
  
const mapDispatchToProps = {
    toggleButtonsSettings,
    toggleCardSetting
};

export default connect(mapStateToProps, mapDispatchToProps)(LearnWordSettings);
