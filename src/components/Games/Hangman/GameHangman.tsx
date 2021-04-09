import React from "react";
import { RootState } from "../../../redux/reducer";

import Figure from "./Figure";
import WrongLetters from "./WrongLetters";


const words = {
  fruits: ['apple', 'banana', 'grapes', 'pear', 'orange'],
  animals: ['cat', 'frog', 'dog', 'goat', 'elephant'],
  IT: ['application', 'programming', 'interface', 'function', 'wizard']
};

export default function GameHangman() {

  let topic = "fruits";

  function getWord(topic: any) {
    return words[topic][Math.floor(Math.random() * words[topic].length)]
  }

  let selectedWord = getWord(topic);


  return (
    <div>
      <div>Hangman</div>
      <Figure />
      {/*<Figure wrongLetters={wrongLetters}/>*/}
      <WrongLetters wrongLetters={wrongLetters}/>
    </div>
  )

};