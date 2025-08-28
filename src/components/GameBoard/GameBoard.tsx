"use client";
import { useContext, useEffect, useState } from "react";
import Card from "@/components/GameBoard/Card";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { motion } from "motion/react";
import { toaster } from "@/components/ui/toaster";

export default function GameBoard() {
  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const { gameStore, dispatch, hasGameEnded } = context;
  const [error, setError] = useState(false);
  const currentRow = gameStore.findIndex((item) => !item.entered);

  useEffect(() => {
    if (hasGameEnded) return;
    const handleTyping = (e: KeyboardEvent) => {
      const input = e.key;

      const isLetter = /^[a-zA-Z]$/.test(input);
      const isAllowedKey = input === "Enter" || input === "Backspace";

      if (!(isLetter || isAllowedKey)) return;

      switch (input) {
        case "Enter":
          if (false) {
            setError(true);
            toaster.create({
              description: "Error",
              type: "info",
            });
          } else {
            dispatch({ type: "ENTER" });
          }
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
      {gameStore.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="flex gap-2 justify-center">
            <motion.div
              key={rowIndex}
              style={{ display: "flex", flexDirection: "row", gap: 12 }}
              transition={{ duration: 0.25 }}
              animate={
                !!(error && rowIndex === currentRow)
                  ? { x: [0, -5, 5, -5, 5, 0] }
                  : { x: 0 }
              }
              onAnimationComplete={() => {
                setError(false);
              }}
            >
              {row.row.map((cell, colIndex) => (
                <Card
                  key={colIndex}
                  letter={cell.letter}
                  status={cell.status}
                />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
