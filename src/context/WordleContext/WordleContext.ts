'use client'
import { GameRow } from "@/helpers";
import { createContext } from "react";

export const WordleContext = createContext<{
  dimension: number;
  setDimension: (dimension: number) => void;
  gameStore: GameRow[];
  setGameStore: (store: GameRow[]) => void;
} | null>(null);
