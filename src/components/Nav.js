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

    
      <Menu>
      <Container>
          <Menu.Item as={Link} name="start" to="/start">
            Start
          </Menu.Item>
          <Menu.Item as={Link} name="forecast" to="/forecast">
            Forecast
          </Menu.Item>
          <Menu.Item as={Link} name="advice" to="/advice">
            Advice
          </Menu.Item>
          <Menu.Item as={Link} name="about" to="/about">
            About
          </Menu.Item>
          </Container>
      </Menu>
      

    
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
