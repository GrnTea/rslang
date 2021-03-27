import React from 'react';
import AudioCallDescription from './AudioCall/AudioCallDescription';
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
      </div>
      

      <Route path="/games/audiocall">
        <AudioCallDescription /> 
      </Route>
      <Route path="/games/sprint">
        <Sprint /> 
      </Route>
    </div>
    
  )
}