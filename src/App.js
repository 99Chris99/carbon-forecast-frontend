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
import Timeline from './components/Timeline';
import Hero from './components/Hero';
import About from './components/About';
import Advice from './components/Advice';
import { ItemMeta, Header } from 'semantic-ui-react';
import { cloneWithoutLoc } from '@babel/types';

import { Container } from 'semantic-ui-react'


export class App extends Component {
  
  
  state = {
    mobileUser: false,
    screenWidth:  400,
    setRegion: 18,
    setPostCode: '',
    useId: true,
    setPeriod: 12,
    setGran: 2,
    mediumVal: 150,
    middle: 150,
    emissions: 0,
    regionIndex: [],
    currentLevel: {region: '', text: '', value: 0},
    forecastA: {},
    forecastB: {},
    forecastC: {},
    aggedVals: [],
    bestPeriods: {},
    timelineVals: [],
    loading:true
  }
  
  
//2017-08-25T12:35Z
//[{id: 0, name: 'test'}]

now = () => {
  let date = new Date();
  return date.toISOString()
}

viewport = () => {
let e = window
let a = 'inner';
if ( !( 'innerWidth' in window ) )
{
a = 'client';
e = document.documentElement || document.body;
}
let dimentions = { width : e[ a+'Width' ] , height : e[ a+'Height' ] }

this.setState({
  screenWidth: dimentions.width
})
if (dimentions.width < 600) {
  this.setState({mobileUser: true,
  })
}
}

calMediumLevel = () => {

  let set = this.state.timelineVals.map(item => item.level)
  let sum = set.reduce((acc, cur) => acc + cur)
  //console.log(sum)
  let avg = sum / set.length
  
  this.setState({
  mediumVal: Math.round(avg)
  })
}

calMiddle = () => {
  let set = this.state.timelineVals.map(item => item.level)
  let big = set.reduce((acc, cur) => {
    if (cur > acc){  
    acc = cur}
  })
  //console.log(sum)
  let avg = big / 2
  this.setState({
  middle: Math.round(avg)
  })
}


plus30Mins = (dateTime) => {
  let newTime = dateTime.split(/\D+/);
  let output =  new Date(Date.UTC(newTime[0], newTime[1]-1, newTime[2], newTime[3], newTime[4], newTime[5]));
  output.setMinutes(output.getMinutes() + 30)
  let newdateTime = output.toISOString()
  return newdateTime
}

loading = () => {
  if (typeof this.state.forecastC[0] === 'undefined') {
    console.log('loading check')
    this.setState({loading:true})
  }else {this.setState({loading:false})}
}

  componentDidMount () {
    this.loading()
    this.viewport()
    this.get48hForecast(this.now(),true)
    this.compileRegionIndex()
    {setInterval(() => {this.countEmmissions()},500)}
    
  }


  

  componentDidUpdate (prevProps, prevState) {
    if (this.state.setRegion !== prevState.setRegion){
      this.get48hForecast(this.now(),true)
      this.compileRegionIndex()
    }
    else if (this.state.setPostCode !== prevState.setPostCode){
      this.get48hForecast(this.now(),false)
    }
    else if (this.state.forecastA !== prevState.forecastA)
    {
      return this.getForecastB(this.state.setRegion)
    }
    else if (this.state.forecastB !== prevState.forecastB)
    {
      return this.getForecastC(this.state.setRegion)
    }
    else if (this.state.forecastC !== prevState.forecastC)
    {
      return (
        this.aggForecast(this.allForecast(), this.determinGran(), false),
        this.aggForecast(this.allForecast(), 2, true),
        this.loading()
        )
    }
    else if (this.state.setPeriod !== prevState.setPeriod)
    {
      return (
      this.aggForecast(this.allForecast(), this.determinGran()))
    }
    else if (this.state.timelineVals !== prevState.timelineVals) {
      return (
        this.calMediumLevel(),
        this.calMiddle()
      )
    }
  }

  countEmmissions = () => {
    let count = this.state.emissions += 0.0142
    this.setState({emissions: count})
  }
  
get48hForecast = (start, useID) => {
  if (this.state.useId && useID){
    this.setState({loading:true})
    API.getRegionId48HrsData(this.state.setRegion, start).then(info => this.setState({forecastA: info.data.data}))
  }else {
    // API.getRegionPostCode48HrsData(this.state.setPostCode, start).then(info => this.setState({forecastA: info.data.data}, {setRegion: info.data.regionid}))
    this.setState({loading:true})
    API.getRegionPostCode48HrsData(this.state.setPostCode, start).then(info => this.setState({forecastA: info.data.data}))
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
    API.getRegionId48HrsData(this.state.setRegion, startPlus30).then(info => this.setState({forecastC: info.data.data, loding:false}))
}else{
    API.getRegionPostCode48HrsData(this.state.setPostCode, startPlus30).then(info => this.setState({forecastC: info.data.data, loading:false}))
  } 
}



  compileRegionIndex = () => {
  
    this.setState({regionIndex: []})
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
  else if (value <= 59 && value >= 0 ) {
    return 'Very Low'
  }else 
  {
    return 'Level not known'
  }
}

determinGran = () => {
 let newGrand = 2
  if (this.state.setPeriod <= 8) {
    newGrand = 2
  }else if (this.state.setPeriod > 8 && this.state.setPeriod <= 12) {
    newGrand = 2
  }else if (this.state.setPeriod > 12 && this.state.setPeriod <= 24) {
    newGrand = 2
  }else if (this.state.setPeriod > 24 && this.state.setPeriod <= 48) {
    newGrand = 2
  }else if (this.state.setPeriod > 48 && this.state.setPeriod <= 96) {
    newGrand = 4
  }else if (this.state.setPeriod > 200) {
    newGrand = 6
  }
  this.setState({setGran: newGrand})
  return newGrand
}

aggForecast = (inputArray, granularity, timeline) => {
 
  // const period = 8
  // const periodUnits = 'h'
  // const granularity = 4
  // const forecastArray =[2,3,6,1,5,1,1,1,1,1,1,10]

  let forecastArray = []

  if (timeline) {
  forecastArray = [...inputArray]
  }else{
  forecastArray = inputArray.slice(0, this.state.setPeriod)
  }


let agged = []

for (let index = 0; index < forecastArray.length; index+=granularity) {
 
  if (index%granularity === 0) {
  const half = forecastArray[index];
  let set = forecastArray.slice(index, index+granularity).map(item => item.intensity.forecast)
      //console.log(set)
  let sum = set.reduce((acc, cur) => acc + cur)
      //console.log(sum)
      let avg = sum / set.length
  agged = [...agged, {from:half.from, level:Math.round(avg), text:this.calTextLevel(avg)}]
}
}

//let newAgged = agged.slice(0, this.state.setPeriod)


if (timeline){
  this.setState({
    timelineVals: agged,
  })
}else {
  
let best = this.bestPeriods(agged)

this.setState({
  aggedVals: agged,
  bestPeriods: best
})
}
//console.log(agged)
//return agged
}




bestPeriods = (objArray) => {

let day = objArray.map(item => {
  if (parseInt(item.from.split('T')[1]) >= 6 && parseInt(item.from.split('T')[1]) <= 23){
    return item
  } 
})

let night = objArray.map(item => {
  if (parseInt(item.from.split('T')[1]) < 6 || parseInt(item.from.split('T')[1]) === 24){
    return item
  } 
})

let bestDay = day.sort((a, b) => (a.level > b.level) ? 1 : -1).slice(0,3)
let bestNight = night.sort((a, b) => (a.level > b.level) ? 1 : -1).slice(0,3)

return {day:bestDay, night:bestNight}

}

updateRegion = (newRegion) => {
this.setState({setRegion: newRegion})
}

updatePostCode = (newPostCode => {
  this.setState({setPostCode: newPostCode})
})
updatePeriod = (newPeriod) => {
this.setState({setPeriod: newPeriod})
}



  render() {
    return (


<Router>
<div>

<Hero mobileUser={this.state.mobileUser}/>

<Nav/>

<Container className="parentContainer" >


<Switch>

    <Route exact path="/">
          <Start intensityData={this.state.currentLevel} emissions={this.state.emissions.toFixed(4)}/>
    </Route>
    <Route path="/start" >
          <Start intensityData={this.state.currentLevel} emissions={this.state.emissions.toFixed(4)}/>
    </Route>
    <Route path="/forecast-summary">
          <Forecast regionIndex={this.state.regionIndex} setRegion={this.state.setRegion} updatePostCode={this.updatePostCode} setPeriod={this.state.setPeriod}
                    updateRegion={this.updateRegion} updatePeriod={this.updatePeriod} aggedVals={this.state.aggedVals}
                    mobileUser={this.state.mobileUser} bestPeriods={this.state.bestPeriods} loading={this.state.loading}
          />
    </Route>
    <Route path="/forecast-timeline">
          <Timeline loading={this.state.loading} timelineVals={this.state.timelineVals} screenWidth={this.state.screenWidth} middleLevel={this.state.middle} mobileUser={this.state.mobileUser}/>
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








