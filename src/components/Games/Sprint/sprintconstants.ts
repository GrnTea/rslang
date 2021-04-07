export const ERROR = "Error";
export const ERROR_WORD = "вечность";
export const RIGHT = "Верно";
export const RIGHT_ARROW = "ArrowRight";
export const DICTIONARY = "DICTIONARY";
export interface IButtons {
    en: {
        rightButton: string,
        wrongButton: string,
      },
      ru: {
        rightButton: string,
        wrongButton: string,
      },
}
export const Buttons: IButtons = {
  en: {
    rightButton: "Right",
    wrongButton: "Wrong",
  },
  ru: {
    rightButton: "Верно",
    wrongButton: "Неверно",
  },
};
