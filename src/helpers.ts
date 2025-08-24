export type Cell = {
  letter: string;
  status: string;
};

export type GameRow = {
  row: Cell[];
  entered: boolean;
};

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
