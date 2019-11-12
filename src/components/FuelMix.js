import React, { Component } from 'react';
import {RadialChart, GradientDefs} from 'react-vis';
import { Segment } from 'semantic-ui-react';


export class FuelMix extends Component {

    state = {
        chartData:[{chartData:[{angle:1, label:'loading'}], data:'', level: 0, text:'Loading'}],
        count:0,
        arrayCheck:[]
    }

    componentDidMount () {
     //   this.formatData()
         //   this.allForecast()

        if (this.props.data.length > 0) {
            this.setState({chartData:this.props.data})
        }

    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.data !== prevProps.data) {
            this.setState({chartData:this.props.data})
        }
    }

    
    
   
    handleCount = () => {
       let newCount = this.state.count
        newCount += 1

        if (newCount < (this.state.chartData.length)){
        this.setState({
            count: newCount
        })}else{console.log('end of chart')}
    
    }



    render() {
        const myData = [
            {angle: 1, gradientLabel: 'grad1'},
        {angle: 2, gradientLabel: 'grad2'},
        {angle: 5, gradientLabel: 'grad3'}
          ]
        
        
        return (


        <div className="bgPanel">
            <h2>Wow its a lovely day, and as the Fuel Mix I love lovely days!</h2>


<Segment textAlign='center'>
          {/* <div style={{width:'100%', paddingLeft:'auto', paddingRight:'auto'}}> */}
          <div onClick={() => this.handleCount()} style={{display: 'inline-block'}}>
            <RadialChart

  margin={{left: 40, right: 40, top: 10, bottom: 10}}          
 data={this.state.chartData[this.state.count].chartData}
  //data={myData}
  width={this.props.mobileUser ? 180 : 340}
  height={this.props.mobileUser ? 180 : 340} 
  showLabels={true}
  animation={true}
  radius={130}
  colorType={'literal'}
      colorDomain={[0, 100]}
      colorRange={[0, 10]}
      getColor={d => `url(#${d.label})`}
  labelsRadiusMultiplier={1.3}
      labelsStyle={{position: 'relative', fontSize: this.props.mobileUser ? 10 : 16}}
      showLabels
      style={{stroke: '#fff', strokeWidth: 1}}
      labelsAboveChildren={true}
 >
<GradientDefs>
        <linearGradient id="biomass" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffb347" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#ffcc33" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="coal" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#232526" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#414345" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="imports" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#d66d75" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#e29587" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="gas" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#cb2d3e" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#ef473a" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="nuclear" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="blue" stopOpacity={0.9} />
          <stop offset="100%" stopColor="green" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="wind" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#396afc" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#2948ff" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="solar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#56ab2f" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#a8e063" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="hydro" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2193b0" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#6dd5ed" stopOpacity={0.9} />
        </linearGradient>

        <linearGradient id="other" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#B993D6" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#8CA6DB" stopOpacity={0.9} />
        </linearGradient>


      </GradientDefs>
      </RadialChart>  


 </div>
</Segment>

            </div>
        );
    }
}

export default FuelMix;
