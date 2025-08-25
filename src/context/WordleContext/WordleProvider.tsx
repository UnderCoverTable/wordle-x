"use client";

import { WordleContext } from "@/context/WordleContext/WordleContext";
import { initGameStore } from "@/helpers";
import { gameReducer } from "@/reducers/gameStoreReducer";
import { ReactNode, useEffect, useReducer, useState } from "react";

export const WordleProvider = ({ children }: { children: ReactNode }) => {
  const [dimension, setDimension] = useState(5);
  const [gameStore, dispatch] = useReducer(gameReducer, initGameStore(5));
  const answer = "HELLO";

  useEffect(() => {}, [dimension]);

  return (
    <WordleContext.Provider value={{ dimension, setDimension, gameStore, dispatch }}>
      {children}
    </WordleContext.Provider>
  );
};
