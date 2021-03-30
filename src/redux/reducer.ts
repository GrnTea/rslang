import { combineReducers } from "redux";
import {
  settingsReducerLang, settingsReducerAutoVoice, settingsReducerCountNewWords, settingsReducerCountMaxDailyCards,
} from "./main-settings_reducer";
import { settingsReducerButtons, settingsReducerCard } from "./learning-settings_reducer";
import { userReducer } from "./user_reducer";

const rootReducer = combineReducers({
  lang: settingsReducerLang,
  isAutoVoice: settingsReducerAutoVoice,
  countNewWords: settingsReducerCountNewWords,
  countMaxDayCards: settingsReducerCountMaxDailyCards,
  buttonsSettings: settingsReducerButtons,
  cardSettings: settingsReducerCard,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
