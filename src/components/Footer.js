import React from 'react';
import { Container } from 'semantic-ui-react';

const Footer = (props) => {
    return (
       
        <div style={{ color:'#fff', paddingTop: '1vh', paddingBottom: '8vh', marginTop: '4vh', borderTop: '1px solid #8c8c8c'}}> 
        
            <Container>
        <h3> Carbon Forecast</h3>   
        <h2> {props.emissions} C02-e </h2>
        <h4>Total carbon emissions in tonnes produced since you opened this app (C02-e)</h4>  
        </Container>
     
        </div>
    );
}

export default Footer;