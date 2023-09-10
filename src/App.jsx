import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Square from "./assets/components/Square";
import confetti from "canvas-confetti";

function App() {
  const TURN = {
    X: "X",
    O: "O",
  };
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null);
  const [resetButton, setResetButton] = useState(false);
  const WINNER_POSITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (const position of WINNER_POSITION) {
      const [a, b, c] = position;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
  };

  const resetStateGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
    setResetButton(false);
  };

  const updateBoard = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || winner) {
      return;
    } else {
      newBoard[index] = turn;
      setBoard(newBoard);
      setResetButton(true);
      turn === TURN.X ? setTurn(TURN.O) : setTurn(TURN.X);
      const someWinner = checkWinner(newBoard);
      const tie = newBoard.every((index) => index !== null);
      if (someWinner) {
        confetti();
        setWinner(someWinner);
      } else if (tie) {
        setWinner(false);
      }
    }
  };
  return (
    <>
      <main className="container select-none">
        <div className="h-16">
          {resetButton && <button onClick={resetStateGame}>Reset game</button>}{" "}
        </div>
        <h1 className="sm:text-5xl text-3xl">Tic Tac Toe</h1>
        <section className="grid grid-cols-3 gap-4 m-4">
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            );
          })}
        </section>
        <section className="TURN appearance-none flex place-content-center gap-3 mt-5 relative rounded-xl">
          <Square isSelected={turn === TURN.X} noBorder>
            {TURN.X}
          </Square>
          <Square isSelected={turn === TURN.O} noBorder>
            {TURN.O}
          </Square>
        </section>
      </main>

      {winner !== null && (
        <header className="grid place-content-center absolute top-0 left-0 h-screen w-screen select-none  bg-black/50">
          <section className="flex flex-col items-center bg-slate-900 border-solid border-2 border-white/80 w-72 h-auto rounded-xl p-2">
            <h2 className="text-3xl">
              {winner ? "Congratulatios!🎉" : "Tied"}{" "}
            </h2>
            <h3>{winner ? "Winner:" : "."} </h3>
            {winner && (
              <span className="grid place-content-center m-2 border-solid border-2 w-auto h-auto border-white/80 rounded-lg">
                <Square noHover noBorder>
                  {winner}
                </Square>
              </span>
            )}
            <footer>
              <button className="m-2" onClick={resetStateGame}>
                Play again
              </button>
            </footer>
          </section>
        </header>
      )}
    </>
  );
}

export default App;
