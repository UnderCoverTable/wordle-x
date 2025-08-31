"use client";
import { GameRow } from "@/constants";
import {} from "@/helpers";
import { GameAction } from "@/reducers/gameStoreReducer";
import React, { createContext } from "react";

export const WordleContext = createContext<{
  dimension: number;
  setDimension: (dimension: number) => void;
  gameStore: GameRow[];
  dispatch: React.Dispatch<GameAction>;
  hasGameEnded: boolean;
  setHasGameEnded: (hasGameEnded: boolean) => void;
  id: number;
  error: boolean;
  setError: (error: boolean) => void;
  flippingRow: number | null;
  setFlippingRow: (flippingRow: number | null) => void;
  validateionLoading: boolean;
  setValidateionLoading: (validateionLoading: boolean) => void;
} | null>(null);
