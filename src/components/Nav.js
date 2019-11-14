import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react'

export class Nav extends Component {

state = {disabled: false}

disable = (event) => {
  event.preventDefault();
  this.setState({
    disabled: true
})

setTimeout(() => this.setState({ disabled: false }), 700);

}

    render() {
        return (
            <div>

     
      <Menu fluid widths={5} onClick={(event) => this.disable(event)}>
          <Menu.Item disabled={this.state.disabled} as={Link} name="start" to="/start">
            Start
          </Menu.Item>
          <Menu.Item disabled={this.state.disabled} as={Link} name="forecast" to="/forecast-summary">
            Forecast<br></br>Summary
          </Menu.Item>
          <Menu.Item  disabled={this.state.disabled} as={Link} name="timeline" to="/forecast-timeline">
            Forecast<br></br>Timeline
          </Menu.Item>
          <Menu.Item disabled={this.state.disabled} as={Link} name="fuelmix" to="/forecast-fuelmix">
            Forecast<br></br>Fuel Mix
          </Menu.Item>
          {/* <Menu.Item disabled={this.state.disabled} as={Link} name="advice" to="/advice">
            Advice
          </Menu.Item> */}
          <Menu.Item disabled={this.state.disabled} as={Link} name="about" to="/about">
            About
          </Menu.Item>
      </Menu>
          {/* </Container> */}
      

    
    {/* <nav>
        <ul>
          <li>
            <Link to="/start">Start</Link>
          </li>
          <li>
            <Link to="/forecast">Forecast</Link>
          </li>
          <li>
            <Link to="/advice">Advice</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
    </nav> */}


            </div>
        );
    }
}

export default Nav;
