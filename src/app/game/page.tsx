import GameBoard from "@/components/GameBoard/GameBoard";
import { WordleProvider } from "@/context/WordleContext/WordleProvider";

export default function Game() {
  return (
    <WordleProvider>
      <div className="flex items-center justify-center min-h-screen">
        <GameBoard />
      </div>
    </WordleProvider>
  );
}
