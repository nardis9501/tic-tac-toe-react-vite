import React from "react";
import Square from "./Square";
export default function WinnerModal({ winner, resetStateGame }) {
  if (winner === null) return;
  const winnerText = winner ? "Congratulatios!🎉" : "Tied";
  const winnerText2 = winner ? "Winner:" : ".";
  return (
    <header className="grid place-content-center absolute top-0 left-0 h-screen w-screen select-none  bg-black/50">
      <section className="flex flex-col items-center bg-slate-900 border-solid border-2 border-white/80 w-72 h-auto rounded-xl p-2">
        <h2 className="text-3xl">{winnerText} </h2>
        <h3>{winnerText2} </h3>
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
  );
}
