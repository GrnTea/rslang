import React from "react";
import ReactDOM from "react-dom";
import "./assets/stylesheets/index.scss";
// import { Provider } from "react-redux";
// import TeamPage from "./components/Pages/TeamPage/TeamPage"
import SettingsPage from "./components/Pages/SettingsPage/SettingsPage"

import App from "./components/App/App";
// import store from '@/store/index';

ReactDOM.render(
  // <TeamPage />,
  <SettingsPage />,
  // <App />,

  document.getElementById("root"),
);
