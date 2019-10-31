import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Start from './components/Start';

import Forecast from './components/Forecast';
import About from './components/About';
import Advice from './components/Advice';


export class App extends Component {
  render() {
    return (


<Router>


<div>
      <nav>
        <ul>
          <li>
            <Link to="/start">Start</Link>
          </li>
          <li>
            <Link to="/forecast">Forecast</Link>
          </li>
        </ul>
      </nav>




<Switch>


    <Route exact path="/">
          <Start />
    </Route>
    <Route path="/start">
          <Start />
    </Route>
    <Route path="/forecast">
          <Forecast />
    </Route>

</Switch>
      
</div>

</Router>

    );
  }
}

export default App;








