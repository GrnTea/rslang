import React from "react";
import CardStyles from "./CardStyles";
import voiceImg from "../../../../../assets/icons/voiceIcon.svg";

interface Cardinfo {
    cardInfo: any
}

const CardForWords = ({cardInfo}:Cardinfo) => {
    const url = "https://rslernwords.herokuapp.com/";
    const useStyles = CardStyles();
    const voiceActing = new Audio(`${url}${cardInfo.audio}`);
    const audioExample = new Audio(`${url}${cardInfo.audioExample}`);
    const audioMeaning = new Audio(`${url}${cardInfo.audioMeaning}`);

    const handlePlay = () => {
        voiceActing.play();
        if (voiceActing.ended) {
            audioExample.play();
        } else if (audioMeaning.ended) {
            audioMeaning.play();
        }
        console.log("play!");
    }

    return (
        <div className={useStyles.cardContainer}>
            <div className={useStyles.cardImg} style={{backgroundImage: `url(${url}${cardInfo.image})`}} />
            <div className={useStyles.cardDescription}>
                <div className={useStyles.mainWordContsiner}>
                    <div className={useStyles.mainWord}>
                        {cardInfo.word}
                    </div>
                    <div className={useStyles.wordTranscription}>
                        {cardInfo.transcription}
                    </div>
                    <div className={useStyles.wordTranslate}>
                        {` - ${cardInfo.wordTranslate}`}
                    </div>
                    <div className={useStyles.wordVoiceActing} onClick={handlePlay}>
                        <img src={voiceImg} alt="Voice acting for word"/>                    
                    </div>
                </div>
                <div className={useStyles.exampleContainer}>
                    <div className={useStyles.example} dangerouslySetInnerHTML={{__html: `${cardInfo.textExample}`}}>
                    </div>
                    <div className={useStyles.exampleTranslate} >
                        {cardInfo.textExampleTranslate}
                    </div>
                </div>
                <div className={useStyles.exampleContainer}>
                    <div className={useStyles.example} dangerouslySetInnerHTML={{__html: `${cardInfo.textMeaning}`}}></div>
                    <div className={useStyles.exampleTranslate} >
                        {cardInfo.textMeaningTranslate}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardForWords;