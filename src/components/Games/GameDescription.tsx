import React from 'react';
import GameMenu from './GameMenu/GameMenu'

interface IGameMenu {
  gameName: string,
  description: string,
  game: React.FC,
  gameSelected: string,
}

export default function AudioCallDescription({ gameName, description, game, gameSelected }: IGameMenu) {
  return (
    <GameMenu gameName={gameName} description={description} game={game} gameSelected={gameSelected} />
  )
}