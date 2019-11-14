import React, { Component } from 'react';
import Logo from "../images/CarbonForecastLogo2Big.png";
import LogoSmall from "../images/CarbonForecastLogo2Small.png";
import { Segment } from 'semantic-ui-react';
export class Hero extends Component {
    render() {
        return (
            <div>

             <div height={5} id="header">

<div id="header-content" style={{paddingLeft:'3vw'}}>
<h1>
    <img className="img-header" src={this.props.mobileUser ? LogoSmall : Logo} />


</h1>
</div>




</div>

            </div>
        );
    }
}

export default Hero;
