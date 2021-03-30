import React from "react";
import {
  BrowserRouter, Switch, Route, HashRouter, Link,
} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
// import TeamPage from "../Pages/TeamPage/TeamPage"

import AudioCall from "../Games/AudioCall/AudioCallDescription";
import Games from "../Games/Games";
// import {ThemeProvider} from "styled-components";
import SettingsPage from "../Pages/SettingsPage/SettingsPage";
<<<<<<< HEAD
import DictionaryPage from "../Pages/DictionaryPage/DictionaryPage";
=======
import SignInForm from "../Authorisation/SignInForm";
import SignUpForm from "../Authorisation/SignUpForm";
>>>>>>> 8fc5621061a7c0a117b5b65ff18b5015171f91b6

const App = () => (
  <React.Fragment>
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Header />
          {/* <Link className="link-navigation" to='/games'>games</Link> */}
          {/* <TeamPage /> */}
          <DictionaryPage />
          {/* <SettingsPage /> */}
          {/*<SignInForm/>
          <SignUpForm/>*/}
          <Footer />
        </Route>
        {/* <Route path="/games">
          <Games />
        </Route> */}
      </Switch>
    </HashRouter>
  </React.Fragment>

);

export default App;
