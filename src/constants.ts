export type Cell = {
  letter: string;
  status: string;
};

export type GameRow = {
  row: Cell[];
  entered: boolean;
};

export const statusColors = {
  wrong: "#3a3a3c",
  maybe: "#b59f3b",
  correct: "#538d4e",
};