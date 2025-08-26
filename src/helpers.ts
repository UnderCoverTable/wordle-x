import { CARD_STATUSES, Cell, GameRow } from "@/constants";

export const initGameStore = (dimension: number): GameRow[] => {
  const cols = dimension;
  const rows = dimension + 1;

  const store: GameRow[] = [];

  for (let i = 0; i < rows; i++) {
    const rowArray: Cell[] = [];
    for (let j = 0; j < cols; j++) {
      rowArray.push({ letter: "", status: "" });
    }

    store.push({ row: rowArray, entered: false });
  }

  return store;
};

export const getLetterStatus = (gameStore: GameRow[]) => {
  const allEnteredRows = gameStore
    .filter((item) => item.entered)
    .map((item) => item.row);

  const letterStatus: Record<string, string> = {};

  allEnteredRows.flat().forEach(({ letter, status }) => {
    if (letterStatus[letter]) {
      if (letterStatus[letter] === CARD_STATUSES.WRONG) {
        letterStatus[letter] = status;
      }
      if (letterStatus[letter] === CARD_STATUSES.MAYBE) {
        if (status === CARD_STATUSES.CORRECT) {
          letterStatus[letter] = status;
        }
      }
    } else {
      letterStatus[letter] = status;
    }
  });

  return letterStatus;
};
