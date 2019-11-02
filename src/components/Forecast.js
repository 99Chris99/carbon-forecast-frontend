import React, { Component } from 'react';
import { Dropdown, Table, Grid, Image, Segment } from 'semantic-ui-react';

export class Forecast extends Component {


state = {
    period: 48,
    region: 18,
}


        periodOptions = [
            {
              key: 8,
              text: '+6 hours',
              value: 6,
            //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
            },
            {
              key: 8,
              text: '+8 hours',
              value: 8,
            },
            {
              key: 12,
              text: '+12 hours',
              value: 12,
            },
            {
              key: 24,
              text: '+24 hours',
              value: 24,
            },
            {
              key: 48,
              text: '+48 hours',
              value: 48,
            },
            {
              key: 100,
              text: 'Max',
              value: 100,
            },
          ]




        setPeriod = (event, data) => {
            console.log(data.value)
            this.setState({
                period: data.value
            })
        }
        setRegion = (event, data) => {
            console.log(data.value)
            this.setState({
                region: data.value
            })
        }




    render() {
        return (
            <div>
                {/* <h1> Hi, it's me forecast! Hows things?</h1> */}

<Grid columns='2' >
<Grid.Row>
   
   <Grid.Column floated='left'>      
    <p> <Dropdown
         placeholder='Region'
         selection='2'
         options={this.periodOptions}
         onChange={(event, data) => this.props.setRegion(data.value)}
       />
       </p>
       </Grid.Column>
       <Grid.Column floated='left'>
   <p>Yep thats right I'm some text!</p>
   </Grid.Column>

</Grid.Row>


<Grid.Row>
   
    <Grid.Column floated='left'>      
     <p> <Dropdown
          placeholder='Period'
          selection
          options={this.periodOptions}
          onChange={(event, data) => this.props.updatePeriod(data.value)}
        />
        </p>
        </Grid.Column>
        <Grid.Column floated='left'>
    <p>Yep thats right I'm some text!</p>
    </Grid.Column>
 
 </Grid.Row>
 </Grid>

            </div>
        );
    }
}

export default Forecast;
