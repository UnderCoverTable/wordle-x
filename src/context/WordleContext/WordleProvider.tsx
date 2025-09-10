"use client";
import { CARD_STATUSES, GAME_STATUS, GameState } from "@/constants";
import { useAuth } from "@/context/AuthContext/AuthProvider";
import { WordleContext } from "@/context/WordleContext/WordleContext";
import { initGameStore } from "@/helpers";
import { gameReducer } from "@/reducers/gameStoreReducer";
import { getSessionId } from "@/utils/session/session";
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
  const { user, authLoading } = useAuth();

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const [stateResponse, answerResponse] = await Promise.all([
          fetch(
            `/api/state?dimension=${dimension}&sessionID=${
              user?.id ?? getSessionId()
            }`
          ),
          fetch(
            `/api/answer?dimension=${dimension}&sessionID=${
              user?.id ?? getSessionId()
            }`
          ),
        ]);
        const { data: state } = await stateResponse.json();
        console.log('state: ', !!state);

        const dataAnswer = await answerResponse.json();
        const answerID = dataAnswer?.id?.id ?? dataAnswer?.id;

        if (!!state) {
          dispatch({
            type: "SET_GAME_STATE",
            payload: { gameState: state },
          });
        }

        setGameStatus({
          status: GAME_STATUS.IN_PROGRESS,
          answerID,
        });
      } catch (err) {
        console.error("Error fetching answer:", err);
      }
    };
    if (!authLoading) {
      fetchAnswer();
    }
  }, [dimension, authLoading]);

  useEffect(() => {
    const storeGameState = () => {
      try {
        fetch(`/api/state`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wordID: gameStatus.answerID,
            state: gameStore,
            sessionID: user?.id ?? getSessionId(),
            gameStatus: gameStatus.status,
          }),
        });
      } catch (err) {
        console.error("Error fetching answer:", err);
      }
    };

    if (gameStatus.answerID && !validateionLoading) {
      storeGameState();
    }
  }, [validateionLoading]);

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
        user,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
