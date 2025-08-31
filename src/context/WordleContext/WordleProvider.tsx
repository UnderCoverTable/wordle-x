"use client";
import { CARD_STATUSES } from "@/constants";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { initGameStore } from "@/helpers";
import { gameReducer } from "@/reducers/gameStoreReducer";
import { ReactNode, useEffect, useReducer, useState } from "react";

export const WordleProvider = ({ children }: { children: ReactNode }) => {
  const [dimension, setDimension] = useState<number>(5);
  const [gameStore, dispatch] = useReducer(gameReducer, initGameStore(5));
  const [hasGameEnded, setHasGameEnded] = useState<boolean>(false);
  const [id, setid] = useState(0);
  const [error, setError] = useState(false);
  const [flippingRow, setFlippingRow] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/answer?dimension=${dimension}`)
      .then((res) => res.json())
      .then((data) => setid(data.id.id))
      .catch((err) => console.error("Error fetching answer:", err));
  }, [dimension]);

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

  return (
    <WordleContext.Provider
      value={{
        id,
        dimension,
        setDimension,
        gameStore,
        dispatch,
        hasGameEnded,
        setHasGameEnded,
        error,
        setError,
        flippingRow,
        setFlippingRow,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
