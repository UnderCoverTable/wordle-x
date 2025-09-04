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

export const GAME_STATUS = {
  IN_PROGRESS: "in-progress",
  WON: "won",
  LOST: "lost",
};

type GameStatusType = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];

export type GameState = {
  status: GameStatusType | "";
  answerID: number | null;
};
