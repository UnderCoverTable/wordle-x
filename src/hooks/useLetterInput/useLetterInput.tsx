import { validateAnswerApi } from "@/helpers";

export const useLetterInput = (context: any) => {
  const {
    gameStore,
    id,
    dispatch,
    setError,
    setFlippingRow,
    hasGameEnded,
    dimension,
    setValidateionLoading,
    validateionLoading,
  } = context;
  const currentRow = gameStore.findIndex((item: any) => !item.entered);

  const handleKey = async (key: string) => {
    if (hasGameEnded || validateionLoading) return;

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

          const response = await validateAnswerApi({ guess, id });
          const validatedAnswer = await response?.json();

          if (validatedAnswer?.valid) {
            dispatch({
              type: "ENTER",
              payload: { status: validatedAnswer.status },
            });
            setFlippingRow(currentRow);
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
