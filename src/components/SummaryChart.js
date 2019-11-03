import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, VerticalGridLines, VerticalBarSeries, GradientDefs, AreaSeries, FlexibleXYPlot, LabelSeries} from 'react-vis';
import { ItemMeta } from 'semantic-ui-react';

class SummaryChart extends Component {

    state = {
        rawData: [{x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0},
            {x: '0', y: 0}]
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
        console.log(data)
        this.setState({rawData: data})    
    }
    }

    handleWidth = () => {
      let  width = '100%'
        if (this.props.aggedVals.length > 8) {
            width = '250%'
        }
    return width
    }

  render() {
    // const data = [
    //   {x: 0, y: 8},
    //   {x: 1, y: 5},
    //   {x: 2, y: 4},
    //   {x: 3, y: 9},
    //   {x: 4, y: 1},
    //   {x: 5, y: 7},
    //   {x: 6, y: 6},
    //   {x: 7, y: 3},
    //   {x: 8, y: 2},
    //   {x: 9, y: 0}
    // ];
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
        style={{width: '99%', height: '100%', border: '1px solid #ccc'}}
      >
        <FlexibleXYPlot  xType="ordinal">
        <GradientDefs>
          <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="red" stopOpacity={0.4}/>
            <stop offset="50%" stopColor="yellow" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="green" stopOpacity={0.4} />
          </linearGradient>
        </GradientDefs>

        <VerticalGridLines />
        <HorizontalGridLines />
     
        {/* <XAxis 
        position="start"
        // top={40}
        top={30}
        //height={150}
        //width={1}
        style={{
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800, fontSize: 10}
          }}
          //tickLabelAngle={-45}
          tickTotal={2}
          /> */}
        
        {/* <YAxis /> */}
        
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
                    data={this.state.rawData.map(obj => {
                        return { ...obj, y: -12, label: `${obj.x.split('|')[0]}` }
                    })}
                    animation
                    labelAnchorX="middle"
                    //labelAnchorY="text-before-edge"
                    labelAnchorY="baseline"
                    style={{
                        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800, fontSize: 10}
                      }}
                    />
        <LabelSeries
                    data={this.state.rawData.map(obj => {
                        return { ...obj, y: -28, label: `${obj.x.split('|')[1]}` }
                    })}
                    animation
                    labelAnchorX="middle"
                    //labelAnchorY="text-before-edge"
                    labelAnchorY="baseline"
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
