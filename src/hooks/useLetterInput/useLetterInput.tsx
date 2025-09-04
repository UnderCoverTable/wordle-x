import {
  CARD_STATUSES,
  Cell,
  GAME_STATUS,
  GameRow,
  GameState,
} from "@/constants";
import { validateAnswerApi } from "@/helpers";

export const useLetterInput = (context: any) => {
  const {
    gameStore,
    dispatch,
    setError,
    setFlippingRow,
    gameStatus,
    dimension,
    setValidateionLoading,
    validateionLoading,
    setGameStatus,
  } = context;
  const currentRow = gameStore.findIndex((item: any) => !item.entered);

  const handleKey = async (key: string) => {
    if (
      gameStatus.status === GAME_STATUS.WON ||
      gameStatus.status === GAME_STATUS.LOST ||
      validateionLoading
    )
      return;

    switch (key) {
      case "Enter":
        const rowIndex = gameStore.findIndex((row: any) => !row.entered);
        const guess = gameStore[rowIndex]?.row
          ?.map((item: any) => item.letter)
          .join("");

        if (guess.length < dimension) {
          setError(true);
          break;
        }

        try {
          setValidateionLoading(true);

          const response = await validateAnswerApi({
            guess,
            id: gameStatus.answerID,
          });
          const validatedAnswer = await response?.json();

          if (validatedAnswer?.valid) {
            dispatch({
              type: "ENTER",
              payload: { status: validatedAnswer.status },
            });
            setFlippingRow(currentRow);

            const isGuessCorrect = validatedAnswer.status.every(
              (item: string) => item === CARD_STATUSES.CORRECT
            );

            const outOfTries = rowIndex === gameStore.length - 1;

            if (isGuessCorrect) {
              setGameStatus((prev: GameState) => {
                return { ...prev, status: GAME_STATUS.WON };
              });
            } else if (outOfTries) {
              setGameStatus((prev: GameState) => {
                return { ...prev, status: GAME_STATUS.LOST };
              });
            }
          } else {
            setError(true);
          }
        } catch (error) {
        } finally {
          setValidateionLoading(false);
        }

        break;

      case "Backspace":
        dispatch({ type: "BACKSPACE" });
        break;

      default:
        dispatch({
          type: "SET_LETTER",
          payload: { letter: key.toLowerCase() },
        });
        break;
    }
  };

  return handleKey;
};
