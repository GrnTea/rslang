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
import DictionaryPage from "../Pages/DictionaryPage/DictionaryPage";
import SignInForm from "../Authorisation/SignInForm";
import SignUpForm from "../Authorisation/SignUpForm";
import TextbookPage from "../Pages/TextbookPage/TextbookPage";
import appStyles from "./AppStyles";



const App = () => {
  const useStyles = appStyles();
  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <header>
              <Header/>
            </header>
            <main className={useStyles.content}>
              {/* <Link className="link-navigation" to='/games'>games</Link> */}
              {/* <TeamPage /> */}

              {/*<DictionaryPage/>*/}
              <TextbookPage/>

              {/* <SettingsPage /> */}
              {/*<SignInForm/>
            <SignUpForm/>*/}
            </main>

            <Footer/>
          </Route>
          {/* <Route path="/games">
            <Games />
          </Route> */}
        </Switch>
      </HashRouter>
    </React.Fragment>
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
};

export default App;