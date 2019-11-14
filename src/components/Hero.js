import React, { Component } from 'react';
import Logo from "../images/CarbonForecastLogoWhiteMedium.png";
import LogoSmall from "../images/CarbonForecastLogoWhiteSmall.png";
import { Segment } from 'semantic-ui-react';
export class Hero extends Component {
    render() {
        return (
            <div>

             <div height={5} id="header">

<div id="header-content">
<img src={this.props.mobileUser ? LogoSmall : Logo} />



</div>




</div>

            </div>
        );
    }
}

export default Hero;
