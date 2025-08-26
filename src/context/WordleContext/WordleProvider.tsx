"use client";

import { CARD_STATUSES } from "@/constants";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { initGameStore } from "@/helpers";
import { gameReducer } from "@/reducers/gameStoreReducer";
import { ReactNode, useEffect, useReducer, useState } from "react";

export const WordleProvider = ({ children }: { children: ReactNode }) => {
  const [dimension, setDimension] = useState(5);
  const [gameStore, dispatch] = useReducer(gameReducer, initGameStore(5));
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const answer = "hello";

  useEffect(() => {
    const rowIndex = gameStore.findLastIndex((row) => row.entered);
    const isGuessCorrect = gameStore[rowIndex]?.row.every(
      (item) => item.status === CARD_STATUSES.CORRECT
    );
    const outOfTries = rowIndex === gameStore.length - 1;
    if (isGuessCorrect || outOfTries) {
      setHasGameEnded(true);
    }
  }, [gameStore.filter((item) => item.entered).length]);

  useEffect(() => {}, [dimension]);

  return (
    <WordleContext.Provider
      value={{
        dimension,
        setDimension,
        gameStore,
        dispatch,
        answer,
        hasGameEnded,
        setHasGameEnded,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
