import React from 'react';
import AudioCallDescription from './AudioCall/AudioCallDescription';
import SavannahDescription from './Savannah/SavannahDescription';
import Sprint from './Sprint/Sprint';
import './games.css';
import { BrowserRouter, Switch, Route, HashRouter, Link } from 'react-router-dom';

export default function Games() {
  
  return (
    <div className="games">
      <h2>games</h2>

      <div className="routes">
        <Link className="links" to="/games/audiocall">audiocall</Link>
        <Link className="links" to="/games/sprint">sprint</Link>
        <Link className="links" to="/games/savannah">savannah</Link>
      </div>
      

      <Route path="/games/audiocall">
        <AudioCallDescription /> 
      </Route>
      <Route path="/games/sprint">
        <Sprint /> 
      </Route>
      <Route path="/games/savannah">
        <SavannahDescription /> 
      </Route>
    </div>
    
  )
}