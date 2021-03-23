import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import SignIn from "../Authorisation";
// import {ThemeProvider} from "styled-components";



const App = () => (
  <React.Fragment>
    <Header />
      <SignIn/>


    <div>Hello World!</div>
    <Footer />
  </React.Fragment>

);

export default App;
