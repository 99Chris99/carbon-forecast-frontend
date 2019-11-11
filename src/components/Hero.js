import React, { Component } from 'react';
import Logo from "../images/CarbonForecastLogoWhiteMedium.png";
import LogoSmall from "../images/CarbonForecastLogoWhiteSmall.png";

export class Hero extends Component {
    render() {
        return (
            <div>

             <div height={5} id="header">

<img src={this.props.mobileUser ? LogoSmall : Logo} style={{margin: '2vw'}}/>


</div>

            </div>
        );
    }
}

export default Hero;
