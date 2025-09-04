"use client";
import { useContext, useEffect, useState } from "react";
import Card from "@/components/GameBoard/Card";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { motion } from "motion/react";
import { useLetterInput } from "@/hooks/useLetterInput/useLetterInput";
import { toaster } from "@/components/ui/toaster";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { GAME_STATUS } from "@/constants";

export default function GameBoard() {
  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const {
    gameStore,
    error,
    setError,
    flippingRow,
    dimension,
    validateionLoading,
    gameStatus,
  } = context;
  const currentRow = gameStore.findIndex((item) => !item.entered);

  useEffect(() => {
    if (gameStatus.status !== GAME_STATUS.IN_PROGRESS) return;
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
  }, [gameStatus, gameStore, dimension]);

  if (error) {
    toaster.create({
      title: (
        <Flex align="center" justify={"center"}>
          <Text style={{ fontWeight: 800, fontSize: "16px" }}>
            Invalid Word
          </Text>
        </Flex>
      ),
    });
  }

  return (
    <div className="flex flex-col gap-2" key={dimension}>
      {gameStore.map((row, rowIndex) => {
        const isRowFlipping = flippingRow === rowIndex;

        return (
          <div
            key={rowIndex}
            className="flex justify-center relative"
            style={{ height: "62px" }}
          >
            {/* Row */}
            <motion.div
              style={{ display: "flex", flexDirection: "row", gap: 8 }}
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
                  key={colIndex}
                  letter={cell.letter}
                  status={cell.status}
                  isFlipping={isRowFlipping}
                  delay={colIndex * 0.12}
                />
              ))}
            </motion.div>

            {/* Spinner next to row */}
            {currentRow === rowIndex && validateionLoading && (
              <div className="absolute left-full translate-x-4 flex items-center h-full">
                <Spinner size="sm" animationDuration="0.8s" borderWidth="4px" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
