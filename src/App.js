import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import API from './adapters/API'
import Nav from './components/Nav';
import Start from './components/Start';
import Forecast from './components/Forecast';
import About from './components/About';
import Advice from './components/Advice';


export class App extends Component {
  
  
  state = {
    setRegion: 18,
    setPostCode: '',
    useId: true,
    regionIndex: [{id: 0, name: 'test'}],
    forecastA: {},
    forecastB: {},
    forecastC: {}
  }
  
  
//2017-08-25T12:35Z


now = () => {
  let date = new Date();
  return date.toISOString()
}

plus30Mins = (dateTime) => {
  let newTime = dateTime.split(/\D+/);
  let output =  new Date(Date.UTC(newTime[0], newTime[1]-1, newTime[2], newTime[3], newTime[4], newTime[5]));
  output.setMinutes(output.getMinutes() + 30)
  let newdateTime = output.toISOString()
  return newdateTime
}




  componentDidMount () {
    this.get48hForecast(this.now())
    this.compileRegionIndex()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.forecastA !== prevState.forecastA)
    {
      return this.getForecastB(this.state.setRegion)
    }
    else if (this.state.forecastB !== prevState.forecastB)
    {
      return this.getForecastC(this.state.setRegion)
    }
  }
  
get48hForecast = (start) => {
  if (this.state.useId){
    API.getRegionId48HrsData(this.state.setRegion, start).then(info => this.setState({forecastA: info.data.data}))
  }else {
    API.getRegionPostCode48HrsData(this.state.setPostCode, start).then(info => this.setState({forecastA: info.data.data}, {setRegion: info.data.regionid}))
  }
}
getForecastB = () => {
  const start = this.state.forecastA[this.state.forecastA.length - 1].to
  const startPlus30 = this.plus30Mins(start)
  console.log(startPlus30)
  if (this.state.useId) {
    API.getRegionId48HrsData(this.state.setRegion, startPlus30).then(info => this.setState({forecastB: info.data.data}))
}else{
    API.getRegionPostCode48HrsData(this.state.setPostCode, startPlus30).then(info => this.setState({forecastB: info.data.data}))
  } 
}
getForecastC = () => {
  const start = this.state.forecastB[this.state.forecastB.length - 1].to
  const startPlus30 = this.plus30Mins(start)
  if (this.state.useId) {
    API.getRegionId48HrsData(this.state.setRegion, startPlus30).then(info => this.setState({forecastC: info.data.data}))
}else{
    API.getRegionPostCode48HrsData(this.state.setPostCode, startPlus30).then(info => this.setState({forecastC: info.data.data}))
  } 
}





  compileRegionIndex = () => {
    API.getCurrentRegionalData().then(info => info.data[0].regions.map(item => {
          this.setState({
              regionIndex: 
                [...this.state.regionIndex,
                {id: item.regionid,
                name: item.shortname}]
                }
          )
       }
      )
    )
}
  
  
  render() {
    return (


<Router>


<div>
     
<Nav />

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
    <Route path="/advice">
          <Advice />
    </Route>
    <Route path="/about">
          <About />
    </Route>

</Switch>
      
</div>

</Router>

    );
  }
}

export default App;








