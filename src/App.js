import './App.css';


import { useCallback, useEffect, useState } from 'react';


import {wordsList} from './data/words';


import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

function App() {
  const stages = [
    {id: 1, name: "start"},
    {id: 2, name: "game"},
    {id: 3, anme: "end"}
  ];

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  console.log(words);

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen />}
      {gameStage === 'game' && <Game />}
      {gameStage === 'end' && <GameOver />}
    </div>
  );
}

export default App;
