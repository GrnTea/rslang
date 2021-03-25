import React from "react";
import ReactDOM from "react-dom";
import "./assets/stylesheets/index.scss";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/App/App";
// import {settingsReducerLang, settingsReducerAutoVoice} from "./redux/settings-reducer";
import reducer from "./redux/reducer";

let store = createStore(reducer);

console.log(store.getState());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById("root"),
);
