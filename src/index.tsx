import React from "react";
import ReactDOM from "react-dom";
import "./assets/stylesheets/index.scss";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./components/App/App";
import reducer from "./redux/reducer";

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,

  document.getElementById("root"),
);
