import React from 'react';

export default function Game({game: {players, treasures, gridsize: {height, width}}}){
  const playerDots = Object.entries(players).map(([id, player]) => <circle cx={player.pos.x} cy={player.pos.y} fill='red' r='1'/>)
  return <svg width={width * 10} height={height * 10} fill="black" viewBox="0 0 50 50">
    <rect x="0" y="0" width={width} height={height} />
    {playerDots}
  </svg>
}