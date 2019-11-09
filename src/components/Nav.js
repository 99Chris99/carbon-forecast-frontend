import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react'

export class Nav extends Component {

state = {}



    render() {
        return (
            <div>

    
      {/* <Container> */}
      <Menu fluid widths={5}>
          <Menu.Item as={Link} name="start" to="/start">
            Start
          </Menu.Item>
          <Menu.Item as={Link} name="forecast" to="/forecast-summary">
            Forecast<br></br>Summary
          </Menu.Item>
          <Menu.Item as={Link} name="timeline" to="/forecast-timeline">
            Forecast<br></br>Timeline
          </Menu.Item>
          <Menu.Item as={Link} name="advice" to="/advice">
            Advice
          </Menu.Item>
          <Menu.Item as={Link} name="about" to="/about">
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
