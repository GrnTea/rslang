import React from "react";
import {
  BrowserRouter, Switch, Route, HashRouter, Link,
} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
// import TeamPage from "../Pages/TeamPage/TeamPage"
import SignIn from "../Authorization/SignIn";
import SignUp from "../Authorization/SignUp";
import UserProfile from "../Authorization/UserProfile";
import Stat from "../Statistics";

import AudioCall from "../Games/AudioCall/AudioCallDescription";
import Games from "../Games/Games";
// import {ThemeProvider} from "styled-components";
import SettingsPage from "../Pages/SettingsPage/SettingsPage";


const App = () => (
  <React.Fragment>
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Link className="link-navigation" to='/games'>games</Link>
          <SettingsPage />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/signin">
          <Header />
          <SignIn />
        </Route>
        <Route path="/signup">
          <Header />
          <SignUp />
        </Route>
        <Route path="/profile">
          <Header />
          <UserProfile />
        </Route>
        <Route path="/stat">
          <Header />
          <Stat />
        </Route>
      </Switch>
      <Footer />
    </HashRouter>
  </React.Fragment>

);

export default App;
