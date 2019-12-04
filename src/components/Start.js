import React, { Component } from 'react';
import { Container, Grid, Header, Accordion} from 'semantic-ui-react';
import TitleContent from '../content/TitleContent';

export class Start extends Component {
    state = {
        countDown: ' '
    }


    componentDidMount () {
        setInterval(() => {this.countDownToDoom()},1000)
    }

startMeterValueMaths = () => {
            const maxVal = 500;
            let intensityValue = this.props.intensityData.value / maxVal
            //  console.log(intensityValue)
            //  console.log(intensityValue * 180)
            return intensityValue * 180
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
           return (`${parsedDate.toLocaleString("en-GB", optionsTime)} ${parsedDate.toLocaleString("en-GB", optionsDate)}`)
   }

countDownToDoom = () => {

        let output = ''

        let deadline = new Date("Dec 1, 2034 00:00:00:00").getTime(); 
        //let x = setInterval(function() { 
        let now = new Date().getTime(); 
        let t = deadline - now; 
        //console.log(t)
                //let days = Math.floor(t / (1000 * 60 * 60 * 24));
                
                let years = Math.floor(t / (1000 * 60 * 60 * 24 * 30.5 * 12));
                let months = Math.floor((t % (1000 * 60 * 60 * 24 * 30.5 * 12)) /(1000 * 60 * 60 * 24 * 30.5));        
                let days = Math.floor((t % (1000 * 60 * 60 * 24 * 30.5)) /(1000 * 60 * 60 * 24));
                let hours = Math.floor((t % (1000 * 60 * 60 * 24))/(1000 * 60 * 60)); 
                let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)); 
                let seconds = Math.floor((t % (1000 * 60)) / 1000);


        output = `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`

            
        if (t < 0) { 
                //clearInterval(x); 
                output = "TIMES UP" 
            } 



        this.setState({
            countDown: output
        })

        }

    render() {
        return (
            <div>
       

            <Container>
            <div className="bgPanel">
            <h1> <span className="textHighlight"> Carbon Forecast </span> </h1>
      <Accordion defaultActiveIndex={[0]} panels={TitleContent.startTitle} exclusive={false}/>
   

            </div>


          <div className="bgPanel">
        <br></br>
    <div className="startmeter">
		<div className="gauge-a"></div>
		<div className="gauge-b"></div>
		<div className="gauge-c" style={{transform:`rotate(${this.props.intensityData.value > 0 ? this.startMeterValueMaths() : 0}deg)`}}></div>
		<div className="gauge-data" id={this.props.intensityData.value > 0 ? 'loadedData' : undefined}><h1 id="percent">{this.props.intensityData.value}</h1><br></br>Hover On Me</div>
    </div>
    <div style={{width: '100%', paddingLeft: '20%', paddingRight: '20%'}}>
    <Header as='h3' textAlign='justified' >
      Low High
    </Header>
    </div>
        
        <Header as='h2' textAlign='center' style={{marginTop:'0'}}>
        Current level of carbon emmsions for {this.props.regionName} electricity supply
        </Header>
        <br></br>
        <br></br>

          </div>
            

    <div className="bgPanel">
    {/* <h4>HiHi{setInterval(() => this.countDownToDoom(), 1000)}</h4> */}
    {/* <h4>{setInterval(() => `${this.countDownToDoom()}`,1000)}</h4> */}
   <br></br>
 {/* columns={2} */}
    <Grid centered stackable columns={2} padded>
      <Grid.Column width={6}>
      <h2>{this.state.countDown}</h2>
   <h4> Until global warming reaches +1.5 °c</h4>      
   </Grid.Column>
   {/* <Grid.Column width={3}> </Grid.Column> */}
      <Grid.Column width={6}>
      <h2> {this.props.emissions} C02-e </h2>
   <h4>Total carbon emissions in tonnes produced since you opened this app (C02-e)</h4>       
    </Grid.Column>
    </Grid>


    </div>





    </Container>
   
    </div>
            
        );
    }
}

export default Start;