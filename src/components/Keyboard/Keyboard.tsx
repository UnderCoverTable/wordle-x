"use client";
import Key from "@/components/Keyboard/Key";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { getLetterStatus } from "@/helpers";
import { useContext, useEffect, useState } from "react";

export default function Keyboard({}) {
const [letterStatusMap, setLetterStatusMap] = useState<Record<string, string>>({});

  const context = useContext(WordleContext);
  if (!context)
    throw new Error("WordleContext must be used within WordleProvider");

  const { gameStore } = context;

  useEffect(() => {
    setLetterStatusMap(getLetterStatus(gameStore));
  }, [gameStore.filter((item) => item.entered).length]);

  const letters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      {letters.map((letterRow, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {letterRow.map((letter, i) => (
            <Key
              letter={letter}
              status={letterStatusMap[letter.toLowerCase()]}
              key={letter}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
