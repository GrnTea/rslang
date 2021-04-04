interface IinitialGameState {
  currentGame: string,
  gameFrom: string
}
const initialGameState:IinitialGameState = {
  currentGame: "",
  gameFrom: "",
};
const GAME_SET_TEXTBOOK = "GAME_SET_TEXTBOOK";

const gameReduser = (state = initialGameState, action: any) => {
  switch (action.type) {
    case GAME_SET_TEXTBOOK:
      return ({ ...state, gameFrom: "TEXTBOOK" });
    default:
      return state;
  }
};

export default gameReduser;
