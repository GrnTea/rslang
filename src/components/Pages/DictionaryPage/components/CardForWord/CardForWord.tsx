import React from "react";
import CardStyles from "./CardStyles";
import voiceImg from "../../../../../assets/icons/voiceIcon.svg";

interface Cardinfo {
    cardInfo: any
}

const CardForWords = ({cardInfo}:Cardinfo) => {
    const url = "https://rslernwords.herokuapp.com/";
    const useStyles = CardStyles();
    const handlePlay = () => {
        const allAudio = document.getElementsByTagName("audio");

        for (let i=0; i < allAudio.length; i++) {
            allAudio[i].pause();
        }
        
        const cardAudio:HTMLMediaElement  = document.getElementById(`${cardInfo.word}_audio`) as HTMLMediaElement;
        const audioExample:HTMLMediaElement   = document.getElementById(`${cardInfo.word}_audioExample`) as HTMLMediaElement;
        const audioMeaning:HTMLMediaElement   = document.getElementById(`${cardInfo.word}_audioMeaning`) as HTMLMediaElement;

        cardAudio.play();

        cardAudio.addEventListener("ended", () => {
            audioExample.play();
        });
        audioExample.addEventListener("ended", () => {
            audioMeaning.play();
        });
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