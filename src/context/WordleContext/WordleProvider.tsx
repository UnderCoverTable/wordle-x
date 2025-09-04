"use client";
import { CARD_STATUSES, GAME_STATUS, GameState } from "@/constants";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { initGameStore } from "@/helpers";
import { gameReducer } from "@/reducers/gameStoreReducer";
import { ReactNode, useEffect, useReducer, useState } from "react";

export const WordleProvider = ({ children }: { children: ReactNode }) => {
  const [dimension, setDimension] = useState<number>(5);
  const [error, setError] = useState(false);
  const [flippingRow, setFlippingRow] = useState<number | null>(null);
  const [validateionLoading, setValidateionLoading] = useState(false);
  const [gameStore, dispatch] = useReducer(gameReducer, initGameStore(5));
  const [gameStatus, setGameStatus] = useState<GameState>({
    status: "",
    answerID: null,
  });

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const response = await fetch(`/api/answer?dimension=${dimension}`);
        const data = await response.json();
        const answerID = data?.id?.id;

        setGameStatus({
          status: GAME_STATUS.IN_PROGRESS,
          answerID,
        });
      } catch (err) {
        console.error("Error fetching answer:", err);
      }
    };

    fetchAnswer();
  }, [dimension]);

  return (
    <WordleContext.Provider
      value={{
        dimension,
        setDimension,
        gameStore,
        dispatch,
        error,
        setError,
        flippingRow,
        setFlippingRow,
        validateionLoading,
        setValidateionLoading,
        gameStatus,
        setGameStatus,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
