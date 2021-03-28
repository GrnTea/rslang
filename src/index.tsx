import React from "react";
import ReactDOM from "react-dom";
import "./assets/stylesheets/index.scss";
<<<<<<< HEAD
import { Provider } from "react-redux";
import { createStore } from "redux";
=======
// import { Provider } from "react-redux";

>>>>>>> 415d4e6b7fd891a31b0b742c425000e5c476aeac
import App from "./components/App/App";
// import {settingsReducerLang, settingsReducerAutoVoice} from "./redux/settings-reducer";
import reducer from "./redux/reducer";

let store = createStore(reducer);

console.log(store.getState());
ReactDOM.render(
<<<<<<< HEAD
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
=======
  <App />,
>>>>>>> 415d4e6b7fd891a31b0b742c425000e5c476aeac

  document.getElementById("root"),
);
