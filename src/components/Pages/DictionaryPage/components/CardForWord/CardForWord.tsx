import React from "react";
import CardStyles from "./CardStyles";
import voiceImg from "../../../../../assets/icons/voiceIcon.svg";
import { RootState } from "../../../../../redux/reducer";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";

type Props = {
    cardInfo: any,
    lang: string,
    buttonsSettings: any,
    cardSettings: any
}

const CardForWords: React.FC<Props> = ({cardInfo, lang, buttonsSettings, cardSettings}) => {
    console.log(buttonsSettings);
    const url = "https://rslernwords.herokuapp.com/";
    const useStyles = CardStyles();
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

    return (
        <div className={useStyles.cardContainer}>
            { cardSettings[4].state ? 
            <div className={useStyles.cardImg} style={{backgroundImage: `url(${url}${cardInfo.image})`}} /> : null}
            <div className={useStyles.cardDescription}>
                <div className={useStyles.mainWordContsiner}>
                    <div className={useStyles.mainWord}>
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
            </div>
            <div className={useStyles.cardButtons}>
                    {
                        buttonsSettings[1].state ? 
                        <Button className={useStyles.cardBtn}>Сложное</Button>
                        : null
                    }
                    {
                        buttonsSettings[4].state ? 
                        <Button className={useStyles.cardBtn}>Удалить</Button>
                        : null
                    }
                </div>
        </div>
    )
}

const mapStateToProps = (state:RootState) => ({
    lang: state.settingsReducer.lang.lang,
    buttonsSettings: state.settingsReducer.buttonsSettings.buttonsSettings,
    cardSettings: state.settingsReducer.cardSettings.cardSettings,
  });
  
  export default connect(mapStateToProps)(CardForWords);