import React from "react";
import {
  BrowserRouter, Switch, Route, HashRouter, Link,
} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import TeamPage from "../Pages/TeamPage/TeamPage";
import SignIn from "../Authorization/SignIn";
import SignUp from "../Authorization/SignUp";
import UserProfile from "../Authorization/UserProfile";

import AudioCall from "../Games/AudioCall/AudioCallDescription";
import Games from "../Games/Games";
// import {ThemeProvider} from "styled-components";
import SettingsPage from "../Pages/SettingsPage/SettingsPage";
import Dictionary from "../Pages/DictionaryPage/DictionaryPage";


const App = () => (
  <React.Fragment>
    <HashRouter>
    <Header />
      <Switch>
        <Route exact path="/">
          <Header />
          <Link className="link-navigation" to='/games'>games</Link>
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Route path="/dictionary">
          <Dictionary />
        </Route>
        <Route path="/team">
          <TeamPage />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>
      </Switch>
      <Footer />
    </HashRouter>
  </React.Fragment>

);

export default App;