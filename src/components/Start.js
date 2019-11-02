import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export class Start extends Component {



startMeterValueMaths = () => {
            const maxVal = 500;
            let intensityValue = this.props.intensityData.value / maxVal
            //  console.log(intensityValue)
            //  console.log(intensityValue * 180)
            return intensityValue * 180           
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
    </Container>
    </div>
    </div>
            
        );
    }
}

export default Start;