import React, { Component } from 'react';
import {RadialChart, GradientDefs} from 'react-vis';
import { Segment, Table, Icon, Button } from 'semantic-ui-react';


export class FuelMix extends Component {

    state = {
        chartData:[{chartData:[{angle:1, label:'loading'}], data:'', level: 0, text:'Loading'}],
        count:0,
        arrayCheck:[],
        playing: false,
        waite:false,
        time:0
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
        if (this.state.playing !== prevState.playing && this.state.playing === true) {
           return this.player()
            }
        // if (this.state.time !== prevState.time && this.state.playing === true && this.state.time >= (prevState.time+800)) {
        //   return (
        //     this.handleCount(+1),
        //     this.autoPlay()
            
        //   )
        }
        
        player = () => {

            let timer = 0
            let counter = 0
            let timeA = Date.now()
            let timeB = Date.now()
            let interval = 800
          let intervalRunner = setInterval(() => {
            console.log('hihi')
            if (this.state.playing) {
              this.handleCount(+1)
                  counter%2 === 0 ? timeA = Date.now() : timeB = Date.now()
                  
                  let check = 0
                  counter%2 === 0 ? check = (timeA-=timeB) : check = (timeB-=timeA)
                  //check < 800 ? interval +=(800-check) : interval = 
                  console.log(check)
                  check >= 1 ? interval = (800 - check) : interval = (800 + check)
                 console.log(interval)
                  counter += 1
            }else clearInterval(intervalRunner)
          },
          interval >= 1 ? interval : 0)
        }
      

        setTime = () => {
          let newTime = Date.now() 
          this.setState({time:newTime}) 
        }

        autoPlay = () => {
          let timer = 0
          let firstTime = Date.now() 
          while (this.state.playing) {
            if (Date.now() >= (firstTime + timer)){
              this.handleCount(+1)
              timer += 700
            }

          }
        }

        playTimer = () => {
          let start = Date.now()
          let timer = 0
          {setInterval(() => {
              let timeNow = Date.now()  
            if (this.state.playing && timeNow >= (start + timer) && timeNow <= (start + timer)) {
              this.handleCount(+1)
            timer += 800
            }
              },10)}
        }
    

    parseDate = (input) => {
        let optionsDate = { weekday: 'short', day: 'numeric', month: 'numeric' };
        let optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true};
               let parsedDate = new Date(Date.UTC(
                   parseInt(input.slice(0, 4), 10),
                   parseInt(input.slice(5, 7), 10) - 1,
                   parseInt(input.slice(8, 10), 10),
                   parseInt(input.slice(11, 13), 10),
                   parseInt(input.slice(14, 16), 10),
                 //parseInt(input.slice(13,15), 10)
               ))
               return (`${parsedDate.toLocaleString("en-GB", optionsTime)} - ${parsedDate.toLocaleString("en-GB", optionsDate)}`)
       }

    
    
   
    handleCount = (direction) => {
       let newCount = this.state.count
        newCount += direction

        if (newCount < this.state.chartData.length && newCount >= 0){
        this.setState({
            count: newCount
        })}else{this.setState({playing:false})}
    }

    auto = () => {
        let newCount = this.state.count
        if (newCount < this.state.chartData.length){
            this.setState({playing: !this.state.playing})
        
    }
    }



    render() {
        const myData = [
            {angle: 1, gradientLabel: 'grad1'},
        {angle: 2, gradientLabel: 'grad2'},
        {angle: 5, gradientLabel: 'grad3'}
          ]

          let data = this.state.chartData
        
        
        return (


        <div className="bgPanel">
            <h2>Wow its a lovely day, and as the Fuel Mix I love lovely days!</h2>


<Segment textAlign='center'>

    <h3>{data.length > 1 ? this.parseDate(this.state.chartData[this.state.count].date) : undefined}</h3>
          {/* <div style={{width:'100%', paddingLeft:'auto', paddingRight:'auto'}}> */}
          <div style={{display: 'inline-block'}}>
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
      subLabelsStyle={{position: 'relative', fontSize: this.props.mobileUser ? 10 : 16}}
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
          <stop offset="100%" stopColor="#2948ff" stopOpacity={0.} />
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


      <Segment.Group horizontal>
    <Segment>
    <Button icon labelPosition='left' onClick={() => this.handleCount(-1)}>
      <Icon name='left arrow' />
      Prev Hour
    </Button>
    </Segment>
    <Segment> 
        <Button icon labelPosition='right' onClick={() => this.auto()}>
      <Icon name='play' />
      Auto
    </Button>
    </Segment>
    <Segment>
        <Button icon labelPosition='right' onClick={() => this.handleCount(+1)}>
      Next Hour
      <Icon name='right arrow' />
    </Button>
    </Segment>
  </Segment.Group>

 
    


</Segment>

<div>

<Segment textAlign='center'>
    <h3>Your electricity supply will come frome these sources</h3>
<Table>

<Table.Row>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[0].tableText : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[0].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[1].tableText : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[1].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[2].tableText : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[2].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
</Table.Row>
<Table.Row>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[3].tableText : undefined}

    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[3].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[4].tableText : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[4].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[5].tableText : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[5].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
</Table.Row>

<Table.Row>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[6].tableText : undefined}

    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[6].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[7].tableText : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[7].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? this.state.chartData[this.state.count].chartData[8].tableText : undefined}
    </Table.Cell>
    <Table.Cell>
    {data.length > 1 ? `${this.state.chartData[this.state.count].chartData[8].angle.toFixed(2)}%` : undefined}
    </Table.Cell>
</Table.Row>


</Table>


</Segment>

</div>


            </div>
        );
    }
}

export default FuelMix;
