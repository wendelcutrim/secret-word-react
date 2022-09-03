import './App.css';

import { useCallback, useEffect, useState } from 'react';

import {wordsList} from './data/words';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];


function App() {
 
  let guessesQty = 3;

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //Obter uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //Obter uma palavra aletória da categoria.
    const word = words[category][Math.floor(Math.random() * Object.keys(category).length)];

    return {word, category};
  }, [words]);

  //Exibir o componente StartScreen e iniciar o jogo;
  const startGame = useCallback(() => {
    // Limpar todas as letras
    clearLettersState();

    //Pegar a palavra e categoria
    const {word, category} = pickWordAndCategory();

    //Criando o array de letras;
    let wordLetters = word.split("");

    wordLetters = wordLetters.map(letter => letter.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //processar as letras do input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();
    
    //checar se a letra já foi utilizada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) { return; };

    //Enviar as letras ou remover
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
    } else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }

  };

   //Reiniciar o jogo
   const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stages[0].name)
  };

  const clearLettersState = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Verificar se as tentativas terminaram
  useEffect(() => {
    if(guesses === 0) {
      //Resetar todos os estados.
      clearLettersState();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Verificar condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    //Condição de vitória
    if(guessedLetters.length === uniqueLetters.length) {
      //Adicionar Score
      setScore((actualScore) => actualScore += 100);

      // Restart game com nova palavra
      startGame();
    }
  }, [guessedLetters, letters, startGame])

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && 
        <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord}
          pickedCategory={pickedCategory} 
          letters={letters} 
          guessedLetters={guessedLetters} 
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      }
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
