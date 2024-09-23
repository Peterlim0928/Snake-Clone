function GameOverPage({ score, setCurrentPage }) {
  return (
    <>
      <h1>Game Over!</h1>
      <p>Your score: {score}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          setCurrentPage("home");
        }}
      >
        Restart
      </button>
    </>
  );
}

export default GameOverPage;
