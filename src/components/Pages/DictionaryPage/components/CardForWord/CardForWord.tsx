import React, { useEffect, useState } from "react";
import CardStyles from "./CardStyles";
import voiceImg from "../../../../../assets/icons/voiceIcon.svg";
import { RootState } from "../../../../../redux/reducer";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

const BUTTONS = {
    en: {
        difficultBtn: "Difficult",
        removeBtn: "Delete"
    },
    ru: {
        difficultBtn: "Сложное",
        removeBtn: "Удалить"  
    }
}

type Props = {
    cardInfo: any,
    lang: string,
    buttonsSettings: any,
    cardSettings: any,
    user: any
}

function updateListOfUserWords(data:any, metod:string, url:string, authorizationToken:string):void {
    fetch(url, {
        method: metod,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authorizationToken}`
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      })
      .then((response) => {  
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
        })
      .catch((error)=> {alert(error)});
}

function checkWords(url:string, authorizationToken:string, setCheckedWord):any {
    fetch(url , {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorizationToken}`
        }
    })
      .then(
        (response) => response.json(),
      )
      .then((jsonData) => {
        setCheckedWord(jsonData);
      });
}

const CardForWords: React.FC<Props> = ({cardInfo, lang, buttonsSettings, cardSettings, user}) => {
    const authorizationToken = user.token;
    const userId = user.id;
    const url = "https://rslernwords.herokuapp.com/";
    const useStyles = CardStyles();
    const cardId = cardInfo.id || cardInfo._id;
    const [checkedWord, setCheckedWord] = useState("");
    const [isDeleted, setIsDeleted] = useState(checkedWord ? checkedWord.optional.deleted : "false");
    const [isDifficult, setIsDifficult] = useState(checkedWord ? checkedWord.difficulty : "false");

    useEffect(() => {
        const checkURL = `${url}users/${userId}/words/${cardId}`;
        checkWords(checkURL, authorizationToken, setCheckedWord);
    }, [isDeleted]);

    useEffect(() => {
        setIsDeleted(checkedWord ? checkedWord.optional.deleted : "false");
        setIsDifficult(checkedWord ? checkedWord.difficulty : "false");
    }, [checkedWord]);

    const handlePlay = () => {
        const allAudio = document.getElementsByTagName("audio");

        for (let i = 0; i < allAudio.length; i++) {
            allAudio[i].pause();
        }
        
        const cardAudio:HTMLMediaElement  = document.getElementById(`${cardInfo.word}_audio`) as HTMLMediaElement;
        const audioExample:HTMLMediaElement   = document.getElementById(`${cardInfo.word}_audioExample`) as HTMLMediaElement;
        const audioMeaning:HTMLMediaElement   = document.getElementById(`${cardInfo.word}_audioMeaning`) as HTMLMediaElement;

        cardAudio.play();

        if (cardSettings[2].state) {
            cardAudio.addEventListener("ended", () => {
                audioExample.play();
            });
        }

        if (cardSettings[1].state) {
            audioExample.addEventListener("ended", () => {
                audioMeaning.play();
            });
        }
    }

    const handleSetAsDifficult = () => {

        const data = {
            "difficulty": "true",
            "optional": {
                "deleted": "false"
            }
        }

        const urlRequest = `${url}users/${userId}/words/${cardId}`;
        
        updateListOfUserWords(data, "POST", urlRequest, authorizationToken); 

        checkWords(urlRequest, authorizationToken, setCheckedWord); 
    }

    const handleRemoveWord = () => {
        const data = {
            "difficulty": checkedWord ? checkedWord.difficulty : "false",
            "optional": {
                "deleted": "true"
            }
        }

        const urlRequest = `${url}users/${userId}/words/${cardId}`;

        if (checkedWord) {
            updateListOfUserWords(data, "PUT", urlRequest, authorizationToken);
        } else {
            updateListOfUserWords(data, "POST", urlRequest, authorizationToken);
        }

        checkWords(urlRequest, authorizationToken, setCheckedWord);
        setIsDeleted(checkedWord ? checkedWord.optional.deleted : "false");
    }
    
    return (
        <div className={useStyles.cardContainer}>
            { cardSettings[4].state ? 
                <div className={useStyles.cardImg} style={{backgroundImage: `url(${url}${cardInfo.image})`}} /> 
            : null}
            <div className={useStyles.cardDescription}>
                <div className={useStyles.mainWordContsiner}>
                    <div className={isDifficult === "true" ? useStyles.mainDifficultWord : useStyles.mainWord}>
                        {cardInfo.word}
                    </div>
                    { cardSettings[3].state ? 
                    <div className={useStyles.wordTranscription}>
                        {cardInfo.transcription}
                    </div> 
                    : null }
                    {
                        cardSettings[0].state ?
                        <div className={useStyles.wordTranslate}>
                            {` - ${cardInfo.wordTranslate}`}
                        </div> : null
                    }
                    <div className={useStyles.wordVoiceActing} onClick={handlePlay}>
                        <img src={voiceImg} alt="Voice acting for word"/>
                        <audio id={`${cardInfo.word}_audio`}>
                            <source src={`${url}${cardInfo.audio}`} type="audio/mpeg" />
                        </audio>
                        <audio id={`${cardInfo.word}_audioExample`}>
                            <source src={`${url}${cardInfo.audioExample}`} type="audio/mpeg" />
                        </audio>
                        <audio id={`${cardInfo.word}_audioMeaning`}>
                            <source src={`${url}${cardInfo.audioMeaning}`} type="audio/mpeg" />
                        </audio>
                    </div>
                </div>
                {
                    cardSettings[2].state ? 
                    <div className={useStyles.exampleContainer}>
                        <div className={useStyles.example} dangerouslySetInnerHTML={{__html: `${cardInfo.textExample}`}}></div>
                        <div className={useStyles.exampleTranslate} >
                            {cardInfo.textExampleTranslate}
                        </div>
                    </div> : null
                }
                {
                    cardSettings[1].state ? 
                    <div className={useStyles.exampleContainer}>
                        <div className={useStyles.example} dangerouslySetInnerHTML={{__html: `${cardInfo.textMeaning}`}}></div>
                        <div className={useStyles.exampleTranslate} >
                            {cardInfo.textMeaningTranslate}
                        </div>
                    </div> : null
                }
                {
                    user.id ?  isDeleted === "true" ? null :
                    <div className={useStyles.cardButtons}>
                    {
                        buttonsSettings[1].state ? isDifficult === "true" ? null : 
                        <Button className={useStyles.cardBtn} onClick={handleSetAsDifficult}>{BUTTONS[lang].difficultBtn}</Button>
                        : null
                    }
                    {
                        buttonsSettings[4].state ? 
                        <Button className={useStyles.cardBtn} onClick={handleRemoveWord}>{BUTTONS[lang].removeBtn}</Button>
                        : null
                    }
                </div> : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state:RootState) => ({
    lang: state.settingsReducer.lang.lang,
    buttonsSettings: state.settingsReducer.buttonsSettings.buttonsSettings,
    cardSettings: state.settingsReducer.cardSettings.cardSettings,
    user: state.user,
  });
  
  export default connect(mapStateToProps)(CardForWords);