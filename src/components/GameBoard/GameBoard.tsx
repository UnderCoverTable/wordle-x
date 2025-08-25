"use client";

import { useContext, useEffect } from "react";
import Card from "@/components/GameBoard/Card";
import { WordleContext } from "@/context/WordleContext/WordleContext";

export default function GameBoard() {
  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const { gameStore, dispatch } = context;
  console.log("gameStore: ", gameStore);

  useEffect(() => {
    const handleTyping = (e: KeyboardEvent) => {
      console.log("e.key: ", e.key);
      const input = e.key;

      switch (input) {
        case "Enter":
          dispatch({ type: "ENTER", payload: { letter: input } });
          break;
        case "Backspace":
          dispatch({ type: "BACKSPACE", payload: { letter: input } });
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
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {gameStore.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.row.map((cell, colIndex) => (
            <Card
              key={colIndex}
              letter={cell.letter}
              status={cell.status}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
