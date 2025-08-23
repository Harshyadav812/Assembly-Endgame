import { useState } from 'react'
import clsx from 'clsx'
import './App.css'
import Header from './components/Header'
import GameStatus from './components/GameStatus'
import { languages } from './language'
import { getRandomWord, getFarewellText } from './utils'

function App() {

  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

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
        disabled={isGameOver}
        style={styles}
        onClick={() => handleClick(letter)}
        className='key' key={idx}
        type='button'
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}>
        {letter.toUpperCase()}
      </button>
    )
  })

  const revealWord = currentWord.split("").map((letter, idx) => {
    const letterClassName = clsx("letter",
      isGameLost && !guessedLetters.includes(letter) && "missed-letter",
      isGameLost && guessedLetters.includes(letter) && "correct-letter"
    )
    return <span
      key={idx}
      className={letterClassName}>
      {/* {!guessedLetters.includes(letter) ? letter.toUpperCase() : letter.toUpperCase()} */}
      {letter.toUpperCase()}
    </span>
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

  function displayFarewellMsg() {
    if (!isGameOver && wrongGuessCount) {
      const msg = getFarewellText(languages[wrongGuessCount - 1].name)
      return <p className='farewell-msg'>{msg}</p>
    }
  }

  function resetGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
  }

  console.log(currentWord)


  return (
    <main>
      <Header />

      <GameStatus
        isLastGuessIncorrect={isLastGuessIncorrect}
        displayFarewellMsg={displayFarewellMsg}
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameLost} />

      <div className='language-ctn'>{languageList}</div>
      <div className="letter-ctn">{isGameLost ? revealWord : letterElements}</div>
      <div className='key-ctn'>{keys}</div>

      {isGameOver && <button onClick={resetGame} className="new-game">New Game</button>}
    </main>
  )
}

export default App
