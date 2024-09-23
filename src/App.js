import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GamePage from "./GamePage";
import MainPage from "./MainPage";
import OptionPage from "./OptionPage";
import GameOverPage from "./GameOverPage";
import ThemePage from "./ThemePage";
import gameData from "./gameData.json";

function App() {
  const [currentPage, setCurrentPage] = useState("main");

  const [score, setScore] = useState(0);

  const [gameOptions, setGameOptions] = useState(gameData.defaultSettings);

  const renderPage = () => {
    switch (currentPage) {
      case "game":
        return <GamePage setCurrentPage={setCurrentPage} gameOptions={gameOptions} score={score} setScore={setScore}/>;
      case "theme":
        return <ThemePage setCurrentPage={setCurrentPage} gameOptions={gameOptions} setGameOptions={setGameOptions}/>;
      case "option":
        return <OptionPage setCurrentPage={setCurrentPage} setGameOptions={setGameOptions}/>;
      case "gameover":
        return <GameOverPage setCurrentPage={setCurrentPage} score={score}/>;
      default:
        return <MainPage setCurrentPage={setCurrentPage}/>;
    }
  }
  
  return (
    <div className="container fullscreen d-flex flex-column align-items-center justify-content-center">
      {renderPage()}
    </div>
  );
}

export default App;
