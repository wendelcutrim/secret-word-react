import './style.css';

import { useState, useRef } from 'react';

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {

  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    verifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();

  }

  return (
    <div className='game'>
      <p className='points'>
        <span>Pontuação: {score}</span>
      </p>

      <h1>Adivinhe a palavra:</h1>
      <h3 className='tip'>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses === 1 ? `${guesses} tentativa` : `${guesses} tentativas`} </p>
      <div className="word-container">
        {letters.map((letter, index) => {
          return (
            guessedLetters.includes(letter) ? (
              <span className='letter' key={index}>{letter}</span>
            ) : (
              <span className='blank-square' key={index}></span>
            )
          )
        })}
      </div>

      <div className="letter-container">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength="1" 
            ref={letterInputRef} 
            required onChange={(event) => setLetter(event.target.value)} value={letter} 
          />
          <button>Jogar!</button>
        </form>
      </div>

      <div className="wrong-letters-container">
        <p>Letras já utilizadas:</p>
          {wrongLetters.map((letter, index) => {
            return (
              <span key={index}>{letter + ", "}</span>
            )
          })}
      </div>
    </div>
  )
}

export default Game