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

export const getGuessStatus = ({
  answer,
  guess,
}: {
  answer: string;
  guess: string;
}) => {
  let p1 = 0;
  const status = [];

  while (p1 < answer.length) {
    if (guess[p1] === answer[p1]) status.push(CARD_STATUSES.CORRECT);
    else if (answer.includes(guess[p1])) status.push(CARD_STATUSES.MAYBE);
    else status.push(CARD_STATUSES.WRONG);
    p1++;
  }
  return status;
};

export function isValidColorHex(str: string) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
}

export const DIMENSION_OPTIONS = Array.from({ length: 6 }, (_, i) => i + 3);

export const validateAnswerApi = async ({
  gameStore,
  id,
}: {
  gameStore: GameRow[];
  id: number;
}) => {
  const rowIndex = gameStore.findIndex((row) => !row.entered);
  const guess = gameStore[rowIndex]?.row?.map((item) => item.letter).join("");

  try {
    const response = await fetch("/api/validate", {
      method: "POST",
      body: JSON.stringify({
        id,
        guess,
      }),
    });
    return response;
  } catch (error) {}
};
