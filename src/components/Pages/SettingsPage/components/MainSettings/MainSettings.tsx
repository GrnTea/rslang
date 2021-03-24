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

  const handleChangeSubstractCountNewWorlds = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountNewWords(countNewWords - 1);
  }

  const handleChangeAddCountNewWorlds = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountNewWords(countNewWords + 1);
  }

  const handleChangeSubstractCountMaxDayCards = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountMaxDayCards(countMaxDayCards - 1);
  }

  const handleChangeAddCountMaxDayCards = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountMaxDayCards(countMaxDayCards + 1);
  }

  return (
    <div className={useStyles.mainSettingsContainer}>
        <h1>ОСНОВНЫЕ ПАРАМЕТРЫ</h1>
        <div>
            <h2>НАСТРОЙКИ ПРИЛОЖЕНИЯ</h2>
            <FormControl variant="outlined" className={useStyles.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Язык</InputLabel>
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
            <h2>НАСТРОЙКИ ЗВУКА</h2>
            <FormControlLabel
                control={
                    <Switch
                        checked={autoVoice}
                        onChange={handleChangeAutomaticVoiceActing}
                        color="primary"
                    />
                }
                label="Автоматическая озвучка"
            />            
        </div>
        <div>
            <h2>НАСТРОЙКИ ЕЖЕДНЕВНОГО ОБУЧЕНИЯ</h2>
            <div className={useStyles.dailySettings}>
                <span>Количество новых слов в день для изучения</span>
                <div className={useStyles.dailySettingsBtnGroup}>
                    <Button className={useStyles.daylySettingsBtn} onClick={handleChangeAddCountNewWorlds}>+</Button>
                    <div>{countNewWords}</div>
                    <Button className={useStyles.daylySettingsBtn} onClick={handleChangeSubstractCountNewWorlds}>-</Button>
                </div>
            </div>
            <div className={useStyles.dailySettings}>
                <span>Максимальное количество карточек для изучения в день</span>
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
