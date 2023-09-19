import { useState } from "react";
import Square from "./components/Square";
import confetti from "canvas-confetti";
import WinnerModal from "./components/WinnerModal";
import { TURN } from "./const";
import { checkWinnerFrom } from "./components/logic/board";

function App() {
  const [resetButton, setResetButton] = useState(false);
  const [board, setBoard] = useState(() => {
    const getBoardFromStorage = window.localStorage.getItem("board");
    if (getBoardFromStorage) {
      setResetButton(true);
      return JSON.parse(window.localStorage.getItem("board"));
    }
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const getTurnFromStorage = window.localStorage.getItem("turn");
    {
      return getTurnFromStorage ? getTurnFromStorage : TURN.X;
    }
  });
  const [winner, setWinner] = useState(null);

  const resetStateGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURN.X);
    setWinner(null);
    setResetButton(false);
    window.localStorage.clear();
  };

  const updateBoard = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || winner) {
      return;
    } else {
      newBoard[index] = turn;
      setBoard(newBoard);
      setResetButton(true);
      const newTurn = turn === TURN.X ? TURN.O : TURN.X;
      setTurn(newTurn);
      window.localStorage.setItem("board", JSON.stringify(newBoard));
      window.localStorage.setItem("turn", newTurn);
      const someWinner = checkWinnerFrom(newBoard);
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
      <main className="container select-none ">
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

      <WinnerModal resetStateGame={resetStateGame} winner={winner} />
    </>
  );
}

export default App;
