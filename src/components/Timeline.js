import React, { Component } from 'react';
import {XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, Borders, VerticalGridLines, HorizontalBarSeries, GradientDefs, AreaSeries, FlexibleXYPlot, LabelSeries} from 'react-vis';

export class Timeline extends Component {

    state = {
        rawData: [{y: 0, x: 0, label:'loading | loaidng'}],
        barPosition: {date: '', offset: 0},
        labelData: [{lable: 'Testing'}],
        height: 50,
        middle: typeof this.props.middle !== 'undefined' ? this.props.mediumLevel : 150
    }


    componentDidMount () {
        if (typeof this.props.timelineVals[0] !== 'undefined'){
          return (
              this.formatData(),
              this.manageHeight()
              ) 
            }
        }
        
        componentDidUpdate (prevPros, prevState) {
            if (this.state.rawData !== prevState.rawData)
           console.log('hi')
    }

    

    // mapTest = () => {
    //     let test = this.state.rawData.map(item => {
    //         return item.text.split('|')[0]})
    //         console.log(`HiHi${test}`)
    // }

    // getMiddle = () => {
    //     if (this.state.middle < 1) {
    //     let middle = this.props.timelineVals[this.props.timelineVals.length-1].level / 2 
    //     this.setState({middle: middle})
    //     }
    // }

    parseDate = (input, timeOrDate) => {
        let output = 0
        let optionsDate = { weekday: 'short', day: 'numeric', month: 'numeric' };
        let optionsTime = { hour: 'numeric',minute: 'numeric', hour12: true};
        let options24 = { hour: 'numeric',minute: 'numeric', hour12: false};

               let parsedDate = new Date(Date.UTC(
                   parseInt(input.slice(0, 4), 10),
                   parseInt(input.slice(5, 7), 10) - 1,
                   parseInt(input.slice(8, 10), 10),
                   parseInt(input.slice(11, 13), 10),
                   parseInt(input.slice(14, 16), 10),
                 //parseInt(input.slice(13,15), 10)
               ))
               if (timeOrDate === 'time'){
                   output =  parsedDate.toLocaleString("en-GB", optionsTime)
               }else if (timeOrDate === 'date') {
               output =  (`${parsedDate.toLocaleString("en-GB", optionsDate)}`)
               }else if (timeOrDate === '24') {
               output =  parsedDate.toLocaleString("en-GB", options24)
              }


            return output

            }

       formatData = () => {
        let data = []
        let labelData = []
        let dayLabels = []
        let middleVal = this.props.middle
        //let middle = this.props.timelineVals[this.props.timelineVals.length-1].level / 2 

        if (this.props.timelineVals !== [] ) {

        this.props.timelineVals.map((item, index) => {
            let bar = {x: item.level, y: -index, label: `${item.text.split(' ')[1] === 'low' ? 'Carbon Level is Low: good time to use electricity!' : 'HiHi'}` }   
            data = [...data, bar]
        })
        this.props.timelineVals.map((item, index) => {
            let barLabel = {x: 0, y: -index, label: `${this.parseDate(item.from, 'time')}`, xOffset:-60}  
            labelData = [...labelData, barLabel]
        })
        this.props.timelineVals.map((item, index) => {
            
           // let middle = this.props.screenWidth / 2
           // let middle = this.state.rawData[this.state.rawData-1].x / 2 
            //middle += 100
            let day = ''

            if (parseInt(`${this.parseDate(item.from, '24')}`) < 1 || index < 1 )
            {
                day = `${this.parseDate(item.from, 'date')}`
                console.log(day)   
            }
            let dayLabel = {x: this.state.middle, y: -index, 
                label: day,
                xOffset: this.props.mobileUser ? 0 : -30,
                 yOffset:-15}  
            dayLabels = [...dayLabels, dayLabel]
        })
    }
       
        //console.log(data)
        
        this.setState({
            rawData: data,
            labelData: labelData,
            dayLabels: dayLabels
        })    
    
    }
    //day.sort((a, b) => (a.level > b.level)
    manageHeight = () => {
       let newHeight =  this.props.timelineVals.length += 400
        this.setState({
            height: newHeight
        })
    }

    render() {
        return (
            <div>
                

                <div id="timeline">
<div
      style={{
       // display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width:  '100%',
        height: '800vh',
        //height: `${this.state.height}vh`,
        overflow: 'auto',
      }}
    
    >
<div
        style={{width: '100%', height: '100%', border: '1px solid #ccc'}}
      >
        <FlexibleXYPlot  id="timeline-chart" margin={{bottom: 80, left: 80, right: 20, top: 50}}>
        {/* xType="time" 
         yType="ordinal"
        */}
        <GradientDefs>
          <linearGradient id="CoolGradient" y1="0" y2="0" x1="0" x2="1">
            <stop offset="0%" stopColor="green" stopOpacity={0.4}/>
            <stop offset="50%" stopColor="yellow" stopOpacity={0.4}/>
            <stop offset="100%" stopColor="red" stopOpacity={0.4} />
          </linearGradient>
        </GradientDefs>

        <HorizontalGridLines 
        tickTotal={this.state.rawData.length}
        animation={true}
        />
     
        {/* <YAxis 
        position="start"
        tickTotal={2}
        // top={40}
        top={0}
        //height={150}
        //width={1}
        style={{
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800, fontSize: 10}
          }}
          //tickLabelAngle={-45}
          /> */}
        
        
        <LineSeries 
        data={this.state.rawData}
        color={'grey'}
        animation
        style={{
            fill: 'none',
            strokeLinejoin: 'round',
            strokeWidth: 4
        }}
        curve={'curveMonotoneX'}
        />

        <LabelSeries
        data={this.state.labelData}
        labelAnchorX={"start"}
        labelAnchorY={"middle"}
        />
        <LabelSeries
        data={this.state.rawData}
        labelAnchorX={"start"}
        labelAnchorY={"middle"}
        />

        <LabelSeries
        data={this.state.dayLabels}
        
        labelAnchorX={"end"}
        labelAnchorY={"middle"}
        />
        {/* <HorizontalBarSeries 
        data={this.state.rawData}
        color={'url(#CoolGradient)'}
        animation
        /> */}

         {/* <YAxis 
         position="start"
         tickValues={this.state.rawData.map(value => value.y)} 
         tickSize={1}
         />  */}

{/*
            //data={this.xlabelData('top')}
                //return { ...obj, y: this.props.mobileUser ? -3 : -18, rotation: this.props.mobileUser ? 90 : 0, label: `${obj.y.split('|')[0]}` }
            //animation
            // labelAnchorX={this.props.mobileUser ? "start" : "middle"}
            // //labelAnchorY="text-before-edge"
            // labelAnchorY={this.props.mobileUser ? "text-after-edge" : "baseline"}
            // labelAnchorX={"middle"}
            // labelAnchorY={"text-before-edge"}
            // style={{
            //     text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800, fontSize: 10}
            //   }}
        {/* 
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

                        return { ...obj, y: this.props.mobileUser ? -3 :-34, rotation: this.props.mobileUser ? 90 : 0, label: `${obj.y.split('|')[1]}` }
                    })}
                    animation
                    labelAnchorX={this.props.mobileUser ? "start" : "middle"}
                    //labelAnchorY="text-before-edge"
                    //labelAnchorY="baseline"
                    labelAnchorY={this.props.mobileUser ? "text-before-edge" : "baseline"}
                    style={{
                        text: {stroke: 'none', fill: '#6b6b76', fontWeight: 800, fontSize: 10}
                      }}
                    /> */}



        </FlexibleXYPlot>
      </div>

</div>
     

        </div>


            </div>
        );
    }
}

export default Timeline;
