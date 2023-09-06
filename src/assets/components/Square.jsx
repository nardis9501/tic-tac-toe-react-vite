import React from "react";

export default function Square({ children, index, noBorder }) {
  return (
    <div
      className={
        noBorder
          ? "grid text-3xl place-items-center  h-28 w-28 cursor-pointer"
          : "SQUARE grid text-3xl place-items-center border-solid border-2 border-y-sky-600 border-x-sky-300 rounded-md h-28 w-28 cursor-pointer"
      }
    >
      {children}
    </div>
  );
}
