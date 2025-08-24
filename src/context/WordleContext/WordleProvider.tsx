"use client";

import { WordleContext } from "@/context/WordleContext/WordleContext";
import { GameRow, initGameStore } from "@/helpers";
import { ReactNode, useEffect, useState } from "react";

export const WordleProvider = ({ children }: { children: ReactNode }) => {
  const [dimension, setDimension] = useState(5);
  const [gameStore, setGameStore] = useState<GameRow[]>(() => initGameStore(5));

  useEffect(() => {
    setGameStore(initGameStore(dimension));
  }, [dimension]);
  
  return (
    <WordleContext.Provider
      value={{ dimension, setDimension, gameStore, setGameStore }}
    >
      {children}
    </WordleContext.Provider>
  );
};
