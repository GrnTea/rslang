import React from 'react';

const DisplayWordsComponent = (props) => {

  let res = props.displayWords.map((elem: any, index: number) => {
    return (
      <div key={index} 
        data-value={elem.word}
        className="random-word"
        onClick={elem => props.checkWord(elem)} >
          {elem.wordTranslate}
      </div>
    )
  })

  return(
    <div className="random-words">
      {res}
    </div>
    );
}

export default DisplayWordsComponent;