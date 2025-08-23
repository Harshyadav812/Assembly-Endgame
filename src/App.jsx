import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import GameStatus from './components/GameStatus'
import { languages } from './language'

function App() {

  // function getRandomWord() {
  //   const len = Math.floor(Math.random() * 5) + 4 // 4..8
  //   return Array.from({ length: len }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('')
  // }

  const [currentWord, setCurrentWord] = useState('react')
  const [guessedLetters, setGuessedLetters] = useState([])

  const alphabets = "abcdefghijklmnopqrstuvwxyz"

  let wrongGuessCount = guessedLetters.filter(letter =>
    !currentWord.includes(letter)).length

  const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter))
  const isGameLost = (wrongGuessCount >= languages.length - 1)

  const isGameOver = isGameWon || isGameLost

  function handleClick(letter) {
    setGuessedLetters(prevLetterArray => prevLetterArray.includes(letter) ? prevLetterArray : [...prevLetterArray, letter])
  }

  const keys = alphabets.split("").map((letter, idx) => {
    let bgColor = "rgba(252, 186, 41, 1)"

    if (guessedLetters.includes(letter) && currentWord.includes(letter)) {
      bgColor = "#10A95B"
    } else if (guessedLetters.includes(letter) && !currentWord.includes(letter)) {
      bgColor = '#EC5D49'
    }

    const styles = {
      backgroundColor: bgColor
    }

    return (
      <button
        style={styles}
        onClick={() => handleClick(letter)}
        className='key' key={idx}
        type='button'>
        {letter.toUpperCase()}
      </button>
    )
  })

  const letterElements = currentWord.split("").map((letter, idx) => {
    return <span
      key={idx}
      className='letter'>
      {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
    </span>

  })

  const languageList = languages.map((language, idx) => {
    return (<span
      key={language.name}
      className={`lang-chip ${(idx < wrongGuessCount) ? 'lost' : ''}`}
      style={
        {
          backgroundColor: language.backgroundColor,
          color: language.color
        }
      }>{language.name}
    </span>)
  })

  console.log(isGameOver)

  return (
    <main>
      <Header />
      <GameStatus isGameOver={isGameOver} isGameWon={isGameWon} isGameLost={isGameLost} />
      <div className='language-ctn'>{languageList}</div>
      <div className="letter-ctn">{letterElements}</div>
      <div className='key-ctn'>{keys}</div>

      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  )
}

export default App
