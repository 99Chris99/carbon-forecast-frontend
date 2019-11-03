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
        if (this.props.aggedVals !== prevProps.aggedVals) {
            this.formatData()
        }
    }


    formatData = () => {
        let data = []
        
        if (this.props.aggedVals !== [] ) {
        this.props.aggedVals.map(item => {
            let bar = {x: `${item.from}`, y:item.level} 
            return data = [...data, bar]
        })
        console.log(data)
        this.setState({rawData: data})    
    
    }
    }

    scaleData = () => {
       


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
        width:  '150%',
        height: '30vh',
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
        <XAxis />
        <YAxis />
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
        </FlexibleXYPlot>
      </div>

</div>
     

        </div>
    );
  }
}

export default SummaryChart;
