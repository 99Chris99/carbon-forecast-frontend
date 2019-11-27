import React, { Component } from 'react';
import Logo from "../images/CarbonForecastLogoWhiteMedium.png";
import LogoSmall from "../images/CarbonForecastLogoWhiteSmall.png";
import { Segment } from 'semantic-ui-react';
export class Hero extends Component {
    render() {
        return (
            <div>

             <div height={5} id="header">

<div id="header-content" style={{paddingLeft:'3vw'}}>
<Segment.Group compact basic horizontal style={{background: "none"}}>
    <Segment style={{padding: "0px !important;"}}>
        <img className="img-header" src={this.props.mobileUser ? LogoSmall : Logo} />
    </Segment>
    <Segment compact style={{lineHeight: "11vw "}}>
        <span id="header-text">Carbon Forecast</span>
    </Segment>
</Segment.Group>

</div>




</div>

            </div>
        );
    }
}

export default Hero;
