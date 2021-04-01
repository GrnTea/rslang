import React from "react";
import {
  BrowserRouter, Switch, Route, HashRouter, Link,
} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import TeamPage from "../Pages/TeamPage/TeamPage";

import AudioCall from "../Games/AudioCall/AudioCallDescription";
import Games from "../Games/Games";
// import {ThemeProvider} from "styled-components";
import SettingsPage from "../Pages/SettingsPage/SettingsPage";
import DictionaryPage from "../Pages/DictionaryPage/DictionaryPage";
import SignInForm from "../Authorisation/SignInForm";
import SignUpForm from "../Authorisation/SignUpForm";

const App = () => (
  <React.Fragment>
    <HashRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          {/*<SignInForm/>
          <SignUpForm/>*/}
          main page
        </Route>
        <Route path="/dictionary">
          <DictionaryPage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/team">
          <TeamPage /> 
        </Route>
      </Switch>
      <Footer />
    </HashRouter>
  </React.Fragment>

);

export default App;
