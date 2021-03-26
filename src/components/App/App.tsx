import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import TeamPage from "../Pages/TeamPage/TeamPage"
import SignIn from "../Authorisation/SignIn";
import SignUp from "../Authorisation/SignUp";
// import {ThemeProvider} from "styled-components";

const App = () => (
  <React.Fragment>
    <Header />
      <TeamPage />
      <SignIn/>
      <SignUp/>
    <Footer />
  </React.Fragment>

);

export default App;
