import clsx from 'clsx'

export default function GameStatus({ isGameOver, isGameWon, isGameLost }) {

  const gameStatusClass = clsx("game-status-container", {
    lost: isGameLost,
    won: isGameWon
  })

  return (
    <section className={gameStatusClass}>

      {
        isGameOver ? (
          isGameWon ? (
            <>
              <h2 className="status">You Win!</h2>
              <p className="description">Well done! 🎉 </p>
            </>
          ) : (
            <>
              <h2 className="status">Game Over!</h2>
              <p className="description">You lose! Better start learning Assembly 😭</p>
            </>
          )

        ) :
          (
            null
          )
      }

    </section>
  )
}