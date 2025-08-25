// reducers/gameReducer.ts
import { CARD_STATUSES, GameRow } from "@/constants";
import { initGameStore } from "@/helpers";

export type GameState = GameRow[];

// actions/gameActions.ts
export type GameAction =
  | { type: "SET_LETTER"; payload: { letter: string; answer: string } }
  | { type: "ENTER"; payload: { letter: string } }
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
      const answer = action.payload.answer;

      return state.map((row, rIdx) => {
        let letterStatus = "";

        if (answer[colIndex] === letter) {
          letterStatus = CARD_STATUSES.CORRECT;
        } else if (answer.includes(letter)) {
          letterStatus = CARD_STATUSES.MAYBE;
        } else {
          letterStatus = CARD_STATUSES.WRONG;
        }

        return rIdx === rowIndex
          ? {
              ...row,
              row: row.row.map((cell, cIdx) =>
                cIdx === colIndex ? { status: letterStatus, letter } : cell
              ),
            }
          : row;
      });

    case "ENTER":
      const rowIndexEnter = state.findIndex((row) => !row.entered);
      if (rowIndexEnter === -1) return state;

      const isRowFilled = state[rowIndexEnter].row.every((cell) => cell.letter);
      if (isRowFilled) {
        return state.map((row, rIdx) =>
          rIdx === rowIndexEnter
            ? {
                ...row,
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
