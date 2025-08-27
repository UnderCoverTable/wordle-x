"use client";

import { useContext, useEffect } from "react";
import Card from "@/components/GameBoard/Card";
import { WordleContext } from "@/context/WordleContext/WordleContext";

export default function GameBoard() {
  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const { gameStore, dispatch, answer, hasGameEnded } = context;

  useEffect(() => {
    if (hasGameEnded) return;
    const handleTyping = (e: KeyboardEvent) => {
      const input = e.key;

      const isLetter = /^[a-zA-Z]$/.test(input);
      const isAllowedKey = input === "Enter" || input === "Backspace";

      if (!(isLetter || isAllowedKey)) return;

      switch (input) {
        case "Enter":
          dispatch({ type: "ENTER", payload: { answer } });
          break;
        case "Backspace":
          dispatch({ type: "BACKSPACE" });
          break;

        default:
          dispatch({ type: "SET_LETTER", payload: { letter: input } });
          break;
      }
    };

    window.addEventListener("keydown", handleTyping);

    return () => {
      window.removeEventListener("keydown", handleTyping);
    };
  }, [hasGameEnded]);

  return (
    <div className="flex flex-col gap-2">
      {gameStore.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.row.map((cell, colIndex) => (
            <Card key={colIndex} letter={cell.letter} status={cell.status} />
          ))}
        </div>
      ))}
    </div>
  );
}
