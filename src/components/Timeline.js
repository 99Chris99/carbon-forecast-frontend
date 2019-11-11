import React, { Component } from 'react';
import {XYPlot, LineSeries, MarkSeries, HorizontalGridLines, Hint, XAxis, YAxis, Borders, VerticalGridLines, HorizontalBarSeries, GradientDefs, AreaSeries, FlexibleXYPlot, LabelSeries} from 'react-vis';
import { Sticky, Header, Table, Dimmer, Loader, TableCell } from 'semantic-ui-react';
import { withScroll } from 'react-window-decorators';

// @withScroll
class Timeline extends Component {

    state = {
        rawData: [{y: 0, x: 0, label:'loading | loadidng'}],
        barPosition: {date: '', offset: 0},
        labelData: [{lable: 'Testing'}],
        height: 50,
        middle: typeof this.props.middle !== 'undefined' ? this.props.mediumLevel : 150,
        value: null,
       // scrollCount: 0,
        initalScrollCounter:0,
        dataIndex: -1,
        position: this.props.scrollPositionY,
        scrollPlots: [],
        getLevel:0,
        yOffset:0,
        currentLevel:{level:0, time:'loading', text:'loading'}
    }



    componentDidMount () {
     // this.getposition()
    //  this.manageScrollDisplay()

        if (typeof this.props.timelineVals[0] !== 'undefined'){
          return (
              this.formatData(),
              this.manageHeight()
              ) 
            }
        }

        
        
        componentDidUpdate (prevProps, prevState) {
            if (this.props.scrollPositionY !== prevProps.scrollPositionY) {
               return (this.getLevel() ) 
            }
            if (this.props.timelineVals !== prevProps.timelineVals)
            return (
                this.formatData(),
                this.manageHeight()
                ) 
            if (this.state.rawData !== prevState.rawData)
            {
               return (this.scrollPlots() )
            }

            }

//       //let chartTop = document.querySelector('.rv-xy-plot__grid-lines')
//       let chartTop = document.querySelector('.rv-xy-plot__grid-lines')
//       let chartTopPos = chartTop.getBoundingClientRect() 
//         console.log('clientHeight '+ chartTop.clientHeight )


calYOffset = () => {

    const stickyTop = document.querySelector('#sticky')
    let stickyTopVals = stickyTop.getBoundingClientRect()
    console.log(stickyTopVals)

    
    const girdPlotTop = document.querySelector('.rv-xy-plot__grid-lines')
    let girdPlotTopVals = girdPlotTop.getBoundingClientRect()
    console.log(girdPlotTopVals)    

    const girdPlotOuterTop = document.querySelector('.rv-xy-plot__inner')
    let girdPlotOuterTopVals = girdPlotOuterTop.getBoundingClientRect()
    console.log(girdPlotOuterTopVals)
    
    let valA = stickyTopVals.top
    let valB = girdPlotTopVals.top - girdPlotOuterTopVals.top
    let output = valA+valB-2 //109
    this.setState({yOffset: output})
    return output
}

    chartGap = () => {
        const chartTop = document.querySelector('.rv-xy-plot__grid-lines')
       // console.log('clientHeight '+ chartTop.clientHeight )
       let height = chartTop.getBoundingClientRect()
       console.log(height)
        let output = (height.height / this.state.rawData.length)
        console.log(output)
        return output
    
    }


    scrollPlots = () => {
        setTimeout(() => this.calYOffset(), 700)

        let gap =this.chartGap()
        console.log(gap)
        let scrollPlots =  this.props.timelineVals.map((point, index) => {    
        
        let data = {time:`${this.parseDate(point.from, 'time')} ${this.parseDate(point.from, 'date')}`,
        y: (gap * index)+(index/2), level: point.level, text: point.text}
            return data
        })
        this.setState({scrollPlots: scrollPlots})
    }
    // scrollPlots = () => {
    //     this.calYOffset()
    //     let gap =this.chartGap()
    //     console.log(gap)
    //    let scrollPlots =  this.state.rawData.map((point, index) => {    
        
    //     let data = {y: (gap * (index)), level: point.x}
    //         return data
    //     })
    //     this.setState({scrollPlots: scrollPlots})
    // }

    getLevel = () => {
        
        if (this.state.scrollPlots.length > 1) {

        let currY = this.props.scrollPositionY - this.state.yOffset 
        let newArray = this.state.scrollPlots.map(obj => {
            return obj.y
          })
           let closest = newArray.reduce((prev, curr) => {
           return (Math.abs(curr - currY) < Math.abs(prev - currY) ? curr : prev);
           })
          let found = this.state.scrollPlots.find(obj => {
            return obj.y === closest
          })
         return this.setState({
              currentLevel:{level: found.level, time:found.time, text:found.text}
          })
        }
          //return found.level 
        
        }


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

        lowCarbonLabel = (item) => {
            let output = ''
            if (item.text.split(' ')[0] === 'Low' || item.text.split(' ')[1] === 'Low' ) {
                output = 'This is a good time to use electricity!'
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
            let bar = {x: item.level-10, y: -index, label: `${this.lowCarbonLabel(item)}` , yOffset:-25}   
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

    _forgetValue = () => {
        this.setState({
          value: null
        });
      };
    
      _rememberValue = value => {
        this.setState({value});
      };
    



    // <i ref={(ref) => this.scrollIcon = ref} className="fa fa-2x fa-chevron-down"></i>


    render() {
        //const {value} = this.state
        let scroll = window.scrollY;
        // console.log(scrolledDown)
      
        
        return (



            <div
            style={{
                height: '800vh'
            }}
            >



                
<Dimmer active={this.props.loading}>
        <Loader>Loading</Loader>
    </Dimmer>



          <div id="sticky" height={2}> 
          Carbon Intensity Level <br></br>
            {/* Vertical scroll position is: { this.props.scrollPositionY - this.state.yOffset } <br></br> */}
            {/* Carbon Intensity: {this.state.currentLevel.level} */}
           
          <Table id="sticky-table" fixed unstackable singleLine celled>
          {/* <Table id="sticky-table" fixed unstackable singleLine celled> */}

            <Table.Body>
            <Table.Row textAlign='center'> 
            <Table.Cell>{this.state.currentLevel.time}</Table.Cell>
            <Table.Cell>{this.state.currentLevel.level}</Table.Cell>
            <Table.Cell> Share </Table.Cell>

            </Table.Row>

            <Table.Row textAlign='center'>
            <Table.Cell>⟵  Low</Table.Cell>
            <Table.Cell>Medium</Table.Cell>
            <Table.Cell>High  ⟶</Table.Cell>
            </Table.Row>
            </Table.Body>
          </Table>
          
          </div>
          <div id="stickyMeasure">
          </div>

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
      id="bg-fade"

      
    >



<div
        style={{width: '100%', height: '100%'}}
        // style={{width: '100%', height: '100%', border: '1px solid #ccc'}}
      >
        <FlexibleXYPlot  id="timeline-chart" margin={{bottom: 1000, left: 80, right: 20, top: 50}}> 
        {/* <FlexibleXYPlot  id="timeline-chart" margin={{bottom: 80, left: 80, right: 20, top: 50}}>  */}
        {/*50*/}
        {/* xType="time" 
         yType="ordinal"
        */}
        

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
        color={'black'}
        animation
        style={{
            fill: 'none',
            strokeLinejoin: 'round',
            strokeWidth: 8
        }}
        curve={'curveMonotoneX'}
        />

        {/* <MarkSeries
          onValueMouseOver={this._rememberValue}
          onValueMouseOut={this._forgetValue}
          data={this.state.rawData}
          id="markSeries"
        /> */}
        {/* {value ? <Hint value={value} /> : null} */}

        <LabelSeries
        data={this.state.rawData}
        // labelAnchorX={"end"}
        // labelAnchorY={"middle"}
        />
        <LabelSeries
        data={this.state.labelData}
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

export default withScroll (Timeline);
