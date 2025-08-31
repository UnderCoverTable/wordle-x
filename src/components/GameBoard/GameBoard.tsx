"use client";
import { useContext, useEffect, useState } from "react";
import Card from "@/components/GameBoard/Card";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { motion } from "motion/react";
import { useLetterInput } from "@/hooks/useLetterInput/useLetterInput";
import { toaster } from "@/components/ui/toaster";

export default function GameBoard() {
  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const {
    gameStore,
    hasGameEnded,
    id,
    error,
    setError,
    flippingRow,
    dimension,
  } = context;
  const currentRow = gameStore.findIndex((item) => !item.entered);

  useEffect(() => {
    if (hasGameEnded) return;

    const handleKey = useLetterInput(context);

    const handleTyping = async (e: KeyboardEvent) => {
      const input = e.key;
      const isLetter = /^[a-zA-Z]$/.test(input);
      const isAllowedKey = input === "Enter" || input === "Backspace";
      if (!(isLetter || isAllowedKey)) return;

      await handleKey(input);
    };

    window.addEventListener("keydown", handleTyping);
    return () => window.removeEventListener("keydown", handleTyping);
  }, [hasGameEnded, id, gameStore, dimension]);

  if (error) {
    toaster.create({
      title: "Invalid Word",
    });
  }
  return (
    <div className="flex flex-col gap-2" key={dimension}>
      {gameStore.map((row, rowIndex) => {
        const isRowFlipping = flippingRow === rowIndex;

        return (
          <div
            key={rowIndex}
            className="flex gap-2 justify-center"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              style={{ display: "flex", flexDirection: "row", gap: 12 }}
              transition={{ duration: 0.25 }}
              animate={
                !!(error && rowIndex === currentRow)
                  ? { x: [0, -5, 5, -5, 5, 0] }
                  : { x: 0 }
              }
              onAnimationComplete={() => setError(false)}
            >
              {row.row.map((cell, colIndex) => (
                <Card
                  letter={cell.letter}
                  status={cell.status}
                  isFlipping={isRowFlipping}
                  delay={colIndex * 0.12}
                />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
