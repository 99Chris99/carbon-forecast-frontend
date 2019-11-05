import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export class Start extends Component {
    state = {
        countDown: ' '
    }


    componentDidMount () {
        {setInterval(() => {this.countDownToDoom()},1000)}
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
            <div>
            <h1>Hi there, I'm the start page, hope you are well!</h1>   
            <br></br>
            </div>
            <div>
            <Container>
        
    <div className="startmeter">
		<div className="gauge-a"></div>
		<div className="gauge-b"></div>
		<div className="gauge-c" style={{transform:`rotate(${this.props.intensityData.value > 0 ? this.startMeterValueMaths() : 0}deg)`}}></div>
		<div className="gauge-data" id={this.props.intensityData.value > 0 ? 'loadedData' : undefined}><h1 id="percent">{this.props.intensityData.value}</h1><br></br>Hover On Me</div>
	</div>

    <div>
    {/* <h4>HiHi{setInterval(() => this.countDownToDoom(), 1000)}</h4> */}
    {/* <h4>{setInterval(() => `${this.countDownToDoom()}`,1000)}</h4> */}
   <br></br>
   <h4>{this.state.countDown} - time left until global warming reaches 1.5 °c</h4>
   <h4> {this.props.emmissions} - total emissions in tonnes produced since you opened this app (C02-e)</h4>  
    </div>

    </Container>
    </div>
    </div>
            
        );
    }
}

export default Start;