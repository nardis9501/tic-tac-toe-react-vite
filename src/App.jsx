import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Square from "./assets/components/Square";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  console.log(board);

  return (
    <>
      <h1 className="">Tic Tac Toe</h1>
      <section className="GAME grid grid-cols-3 gap-4 mt-4">
        {board.map((_, index) => {
          return <Square key={index}>{"x"}</Square>;
        })}
      </section>
      <section className="TURN appearance-none flex place-content-center gap-3 mt-5 relative rounded-xl">
        <Square noBorder>x</Square>
        <Square noBorder>0</Square>
      </section>
    </>
  );
}

export default App;
