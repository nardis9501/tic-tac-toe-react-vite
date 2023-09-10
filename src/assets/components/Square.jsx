import React from "react";

export default function Square({
  children,
  index,
  noBorder,
  updateBoard,
  isSelected,
  noHover,
}) {
  const seleted = `${isSelected ? "bg-blue-400 " : ""}`; //'rounded-xl bg-blue-400'
  const hover = `${noHover ? " " : "hover:bg-slate-400/40"}`;
  const border = `${
    noBorder
      ? ""
      : "border-solid border-2 border-y-sky-600 border-x-sky-300 cursor-pointer"
  }`;
  const handlerClick = () => {
    updateBoard && updateBoard(index);
  };
  return (
    <div
      onClick={handlerClick}
      className={`grid text-3xl place-items-center rounded-lg md:h-28 md:w-28 sm:h-24 sm:w-24 h-16 w-16  ${seleted} ${border} ${hover}`}
    >
      {children}
    </div>
  );
}
