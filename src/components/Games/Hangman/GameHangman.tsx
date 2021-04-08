import React from "react";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";


export default function GameHangman() {

  return (
    <div>
      <div>Hangman</div>
      <Figure />
      {/*<Figure wrongLetters={wrongLetters}/>*/}
      <WrongLetters wrongLetters={wrongLetters}/>
    </div>
  )

};