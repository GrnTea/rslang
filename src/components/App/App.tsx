import React from "react";
import {
  BrowserRouter, Switch, Route, HashRouter, Link, Redirect,
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
import SignInForm from "../Authorisation/SignInForm";
import SignUpForm from "../Authorisation/SignUpForm";
import TextbookPage from "../Pages/TextbookPage/TextbookPage";
import appStyles from "./AppStyles";
import DictionaryPage from "../Pages/DictionaryPage/DictionaryPage";
import SectionComponent from "../SectionComponent/SectionComponent";
import MainPage from "../MainPage";



/*const App = () => {
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
              {/!* <Link className="link-navigation" to='/games'>games</Link> *!/}
              {/!* <TeamPage /> *!/}

              {/!*<DictionaryPage/>*!/}
              <TextbookPage/>

              {/!* <SettingsPage /> *!/}
              {/!*<SignInForm/>
            <SignUpForm/>*!/}
            </main>

            <Footer/>
          </Route>
          {/!* <Route path="/games">
            <Games />
          </Route> *!/}
        </Switch>
      </HashRouter>
    </React.Fragment>*/

const App = () => {
  const useStyles = appStyles();
  return (

  <React.Fragment>

    <HashRouter>
    <Header />
      <main className={useStyles.mainContent}>
        <Switch>
          <Route exact path="/">
            <MainPage />
            {/*<Link className="link-navigation" to='/games'>games</Link>*/}
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
          <Route path="/section/:sectionId/:pageId" render={props => <TextbookPage {...props.match.params}/>} />
          <Route path="/section/:sectionId" render={props => <SectionComponent {...props.match.params}/>} />
          <Route path="/dictionary">
            <DictionaryPage />
          </Route>
          <Route path="/team">
            <TeamPage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>

        </Switch>
      </main>

      <Footer />

    </HashRouter>

  </React.Fragment>

  );
};

export default App;


{/*// render={props =>*/}
{/*// <SectionComponent {...props.match.params}/>*/}
//   {/*<Switch>
{/*<Route path={`${path}/:pageId`} component={TextbookPage} />*/}
// </Switch>*!/}
// </SectionComponent>*/
// {/*<Route path="/:pageId"><TextbookPage/>}<Route/>*/}

{/*<Route path="/section/:sectionId/:pageId" render={props => <TextbookPage {...props.match.params}/>} />*/}
/**/