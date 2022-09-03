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
    {id: 3, name: "end"}
  ];

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //Exibir o componente StartScreen e iniciar o jogo;
  const startGame = () => {
    setGameStage(stages[1].name);
  }

  //processar as letras do input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  //Reiniciar o jogo
  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
      {gameStage === 'end' && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
