import { CARD_STATUSES, Cell, GameRow, STATUS_PRIORITY } from "@/constants";

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
  return gameStore
    .filter((row) => row.entered)
    .flatMap((row) => row.row)
    .reduce<Record<string, string>>((map, { letter, status }) => {
      if (
        !map[letter] ||
        STATUS_PRIORITY[status] > STATUS_PRIORITY[map[letter]]
      ) {
        map[letter] = status;
      }
      return map;
    }, {});
};

export function isValidColorHex(str: string) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
}

export const DIMENSION_OPTIONS = Array.from({ length: 6 }, (_, i) => i + 3);
