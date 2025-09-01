import React, { useState } from 'react';
import '../Game.css';

// PUBLIC_INTERFACE
const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return squares.every(square => square) ? 'Draw' : null;
  };

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner && winner !== 'Draw') {
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }

    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const winner = calculateWinner(board);
  const status = winner
    ? winner === 'Draw'
      ? "It's a Draw!"
      : `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const renderSquare = (i) => (
    <button
      className={`square ${board[i]?.toLowerCase()}`}
      onClick={() => handleClick(i)}
      aria-label={`Square ${i}`}
    >
      {board[i]}
    </button>
  );

  return (
    <div className="game-container">
      <div className="score-board">
        <h2>Score</h2>
        <div className="score-display">
          <div className="score-item">
            <span>Player X</span>
            <span className="score">{scores.X}</span>
          </div>
          <div className="score-item">
            <span>Player O</span>
            <span className="score">{scores.O}</span>
          </div>
        </div>
      </div>

      <div className="game-info">{status}</div>

      <div className="game-board">
        {[0, 1, 2].map(row => (
          <React.Fragment key={row}>
            {[0, 1, 2].map(col => renderSquare(row * 3 + col))}
          </React.Fragment>
        ))}
      </div>

      <div className="controls">
        <button className="btn btn-primary" onClick={resetGame}>
          New Game
        </button>
        <button className="btn btn-secondary" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default Game;
