import React, { Component } from 'react';
import Logo from "../images/CarbonForecastLogoWhiteMedium.png";
import LogoSmall from "../images/CarbonForecastLogoWhiteSmall.png";
import {Grid } from 'semantic-ui-react';
export class Hero extends Component {
    render() {
        return (
            <div>

             <div height={5} id="header">

<div id="header-content" style={{paddingLeft:'3vw'}}>


<Grid> 
            
                <Grid.Column verticalAlign='top' floated='left' width={5}>
                <img alt="Carbon Forecast Cloud Logo" className="img-header" src={this.props.mobileUser ? LogoSmall : Logo} />


                </Grid.Column>

                <Grid.Column verticalAlign='middle' floated='left' width={11} style={{paddingRight: "0px !important"}}>
                <div id="header-text" style={this.props.mobileUser ? {fontSize: "22px"} : {fontSize: "70px"}}> Carbon Forecast</div>
                </Grid.Column>

          
       

</Grid>

</div>




</div>

            </div>
        );
    }
}

export default Hero;
