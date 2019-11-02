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
import { ItemMeta } from 'semantic-ui-react';
import { cloneWithoutLoc } from '@babel/types';

import { Container } from 'semantic-ui-react'


export class App extends Component {
  
  
  state = {
    setRegion: 18,
    setPostCode: '',
    useId: true,
    setPeriod: 12,
    regionIndex: [],
    currentLevel: {region: '', text: '', value: 0},
    forecastA: {},
    forecastB: {},
    forecastC: {},
    aggedVals: [],
    bestPeriods: []
  }
  
  
//2017-08-25T12:35Z
//[{id: 0, name: 'test'}]

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
    else if (this.state.forecastC !== prevState.forecastC)
    {
      return this.aggForecast(this.allForecast(), 4)
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
                name: item.shortname}],
                }
          )
          if (item.regionid === this.state.setRegion){
            this.setState({
              currentLevel: {region: item.regionid, text: item.intensity.index, value: item.intensity.forecast}
            })
          }
       }
      )
    ).then(datainfo => console.log(datainfo))
}
  

allForecast = () => {
  const allForecast = [...this.state.forecastA, ...this.state.forecastB, ...this.state.forecastC]
  return allForecast
}

calTextLevel = (value) => {
  if (value > 360) {
      return 'Very High'
  } 
  else if (value >= 260 && value <= 359 ) {
      return 'High'
  }
  else if (value >= 160 && value <= 259 ) {
      return 'Moderate'
  } 
  else if (value >= 60 && value <= 159 ) {
    return 'Low'
  }
  else if (value >= 59 && value <= 0 ) {
    return 'Very Low'
  }else 
  {
    return 'Level not known'
  }
}

aggForecast = (forecastArray, granularity) => {
 
  // const period = 8
  // const periodUnits = 'h'
  // const granularity = 4
  // const forecastArray =[2,3,6,1,5,1,1,1,1,1,1,10]

let agged = []

for (let index = 0; index < forecastArray.length; index+=granularity) {
 
  if (index%granularity === 0) {
  const half = forecastArray[index];
  let set = forecastArray.slice(index, index+granularity).map(item => item.intensity.forecast)
      console.log(set)
  let sum = set.reduce((acc, cur) => acc + cur)
      console.log(sum)
      let avg = sum / set.length
  agged = [...agged, {from:half.from, level:Math.round(avg), text:this.calTextLevel(avg)}]
}
}
let best = this.bestPeriods(agged)

this.setState({
  aggedVals: agged,
  bestPeriods: best
})
console.log(agged)
return agged
}




bestPeriods = (objArray) => {

return objArray.sort((a, b) => (a.level > b.level) ? 1 : -1).slice(0,3)

}

updateRegion = (newRegion) => {
this.setState({setRegion: newRegion})
}
updatePeriod = (newPeriod) => {
this.setState({setPeriod: newPeriod})
}



  render() {
    return (


<Router>


<div>
     
<Nav/>

<Container>

<Switch>

    <Route exact path="/">
          <Start intensityData={this.state.currentLevel}/>
    </Route>
    <Route path="/start" >
          <Start intensityData={this.state.currentLevel}/>
    </Route>
    <Route path="/forecast">
          <Forecast regionIndex={this.state.regionIndex} setRegion={this.state.setRegion} setPeriod={this.state.setPeriod}
                    updateRegion={this.updateRegion} updatePeriod={this.updatePeriod}
          />
    </Route>
    <Route path="/advice">
          <Advice />
    </Route>
    <Route path="/about">
          <About />
    </Route>

</Switch>
      
</Container>
</div>

</Router>

    );
  }
}

export default App;








