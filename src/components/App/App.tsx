import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import SignIn from "../Authorisation/SignIn";
import SignUp from "../Authorisation/SignUp";
// import {ThemeProvider} from "styled-components";



const App = () => (
  <React.Fragment>
    <Header />
      <SignIn/>
      <SignUp/>


    <div>Hello World!</div>
    <Footer />
  </React.Fragment>

);

export default App;
