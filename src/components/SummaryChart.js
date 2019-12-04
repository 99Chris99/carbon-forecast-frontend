import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/react-vis/dist/style.css';
import { VerticalBarSeries, GradientDefs, FlexibleXYPlot, LabelSeries} from 'react-vis';


class SummaryChart extends Component {

    state = {
        rawData: [{x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0},
            {x: 'A', y: 0}],
        barPosition: {date: '', offset: 0}
    }


    componentDidMount () {
        this.formatData()
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.aggedVals !== prevProps.aggedVals || this.props.sortTrigger !== prevProps.sortTrigger) {
            this.formatData()
        }
    }

    parseDate = (input) => {
        let optionsDate = { weekday: 'short', day: 'numeric', month: 'numeric' };
        let optionsTime = { hour: 'numeric',minute: 'numeric', hour12: true};
               let parsedDate = new Date(Date.UTC(
                   parseInt(input.slice(0, 4), 10),
                   parseInt(input.slice(5, 7), 10) - 1,
                   parseInt(input.slice(8, 10), 10),
                   parseInt(input.slice(11, 13), 10),
                   parseInt(input.slice(14, 16), 10),
                 //parseInt(input.slice(13,15), 10)
               ))
               return (`${parsedDate.toLocaleString("en-GB", optionsTime)}|${parsedDate.toLocaleString("en-GB", optionsDate)}`)
       }

    formatData = () => {
        let data = []
        
        if (this.props.aggedVals !== [] ) {
        this.props.aggedVals.map(item => {
            let bar = {x: `${this.parseDate(item.from)}`, y:item.level} 
            return data = [...data, bar]
        })
       // console.log(data)
        this.setState({rawData: data})    
    }
    }

    handleWidth = () => {
      let  width = '100%'
        if (this.props.aggedVals.length > 8 && this.props.aggedVals.length < 20) {
            width = '250%'
        }else if (this.props.aggedVals.length >= 20 && this.props.aggedVals.length < 30) {
            width = '350%'
        }else if (this.props.aggedVals.length >= 30) {
            width = '500%'
        }
    return width
    }


  render() {
 
    return (
      <div id="summary-chart">
<div
      style={{
       // display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width:  this.handleWidth(),
        height: '50vh',
        overflow: 'auto',
      }}
    
    >
<div
        style={{width: '99%', height: '100%'}}
      >
        <FlexibleXYPlot  xType="ordinal" margin={{bottom: 80, left: 0, right: 0, top: 20}}>
        
        <GradientDefs>
          <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="red" stopOpacity={0.4}/>
            <stop offset="50%" stopColor="yellow" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="green" stopOpacity={0.4} />
         
       
         
         
          </linearGradient>
        </GradientDefs>

      
   
        
        <VerticalBarSeries 
        data={this.state.rawData}
        color={'url(#CoolGradient)'}
        animation
        />
        <LabelSeries
                    data={this.state.rawData.map(obj => {
                        return { ...obj, label: obj.y.toString() }
                    })}
                    
                    animation
                    labelAnchorX="middle"
                    labelAnchorY="text-before-edge"
                    
                    />



        <LabelSeries
        
                    //data={this.xlabelData('top')}
                    data={this.state.rawData.map(obj => {
                        
                        return { ...obj, y: this.props.mobileUser ? -3 : -18, rotation: this.props.mobileUser ? 90 : 0, label: `${obj.x.split('|')[0]}` }
                    })}
                    animation
                    labelAnchorX={this.props.mobileUser ? "start" : "middle"}
                    //labelAnchorY="text-before-edge"
                    labelAnchorY={this.props.mobileUser ? "text-after-edge" : "baseline"}
                    style={{
                        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800, fontSize: 10}
                      }}
                    />
        <LabelSeries
                    data={this.state.rawData.map(obj => {

                        return { ...obj, y: this.props.mobileUser ? -3 :-34, rotation: this.props.mobileUser ? 90 : 0, label: `${obj.x.split('|')[1]}` }
                    })}
                    animation
                    labelAnchorX={this.props.mobileUser ? "start" : "middle"}
                    //labelAnchorY="text-before-edge"
                    //labelAnchorY="baseline"
                    labelAnchorY={this.props.mobileUser ? "text-before-edge" : "baseline"}
                    style={{
                        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800, fontSize: 10}
                      }}
                    />



        </FlexibleXYPlot>
      </div>

</div>
     

        </div>
    );
  }
}

export default SummaryChart;
