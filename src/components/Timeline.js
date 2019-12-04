import React, { Component } from 'react';
import {LineSeries, HorizontalGridLines,  FlexibleXYPlot, LabelSeries} from 'react-vis';
import { Table, Dimmer, Loader, } from 'semantic-ui-react';
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



calYOffset = () => {
    const stickyTop = document.querySelector('#sticky')
    let stickyTopVals = stickyTop.getBoundingClientRect()
    // console.log(stickyTopVals)

    
    const girdPlotTop = document.querySelector('.rv-xy-plot__grid-lines')
    let girdPlotTopVals = girdPlotTop.getBoundingClientRect()
    // console.log(girdPlotTopVals)    

    const girdPlotOuterTop = document.querySelector('.rv-xy-plot__inner')
    let girdPlotOuterTopVals = girdPlotOuterTop.getBoundingClientRect()
    // console.log(girdPlotOuterTopVals)
    
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
    //    console.log(height)
        let output = (height.height / this.state.rawData.length)
        // console.log(output)
        return output
    }
    


    scrollPlots = () => {
        setTimeout(() => this.calYOffset(), 300)
        
        setTimeout(() => {
            let gap =this.chartGap()
        // console.log(gap)
        let scrollPlots =  this.props.timelineVals.map((point, index) => {    
        
        let data = {time:`${this.parseDate(point.from, 'time')} ${this.parseDate(point.from, 'date')}`,
        y: (gap * index)+(index/2), level: point.level, text: point.text}
            return data
        })
        this.setState({scrollPlots: scrollPlots})
    },400)
    }
   

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
            // console.log(item.text)
            //if (item.text.split(' ')[0] === 'Low' || item.text.split(' ')[1] === 'Low' ) {
            if (item.text === 'Low' || item.text === 'Very Low' ) {
                output = '★'
            }
            return output
        }

       formatData = () => {
        let data = []
        let labelData = []
        let dayLabels = []
        //let middleVal = this.props.middle
        //let middle = this.props.timelineVals[this.props.timelineVals.length-1].level / 2 

        if (this.props.timelineVals !== [] ) {

        this.props.timelineVals.map((item, index) => {
            let bar = {x: item.level-10, y: -index, label: `${this.lowCarbonLabel(item)}`,style: {fill: '#00cc66'}, yOffset:-25}   
          return  data = [...data, bar]
        })

        this.props.timelineVals.map((item, index) => {
            let barLabel = {x: 0, y: -index, label: `${this.parseDate(item.from, 'time')}`, xOffset:-60}  
           return labelData = [...labelData, barLabel]
        })
        this.props.timelineVals.map((item, index) => {
            
           // let middle = this.props.screenWidth / 2
           // let middle = this.state.rawData[this.state.rawData-1].x / 2 
            //middle += 100
            let day = ''

            if (parseInt(`${this.parseDate(item.from, '24')}`) < 1 || index < 1 )
            {
                day = `${this.parseDate(item.from, 'date')}`
                // console.log(day)   
            }
            let dayLabel = {x: this.state.middle, y: -index, 
                label: day,
                xOffset: this.props.mobileUser ? 0 : -30,
                 yOffset:-15}  
            dayLabels = [...dayLabels, dayLabel]
        
        return null
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
    


      
      
      colorChange = (text1, text2, color) => {
        if (this.state.currentLevel.text === text1 || this.state.currentLevel.text === text2) {
         return {color: color, fontWeight: 'bold', borderBottom: `2px solid ${color}`} 
        }else return {color: 'black', fontWeight: 'normal', border:'none'}
    }
      
    

    
    render() {
        //const {value} = this.state
       // let scroll = window.scrollY;
        // console.log(scrolledDown)
       // const highlight = "highlight"
        


        return (

<div>

<div className="bgPanel">
            <h1>Timeline Forecast</h1>
        <p>Use the Forecast Timeline to see the forecast in detail over time.</p>
        <p>The black line is the Carbon Intensity level. The Carbon Intensity increases as it travels to the right.</p>
        <p>As you scroll the info panel will update, with the Time, Carbon Intensity Level and Low, Medium, High, indicators.</p>
      {/* <Accordion defaultActiveIndex={[]} panels={TitleContent.fuelMixTitle} exclusive={false}/> */}
      </div>

<div  className="bgPanel" style={{
   
                background: '#fff',
               
            }}>

            <div
            
            style={{
                height: '800vh',
                
            }}
            id="bg-fade"
            >





<Dimmer active={this.props.loading} page>
        <Loader>Loading</Loader>
    </Dimmer>



          <div id="sticky" height={2}> 
         <h2> Carbon Intensity Timeline</h2> <br></br>
            {/* Vertical scroll position is: { this.props.scrollPositionY - this.state.yOffset } <br></br> */}
            {/* Carbon Intensity: {this.state.currentLevel.level} */}
           






          <Table className="sticky-table" fixed unstackable singleLine celled>
          {/* <Table id="sticky-table" fixed unstackable singleLine celled> */}

            <Table.Body>
            
            <Table.Row textAlign='center'> 
            <Table.Cell><h3>{this.state.currentLevel.time.slice(8)}</h3></Table.Cell>
            <Table.Cell><h3>{this.state.currentLevel.time.slice(0,8)}</h3></Table.Cell>
            <Table.Cell><h3>{`${this.state.currentLevel.level} CO2e`}</h3></Table.Cell>
            </Table.Row> 

            <Table.Row textAlign='center'>
            <Table.Cell><h3 style={this.colorChange("Low","Very Low", "green")}>⟵  Low</h3></Table.Cell>
            <Table.Cell><h3 style={this.colorChange("Moderate","Moderate", "orange")}>Medium</h3></Table.Cell>
            <Table.Cell><h3 style={this.colorChange("High","Very Hight", "red")}>High  ⟶</h3></Table.Cell>
            </Table.Row>
            </Table.Body>
          </Table>
          
          </div>
          <div id="stickyMeasure">
          </div>

                <div id="timeline" height={800} style={{marginBottom: '0vh'}}>
<div
        
      style={{
        
          justifyContent: 'space-between',
          position: 'relative',
          width:  '100%',
          height: '800vh',
    
           overflow: 'auto',
        }}
      

      
    >



<div
        style={{width: '100%', height: '100%'}}
        // style={{width: '100%', height: '100%', border: '1px solid #ccc'}}
      >
        {/* <FlexibleXYPlot  id="timeline-chart" margin={{bottom: 1000, left: 80, right: 20, top: 50}}>  */}
        <FlexibleXYPlot  id="timeline-chart" margin={{bottom: 250, left: 80, right: 20, top: 50}}> 
        {/* <FlexibleXYPlot  id="timeline-chart" margin={{bottom: 80, left: 80, right: 20, top: 50}}>  */}
        {/*50*/}
        {/* xType="time" 
         yType="ordinal"
        */}
        

        <HorizontalGridLines 
        tickTotal={this.state.rawData.length}
        animation={true}
        />
     

        
        
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



        </FlexibleXYPlot>
      </div>

</div>
     

        </div>
        

            </div></div>

            </div>
        );
    }
}

export default withScroll (Timeline);
