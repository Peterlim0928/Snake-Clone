import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";

function ThemePage({ setCurrentPage, gameOptions, setGameOptions }) {
  const [snakeColor, setSnakeColor] = useState(gameOptions.snakeColor);
  const [snakeBorderColor, setSnakeBorderColor] = useState(gameOptions.snakeBorderColor);
  const [foodColor, setFoodColor] = useState(gameOptions.foodColor);
  const [foodBorderColor, setFoodBorderColor] = useState(gameOptions.foodBorderColor);

  return (
    <>
      <h1>Themes</h1>
      <div className="d-flex flex-row">
        <div className="row">
          <div className="col-6 py-3 d-flex flex-column align-items-center">
            Snake Color
            <HexColorPicker color={snakeColor} onChange={setSnakeColor} />
          </div>
          <div className="col-6 py-3 d-flex flex-column align-items-center">
            Snake Border Color
            <HexColorPicker
              color={snakeBorderColor}
              onChange={setSnakeBorderColor}
            />
          </div>
          <div className="col-6 py-3 d-flex flex-column align-items-center">
            Food Color
            <HexColorPicker color={foodColor} onChange={setFoodColor} />
          </div>
          <div className="col-6 py-3 d-flex flex-column align-items-center">
            Food Border Color
            <HexColorPicker
              color={foodBorderColor}
              onChange={setFoodBorderColor}
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary mt-5"
        onClick={() => {
          setGameOptions((prev) => ({
            ...prev,
            snakeColor,
            snakeBorderColor,
            foodColor,
            foodBorderColor,
          }));
          setCurrentPage("main");
        }}
      >
        Save
      </button>
    </>
  );
}

export default ThemePage;
