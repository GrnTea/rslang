import React, { useEffect, useState } from 'react';
import MainSettingsStyles from "./MainSettingsStyles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { FormControlLabel } from '@material-ui/core';

const LANGUAGES = {
    en: {
        ru: "Russian",
        en: "English"
    },
    ru: {
        ru: "Русский",
        en: "Английский"
    }
}

const TEXTS = {
    en: {
        mainTitle: "MAIN SETTINGS",
        appSettings: "APP SETTINGS",
        lang: "Language",
        voiceSettings: "VOICE SETTINGS",
        autoVoicePrewiew: "Automatic voice preview",
        dayLearningSettings: "DAY LEARNING SETTINGS",
        numbersNewWords: "Number of new words to learn per day",
        maxNumberOfCards: "Maximum number of cards to learn per day"
    },
    ru: {
        mainTitle: "ОСНОВНЫЕ ПАРАМЕТРЫ",
        appSettings: "НАСТРОЙКИ ПРИЛОЖЕНИЯ",
        lang: "Язык",
        voiceSettings: "НАСТРОЙКИ ЗВУКА",
        autoVoicePrewiew: "Автоматическая озвучка",
        dayLearningSettings: "НАСТРОЙКИ ЕЖЕДНЕВНОГО ОБУЧЕНИЯ",
        numbersNewWords: "Количество новых слов в день для изучения",
        maxNumberOfCards: "Максимальное количество карточек для изучения в день"
    }
}

const MainSettings: React.FC = () => {
  const useStyles = MainSettingsStyles();
  const [lang, setLang] = useState("ru");
  const [autoVoice, setAutoVoice] = useState(true);
  const [countNewWords, setCountNewWords] = useState(10);
  const [countMaxDayCards, setCountMaxDayCards] = useState(10);

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.value);
  }

  const handleChangeAutomaticVoiceActing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoVoice(event.target.checked);
  }

  const handleChangeSubstractCountNewWorlds = () => {
    setCountNewWords(countNewWords - 1);
  }

  const handleChangeAddCountNewWorlds = () => {
    setCountNewWords(countNewWords + 1);
  }

  const handleChangeSubstractCountMaxDayCards = () => {
    setCountMaxDayCards(countMaxDayCards - 1);
  }

  const handleChangeAddCountMaxDayCards = () => {
    setCountMaxDayCards(countMaxDayCards + 1);
  }

  return (
    <div className={useStyles.mainSettingsContainer}>
        <h1>{TEXTS[lang].mainTitle}</h1>
        <div>
            <h2>{TEXTS[lang].appSettings}</h2>
            <FormControl variant="outlined" className={useStyles.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">{TEXTS[lang].lang}</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={lang}
                onChange={handleChangeLanguage}
                label="Language"
                >
                    {
                        Object.keys(LANGUAGES[lang]).map((item)=> {
                            return <MenuItem key={item} value={item}>{LANGUAGES[lang][item]}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
        <div>
            <h2>{TEXTS[lang].voiceSettings}</h2>
            <FormControlLabel
                control={
                    <Switch
                        checked={autoVoice}
                        onChange={handleChangeAutomaticVoiceActing}
                        color="primary"
                        classes={{switchBase: useStyles.switchBase}}
                    />
                }
                label={TEXTS[lang].autoVoicePrewiew}
            />            
        </div>
        <div>
            <h2>{TEXTS[lang].dayLearningSettings}</h2>
            <div className={useStyles.dailySettings}>
                <span>{TEXTS[lang].numbersNewWords}</span>
                <div className={useStyles.dailySettingsBtnGroup}>
                    <Button className={useStyles.daylySettingsBtn} onClick={handleChangeAddCountNewWorlds}>+</Button>
                    <div>{countNewWords}</div>
                    <Button className={useStyles.daylySettingsBtn} onClick={handleChangeSubstractCountNewWorlds}>-</Button>
                </div>
            </div>
            <div className={useStyles.dailySettings}>
                <span>{TEXTS[lang].maxNumberOfCards}</span>
                <div className={useStyles.dailySettingsBtnGroup}>
                    <Button className={useStyles.daylySettingsBtn} onClick={handleChangeAddCountMaxDayCards}>+</Button>
                    <div>{countMaxDayCards}</div>
                    <Button className={useStyles.daylySettingsBtn} onClick={handleChangeSubstractCountMaxDayCards}>-</Button>
                </div>
            </div>
        </div>
    </div>
   );
};

export default MainSettings;
