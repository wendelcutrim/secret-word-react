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

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState("");

  const pickWordAndCategory = () => {
    //Obter uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category);

    //Obter uma palavra aletória da categoria.
    const word = words[category][Math.floor(Math.random() * Object.keys(category).length)];
    console.log(word);

    return {word, category};
  }

  //Exibir o componente StartScreen e iniciar o jogo;
  const startGame = () => {

    //Pegar a palavra e categoria
    const {word, category} = pickWordAndCategory();

    //Criando o array de letras;
    let wordLetters = word.split("");

    wordLetters = wordLetters.map(letter => letter.toLowerCase());

    console.log(wordLetters);

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(letters);

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
