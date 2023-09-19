import { WINNER_POSITION } from "../../const";

export const checkWinnerFrom = (newBoard) => {
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
