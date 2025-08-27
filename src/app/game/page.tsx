"use client";
import GameBoard from "@/components/GameBoard/GameBoard";
import Keyboard from "@/components/Keyboard/Keyboard";
import { WordleProvider } from "@/context/WordleContext/WordleProvider";

export default function Game() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen">
      <GameBoard />
      <Keyboard />
    </div>
  );
}
