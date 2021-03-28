import React from "react";
import Footer from "../Footer";
import Header from "../Header";
// import TeamPage from "../Pages/TeamPage/TeamPage"
import SignIn from "../Authorisation/SignIn";
import SignUp from "../Authorisation/SignUp";

import AudioCall from '../Games/AudioCall/AudioCallDescription';
import Games from '../Games/Games';
import { BrowserRouter, Switch, Route, HashRouter, Link } from 'react-router-dom';
// import {ThemeProvider} from "styled-components";
import SettingsPage from "../Pages/SettingsPage/SettingsPage";

const App = () => (
  <React.Fragment>
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          <Link className="link-navigation" to='/games'>games</Link>
          {/* <TeamPage /> */}
          <SettingsPage />
          <SignIn/>
          <SignUp/>
          <Footer />
        </Route>
        <Route path="/games">
          <Games /> 
        </Route>
      </Switch>
    </HashRouter>
  </React.Fragment>

);

export default App;
