export function toggleLang(lang) {
    return {
        type: "TOGGLE_LANGUAGE",
        value: lang.target.value,
        payload: lang
    }
}