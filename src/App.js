import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Forecast from './components/Forecast';
import About from './components/About';
import Advice from './components/Advice';


export class App extends Component {
  render() {
    return (
      <div>
        <Home/>
      </div>
    );
  }
}

export default App;








