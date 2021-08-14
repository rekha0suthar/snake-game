import React, { useState, useEffect, useRef } from "react";
import Blank from "./assets/blank.png";
import Snake from "./assets/snake.png";
import Food from "./assets/food.png";

const SnakeBoard = () => {
  //to make snake playground, define rows and columns
  const totalRows = 10;
  const totalCols = 10;
  //to create snake playground, make 2D array, instialise it to be empty
  let initialRows = [];
  //adding for loop to all columns, and adding empty array
  for (let i = 0; i < totalCols; i++) {
    initialRows.push([]);
    //creating 2D array with text "blank"
    for (let k = 0; k < totalRows; k++) {
      initialRows[i].push("blank");
    }
  }
  //function for random position to show food
  const randomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * totalRows),
      y: Math.floor(Math.random() * totalCols),
    };
    return position;
  };
  //defining different state
  const [rows, setRows] = useState(initialRows);
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(randomPosition);
  //function for define directions to move snake
  const changeDirectionWithKeys = (e) => {
    var { keyCode } = e;
    switch (keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("top");
        break;
      case 39:
        setDirection("right");
        break;
      case 40:
        setDirection("bottom");
        break;
      default:
        break;
    }
  };

  document.addEventListener("keydown", changeDirectionWithKeys, false);
  //function to show snake in playground
  const displaySnake = () => {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = "snake";
    });
    newRows[food.x][food.y] = "food";

    setRows(newRows);
  };
  //function to handle movement of snake
  const moveSnake = () => {
    const newSnake = [];
    switch (direction) {
      case "right":
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % totalRows });
        break;
      case "left":
        newSnake.push({
          x: snake[0].x,
          y: (snake[0].y - 1 + totalRows) % totalRows,
        });
        break;
      case "top":
        newSnake.push({
          x: (snake[0].x - 1 + totalCols) % totalCols,
          y: snake[0].y,
        });
        break;
      case "bottom":
        newSnake.push({ x: (snake[0].x + 1) % totalCols, y: snake[0].y });
    }
    snake.forEach((cell) => {
      newSnake.push(cell);
    });
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(randomPosition);
    } else {
      newSnake.pop();
    }
    setSnake(newSnake);
    displaySnake();
  };

  useInterval(moveSnake, 100);
  //function to manage time to move of snake
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  //function to show different image in row and cols
  const displayRows = rows.map((row) => (
    <li>
      {row.map((e) => {
        switch (e) {
          case "blank":
            return <img src={Blank} alt="blank_image" />;
          case "snake":
            return (
              <img style={{ opacity: "0" }} src={Snake} alt="snake-image" />
            );
          case "food":
            return <img src={Food} alt="food-iamge" />;
        }
      })}
    </li>
  ));

  return (
    <div>
      <ul style={{ width: "500px", padding: "0px", backgroundColor: "red" }}>
        {displayRows}
      </ul>
    </div>
  );
};

export default SnakeBoard;
