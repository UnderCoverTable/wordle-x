// reducers/gameReducer.ts
import { CARD_STATUSES, GameRow } from "@/constants";
import { initGameStore } from "@/helpers";

export type GameState = GameRow[];

// actions/gameActions.ts
export type GameAction =
  | { type: "SET_LETTER"; payload: { letter: string } }
  | { type: "ENTER"; payload: { letter: string; answer: string } }
  | { type: "BACKSPACE"; payload: { letter: string } };

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  const letter = action.payload.letter;

  switch (action.type) {
    case "SET_LETTER":
      const rowIndex = state.findIndex((row) => !row.entered);
      if (rowIndex === -1) return state;
      const colIndex = state[rowIndex].row.findIndex((cell) => !cell.letter);
      if (colIndex === -1) return state;

      return state.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              row: row.row.map((cell, cIdx) =>
                cIdx === colIndex ? { ...cell, letter } : cell
              ),
            }
          : row
      );

    case "ENTER":
      const answer = action.payload.answer;

      const rowIndexEnter = state.findIndex((row) => !row.entered);
      if (rowIndexEnter === -1) return state;

      const isRowFilled = state[rowIndexEnter].row.every((cell) => cell.letter);

      const getStatus = (letter: string, colIndex: number) => {
        if (answer[colIndex] === letter) {
          return CARD_STATUSES.CORRECT;
        } else if (answer.includes(letter)) {
          return CARD_STATUSES.MAYBE;
        } else {
          return CARD_STATUSES.WRONG;
        }
      };

      if (isRowFilled) {
        return state.map((row, rIdx) =>
          rIdx === rowIndexEnter
            ? {
                ...row,
                row: row.row.map((cell, cIdx) => {
                  return { ...cell, status: getStatus(cell.letter, cIdx) };
                }),
                entered: true,
              }
            : row
        );
      }

      return state;

    case "BACKSPACE":
      const rowIndexBack = state.findIndex((row) => !row.entered);
      if (rowIndexBack === -1) return state;
      const colIndexBack = state[rowIndexBack].row.findLastIndex(
        (cell) => cell.letter
      );
      if (colIndexBack === -1) return state;

      return state.map((row, rIdx) =>
        rIdx === rowIndexBack
          ? {
              ...row,
              row: row.row.map((cell, cIdx) =>
                cIdx === colIndexBack ? { status: "", letter: "" } : cell
              ),
            }
          : row
      );

    default:
      return state;
  }
};
