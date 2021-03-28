// Language reducer
const TOGGLE_LANGUAGE = "TOGGLE_LANGUAGE";

export type InitialStateTypeLang = {
    lang: string
}

const initialStateLang: InitialStateTypeLang = {
    lang: "ru"
}

export const settingsReducerLang = (state = initialStateLang, action:any): InitialStateTypeLang => {
    switch (action.type) {
        case TOGGLE_LANGUAGE:
            return {...state, lang: action.value}

        default: return state;
    }
}

export type ToggleLangActionType = {
    type: typeof TOGGLE_LANGUAGE,
    value: any,
    payload: any
}

export const toggleLang = (lang: React.ChangeEvent<HTMLInputElement>):ToggleLangActionType => ({
    type: TOGGLE_LANGUAGE,
    value: lang.target.value,
    payload: lang.target.value
});

// Automatic voice preview

const TOGGLE_ISAUTOVOICE = "TOGGLE_ISAUTOVOICE";

export type InitialStateTypeIsAutoVoice = {
    isAutoVoice: boolean
}

const initialStateIsAutoVoice: InitialStateTypeIsAutoVoice = {
    isAutoVoice: true
}

export const settingsReducerAutoVoice = (state = initialStateIsAutoVoice, action: any): InitialStateTypeIsAutoVoice => {
    switch (action.type) {
        case TOGGLE_ISAUTOVOICE:
            return {...state, isAutoVoice: action.value}

        default: return state;
    }
};

export type ToggleIsAutoVoiceActionType = {
    type: typeof TOGGLE_ISAUTOVOICE,
    value: any,
    payload: any
}

export const toggleIsAutoVoice = (isAutoVoice: React.ChangeEvent<HTMLInputElement>):ToggleIsAutoVoiceActionType => ({
    type: TOGGLE_ISAUTOVOICE,
    value: isAutoVoice.target.checked,
    payload: isAutoVoice.target.checked
});


// Change count daily learning words

const INCREMENT_COUNTNEWWORDS = "INCREMENT_COUNTNEWWORDS";
const DECREMENT_COUNTNEWWORDS = "DECREMENT_COUNTNEWWORDS";

export type InitialStateTypeCountNewWords = {
    countNewWords: number
}

const initialStateCountNewWords: InitialStateTypeCountNewWords = {
    countNewWords: 10
}

export const settingsReducerCountNewWords = (state = initialStateCountNewWords, action: any): InitialStateTypeCountNewWords => {
    switch (action.type) {
        case INCREMENT_COUNTNEWWORDS:
            return {...state, countNewWords: action.value + 1}
        case DECREMENT_COUNTNEWWORDS:
            return {...state, countNewWords: action.value - 1}

        default: return state;
    }
};

export type ToggleCountNewWordsActionType = {
    type: typeof INCREMENT_COUNTNEWWORDS | typeof DECREMENT_COUNTNEWWORDS,
    value: any,
    payload: any
}

export const incrementCountNewWords = (countNewWords: number):ToggleCountNewWordsActionType => ({
    type: INCREMENT_COUNTNEWWORDS,
    value: countNewWords,
    payload: countNewWords
});

export const decrimentCountNewWords = (countNewWords: number):ToggleCountNewWordsActionType => ({
    type: DECREMENT_COUNTNEWWORDS,
    value: countNewWords,
    payload: countNewWords
});

// Change count daily cards

const INCREMENT_COUNTDAILYCARDS = "INCREMENT_COUNTDAILYCARDS";
const DECREMENT_COUNTDAILYCARDS = "DECREMENT_COUNTDAILYCARDS";

export type InitialStateTypeCountMaxDailyCards = {
    countMaxDayCards: number
}

const initialStateCountMaxDailyCards: InitialStateTypeCountMaxDailyCards = {
    countMaxDayCards: 10
}

export const settingsReducerCountMaxDailyCards = (state = initialStateCountMaxDailyCards, action: any): InitialStateTypeCountMaxDailyCards => {
    switch (action.type) {
        case INCREMENT_COUNTDAILYCARDS:
            return {...state, countMaxDayCards: action.value + 1}
        case DECREMENT_COUNTDAILYCARDS:
            return {...state, countMaxDayCards: action.value - 1}

        default: return state;
    }
};

export type ToggleCountMaxDailyCardsActionType = {
    type: typeof INCREMENT_COUNTDAILYCARDS | typeof DECREMENT_COUNTDAILYCARDS,
    value: any,
    payload: any
}

export const incrementCountMaxDailyCards = (countMaxDayCards: number):ToggleCountMaxDailyCardsActionType => ({
    type: INCREMENT_COUNTDAILYCARDS,
    value: countMaxDayCards,
    payload: countMaxDayCards
});

export const decrimentCountMaxDailyCards = (countMaxDayCards: number):ToggleCountMaxDailyCardsActionType => ({
    type: DECREMENT_COUNTDAILYCARDS,
    value: countMaxDayCards,
    payload: countMaxDayCards
});