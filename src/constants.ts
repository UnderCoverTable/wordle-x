export type Cell = {
  letter: string;
  status: string;
};

export type GameRow = {
  row: Cell[];
  entered: boolean;
};

export const CARD_STATUSES = {
  CORRECT: "correct",
  MAYBE: "maybe",
  WRONG: "wrong",
};

export const STATUS_PRIORITY = {
  [CARD_STATUSES.WRONG]: 0,
  [CARD_STATUSES.MAYBE]: 1,
  [CARD_STATUSES.CORRECT]: 2,
};
