export type hangmanType = {
  word: string;
  wordTranslate: string;
  wordId: string;
  isCorrect: boolean;
  counterCorrect: number;
  counterWrong: number;
  correctRow: number;
};

const InitialStateHangman: hangmanType = {
  word: "",
  wordTranslate: "",
  wordId: "",
  isCorrect: true,
  counterCorrect: 0,
  counterWrong: 0,
  correctRow: 0,
};

const SET_IS_CORRECT = "SET_IS_CORRECT";
const SET_COUNTER_CORRECT = "SET_COUNTER_CORRECT";
const SET_COUNTER_WRONG = "SET_COUNTER_WRONG";
const SET_CORRECT_ROW = "SET_CORRECT_ROW";

export const hangmanReducer = (state = InitialStateHangman, action: any) : hangmanType => {
  switch (action.type) {
    case SET_IS_CORRECT:
      return {
        ...state,
        isCorrect: true,
      };
    case SET_COUNTER_CORRECT:
      return {
        ...state,
        counterCorrect: state.counterCorrect + 1,
      };
    case SET_COUNTER_WRONG:
      return {
        ...state,
        counterWrong: state.counterWrong + 1,
      };
      case SET_CORRECT_ROW:
      return {
        ...state,
        correctRow: state.correctRow + 1,
      };
      default:
        return state;
  }
};
