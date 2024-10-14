import React, { useState, useEffect } from 'react';

type Cell = {
  hasMine: boolean;
  clicked: boolean;
};

const generateGrid = (size: number): Cell[][] => {
  const grid: Cell[][] = [];
  for (let i = 0; i < size; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < size; j++) {
      row.push({ hasMine: Math.random() < 0.2, clicked: false });
    }
    grid.push(row);
  }
  return grid;
};

const GameBoard: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setGrid(generateGrid(5)); // 5x5 grid
  }, []);

  const handleClick = (rowIndex: number, colIndex: number) => {
    if (gameOver) return;

    const newGrid = [...grid];
    const cell = newGrid[rowIndex][colIndex];

    if (cell.clicked) return;
    
    if (cell.hasMine) {
      setGameOver(true);
      alert('Game Over! You hit a mine!');
    } else {
      cell.clicked = true;
      setScore(score + 1);
    }

    setGrid(newGrid);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">MineRush</h1>
      <h2 className="text-xl mb-4">Score: {score}</h2>
      <div className="grid grid-cols-5 gap-4">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`w-16 h-16 border-2 ${
                cell.clicked ? (cell.hasMine ? 'bg-red-500' : 'bg-green-500') : 'bg-gray-300'
              }`}
            >
              {cell.clicked && (cell.hasMine ? '💣' : '✔️')}
            </button>
          ))
        )}
      </div>
      {gameOver && (
        <button
          onClick={() => {
            setGrid(generateGrid(5));
            setGameOver(false);
            setScore(0);
          }}
          className="mt-6 p-2 bg-blue-500 text-white rounded"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default GameBoard;
