const asd = (n) => console.log(n);
const DESCRIPTION_RU = (name: string) => `Тренировка ${name} развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.`;
const DESCRIPTION_ENG = (name: string) => `The ${name} workout develops vocabulary. The more words you know, the more experience points you get.`;
export const GAME : any = {
  ru: {
    AUDIOCALL: {
      NAME: "Аудиовызов",
      DESCRIPTION() {
        return DESCRIPTION_RU(this.NAME);
      },
    },
    SPRINT: {
      NAME: "Спринт",
      DESCRIPTION() {
        return DESCRIPTION_RU(this.NAME);
      },
    },
    SAVANNA: {
      NAME: "Саванна",
      DESCRIPTION() {
        return DESCRIPTION_RU(this.NAME);
      },
    },
  },
  en: {
    AUDIOCALL: {
      NAME: "Audiocall",
      DESCRIPTION() {
        return DESCRIPTION_ENG(this.NAME);
      },
    },
    SPRINT: {
      NAME: "Sprint",
      DESCRIPTION() {
        return DESCRIPTION_ENG(this.NAME);
      },
    },
    SAVANNA: {
      NAME: "Savannah",
      DESCRIPTION() {
        return DESCRIPTION_ENG(this.NAME);
      },
    },
  },
};

export const GAME_NAME_AUDIOCALL_RU = "Аудиовызов";
export const GAME_NAME_AUDIOCALL_ENG = "Audiocall";
export const GAME_NAME_SPRINT_RU = "Спринт";
export const GAME_NAME_SPRINT_ENG = "Sprint";
export const GAME_NAME_SAVANNA_RU = "Саванна";
export const GAME_NAME_SAVANNA_ENG = "Savannah";
export const DESCRIPTION_AUDIOCALL_RU = "Тренировка Аудиовызов развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.";
export const DESCRIPTION_AUDIOCALL_ENG = "The Audiocall workout develops vocabulary. The more words you know, the more experience points you get.";
export const DESCRIPTION_SPRINT_RU = "Тренировка Спринт развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.";
export const DESCRIPTION_SPRINT_ENG = "The Sprint workout develops vocabulary. The more words you know, the more experience points you get.";
export const DESCRIPTION_SAVANNAH_RU = "Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше очков опыта получишь.";
export const DESCRIPTION_SAVANNAH_ENG = "The Savannah workout develops vocabulary. The more words you know, the more experience points you get.";
export const SELECT_SAVANNAH = "Savannah";
export const SELECT_AUDIOCALL = "Audiocall";
export const SELECT_SPRINT = "Sprint";
