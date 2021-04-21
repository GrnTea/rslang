import React from "react";
import GameMenu from "../GameMenu/GameMenu";

export default function AudioCallDescription() {
  const gameName = "аудиовызов";
  const description = "Тренировка Аудиовызов развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.";
  return (
    <GameMenu gameName={gameName} description={description} />
  );
}
