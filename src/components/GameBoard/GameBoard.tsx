'use client'

import { useContext } from "react";
import Card from "@/components/GameBoard/Card";
import { WordleContext } from "@/context/WordleContext/WordleContext";

export default function GameBoard() {
  const context = useContext(WordleContext);
  if (!context) throw new Error("WordleContext must be used within WordleProvider");

  const { gameStore } = context;

  return (
    <div className="flex flex-col gap-2">
      {gameStore.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 justify-center">
          {row.row.map((cell, cellIndex) => (
            <Card
              key={cellIndex}
              // letter={cell.letter}
              // status={cell.status}
              // rowIndex={rowIndex}
              // cellIndex={cellIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}