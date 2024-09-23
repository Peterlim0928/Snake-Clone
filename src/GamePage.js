import { useEffect, useState } from "react";
import gameData from "./gameData.json";

function GamePage({ setCurrentPage, gameOptions, score, setScore }) {

  const [snake, setSnake] = useState(
    Array.from({ length: gameData.constants.snakeLength }, (_, index) => ({
      x: gameData.constants.initialX - index * gameData.constants.cellSize,
      y: gameData.constants.initialY,
      color: gameOptions.color.snake,
      borderColor: gameOptions.color.snakeBorder,
    }))
  );

  const [food, setFood] = useState({
    x: 200,
    y: 200,
    color: gameOptions.color.food,
    borderColor: gameOptions.color.foodBorder,
  });

  const [direction, setDirection] = useState("RIGHT");

  const [newScore, setNewScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  function drawBox(props) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = props.color;
    ctx.strokeStyle = props.borderColor;
    ctx.fillRect(props.x, props.y, 20, 20);
    ctx.strokeRect(props.x, props.y, 20, 20);
  }

  function drawSnake() {
    snake.forEach(drawBox);
  }

  function drawFood() {
    drawBox(food);
  }

  function advanceSnake() {
    setSnake((prevSnake) => {
      let dx = 0;
      let dy = 0;

      switch (direction) {
        case "UP":
          dx = 0;
          dy = -20;
          break;
        case "DOWN":
          dx = 0;
          dy = 20;
          break;
        case "LEFT":
          dx = -20;
          dy = 0;
          break;
        case "RIGHT":
          dx = 20;
          dy = 0;
          break;
        default:
          break;
      }

      const head = {
        x:
          (prevSnake[0].x + dx + gameData.constants.width) %
          gameData.constants.width,
        y:
          (prevSnake[0].y + dy + gameData.constants.height) %
          gameData.constants.height,
        color: gameOptions.color.snake,
        borderColor: gameOptions.color.snakeBorder,
      };

      if (isCollidingWithSnake(head)) {
        setGameOver(true);
      }

      const newSnake = [head, ...prevSnake];
      if (head.x === food.x && head.y === food.y) {
        let newFood;

        do {
          newFood = {
            x: Math.floor((Math.random() * gameData.constants.width) / 20) * 20,
            y: Math.floor((Math.random() * gameData.constants.height) / 20) * 20,
            color: gameOptions.color.food,
            borderColor: gameOptions.color.foodBorder,
          };
        } while (isCollidingWithSnake(newFood));

        setFood(newFood);
        setNewScore((prevScore) => prevScore + 10);
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }

  function isCollidingWithSnake(props) {
    return snake.some(
      (snakePart) => snakePart.x === props.x && snakePart.y === props.y
    );
  }

  function clearCanvas(borderColor, backgroundColor) {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = borderColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  // game loop
  useEffect(() => {
    const interval = setInterval(() => {
      clearCanvas("black", "white"); // temporary, will be replaced by gameOptions
      advanceSnake();
      drawSnake();
      drawFood();

      if (gameOver) {
        setCurrentPage("gameover");
      }
    }, 100);
    return () => clearInterval(interval);
  });

  // update score
  useEffect(() => {
    setScore(newScore);
  }, [newScore, setScore]);

  // keyboard events
  useEffect(() => {
    const changeDirection = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "DOWN") {
            setDirection("UP");
          }
          break;
        case "ArrowDown":
          if (direction !== "UP") {
            setDirection("DOWN");
          }
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") {
            setDirection("LEFT");
          }
          break;
        case "ArrowRight":
          if (direction !== "LEFT") {
            setDirection("RIGHT");
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", changeDirection);
    return () => document.removeEventListener("keydown", changeDirection);
  }, [direction]);

  return (
    <div>
      <canvas
        id="myCanvas"
        width={gameData.constants.width}
        height={gameData.constants.height}
      ></canvas>
      <p>Your score: {score}</p>
    </div>
  );
}

export default GamePage;
