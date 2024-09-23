import React, { useState } from "react";
import gameData from ".//gameData.json"

function OptionPage({ setCurrentPage, setGameOptions }) {
  const [selectedMode, setSelectedMode] = useState(0);

  return (
    <>
      <h1>Options</h1>

      <h2 className="mt-3">Game Mode</h2>
      <div className="d-flex">
        {gameData.modes.map((item) => (
          <div
            key={item.id}
            className="card m-2"
            style={{
              width: "18rem",
              borderColor: selectedMode === item.id ? "blue" : "black",
              backgroundColor: selectedMode === item.id ? "#f0f0f0" : "white",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedMode(item.id);
                  setGameOptions((item) => ({ ...item, mode: item.name }));
                }}
                disabled={!item.playable}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-3">Map</h2>

      <button
        className="btn btn-primary"
        onClick={() => setCurrentPage("game")}
      >
        Start Game
      </button>
    </>
  );
}

export default OptionPage;
