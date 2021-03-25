import { combineReducers } from "redux";
import {settingsReducerLang, settingsReducerAutoVoice, settingsReducerCountNewWords, settingsReducerCountMaxDailyCards} from "./settings-reducer";

const rootReducer = combineReducers({
    lang: settingsReducerLang,
    isAutoVoice: settingsReducerAutoVoice,
    countNewWords: settingsReducerCountNewWords,
    countMaxDayCards: settingsReducerCountMaxDailyCards
});

// type RootReducerType = typeof rootReducer;
// export type AppStateType = ReturnType<RootReducerType>

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;