import React, { Component } from 'react';
import { Dropdown, Search, Table, Divider, Grid, Card, Button, Image, Segment, Container, TableRow } from 'semantic-ui-react';
import SummaryChart from './SummaryChart';
import PostCodeSearch from './PostCodeSearch';

export class Forecast extends Component {


state = {
    period: 48,
    region: 18,
    loading: true,
    sortByLevel: false,
    bestPeriodDisplayDay: true,
    bestPeriodLoaded: false,
    bestPeriodsDay: [{description: `Loading \n Loading \n Loading`}],
    bestPeriodsNight: [{description: `Loading \n Loading \n Loading`}]
}

componentDidMount () {
    if (typeof this.props.bestPeriods !== 'undefined'){
       if (typeof this.props.bestPeriods.day !== 'undefined' || typeof this.props.bestPeriods.night !== 'undefined'){
            if (typeof this.props.bestPeriods.day[0] !== 'undefined' || typeof this.props.bestPeriods.night[0] !== 'undefined'){
                this.renderBestPeriods()
    }
    }
}

this.isLoading()

}

componentDidUpdate (prevProps, prevState) {
    if (this.props.bestPeriods !== prevProps.bestPeriods){
        this.renderBestPeriods()
    }

    if (this.props.aggedVals !== prevProps.aggedVals) {
        this.isLoading()
    }
}
    periodOptions = [
            {
              key: 6,
              text: '+6 hours',
              value: 12,
            //   image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg' },
            },
            {
              key: 8,
              text: '+8 hours',
              value: 16,
            },
            {
              key: 12,
              text: '+12 hours',
              value: 24,
            },
            {
              key: 24,
              text: '+24 hours',
              value: 48,
            },
            {
              key: 48,
              text: '+48 hours',
              value: 96,
            },
            {
              key: 100,
              text: 'Max',
              value: 500,
            },
          ]

isLoading = () => {
    if (this.props.aggedVals === [] || typeof this.props.aggedVals === 'undefined'){
        this.setState({loading: true})
    }else {this.setState({loading: false})}
}

        
          parseDate = (input) => {
            let optionsDate = { weekday: 'short', day: 'numeric', month: 'numeric' };
            let optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true};
                   let parsedDate = new Date(Date.UTC(
                       parseInt(input.slice(0, 4), 10),
                       parseInt(input.slice(5, 7), 10) - 1,
                       parseInt(input.slice(8, 10), 10),
                       parseInt(input.slice(11, 13), 10),
                       parseInt(input.slice(14, 16), 10),
                     //parseInt(input.slice(13,15), 10)
                   ))
                   return (`${parsedDate.toLocaleString("en-GB", optionsTime)} ${parsedDate.toLocaleString("en-GB", optionsDate)}`)
           }


          genRegionOptions = () => {
          let output = this.props.regionIndex.map(obj => {
                return {key: obj.id, text: obj.name, value: obj.id}
            })
            output.sort((a,b) => (a.key < b.key) ? 1 : -1)
            return output
        }

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

        controlSort = () => {
            let newProps = this.props.aggedVals
          if (this.state.sortByLevel ==! true){
           newProps = this.props.aggedVals.sort((a,b) => (Date.parse(a.from) > Date.parse(b.from)? 1 : -1))
            }
            else if (this.state.sortByLevel === true){
                newProps = this.props.aggedVals.sort((a,b) => a.level > b.level? 1 : -1)
            }
                 return newProps
        }

        handleSortButton = (event) => {
            let newVal = this.state.sortByLevel ? false : true
            this.setState({sortByLevel: newVal})
        } 
        handleDayNightButton = (event) => {
            let newVal = this.state.bestPeriodDisplayDay ? false : true
            this.setState({bestPeriodDisplayDay: newVal})
        }

        

    renderBestPeriods = () => {
                
        //let bestDay = this.props.bestPeriods.length > 0 ? this.props.bestPeriods.day : [ {from: 'Loading',level:'Loading',text:'Loading'} ]
        let bestDay =   this.props.bestPeriods.day
        let bestNight = this.props.bestPeriods.night
        
        let dayOutput = []
        let nightOutput = []

        if (typeof bestDay[0] !== 'undefined' && typeof bestDay[1] !== 'undefined' && typeof bestDay[2] !== 'undefined') {
        dayOutput = [
                        //header:      `${bestDay.from}`,
                       { description:  `${this.parseDate(bestDay[0].from)}\n${bestDay[0].level}\n${bestDay[0].text}`},
                       { description:  `${this.parseDate(bestDay[1].from)}\n${bestDay[1].level}\n${bestDay[1].text}`},
                       { description:  `${this.parseDate(bestDay[2].from)}\n${bestDay[2].level}\n${bestDay[2].text}`},
                ]}else{
        dayOutput = [  { description:  `Please change period to include night-time hours `}]
                }

        if (typeof bestNight[0] !== 'undefined' && typeof bestNight[1] !== 'undefined' && typeof bestNight[2] !== 'undefined'){
        nightOutput = [
                        //header:      `${bestDay.from}`,
                       { description:  `${this.parseDate(bestNight[0].from)}\n${bestNight[0].level}\n${bestNight[0].text}`},
                       { description:  `${this.parseDate(bestNight[1].from)}\n${bestNight[1].level}\n${bestNight[1].text}`},
                       { description:  `${this.parseDate(bestNight[2].from)}\n${bestNight[2].level}\n${bestNight[2].text}`},
                    ]
                }else {
                   nightOutput = [  { description:  `Please change period to include night-time hours `}]

            }
            
        this.setState({
            bestPeriodsDay: dayOutput,
            bestPeriodsNight: nightOutput
        })
        // return output
    } 
    

    
    render() {
        return (
            
            <div>

            <div>
                {/* <h1> Hi, it's me forecast! Hows things?</h1> */}

                <div>
            <Divider horizontal>Lowest Levels</Divider>
    {/* <button class="ui button" onClick={this.handleDayNightButton}>Show {this.state.bestPeriodDisplayDay ? 'Daytime' : 'Night-time'}</button> */}
    <p onClick={this.handleDayNightButton}>Top 3 times to use electricity duiring this period:
    <br></br>
     {this.state.bestPeriodDisplayDay ?  <b>Show Daytime</b> : `Show Daytime | `}   
     {this.state.bestPeriodDisplayDay ?  ` | Show Night-time` : <b>Show Night-time</b>} 
     </p>

 <Card.Group  itemsPerRow={3} items={this.state.bestPeriodDisplayDay ? this.state.bestPeriodsDay : this.state.bestPeriodsNight} />
</div>


<Divider horizontal>Options</Divider>

<Table   columns={2}>
<Table.Row>
<Table.Cell>
    <Dropdown
         compact={this.props.mobileUser ? true : false}
         placeholder='Period'
         selection='2'
         options={this.periodOptions}
         onChange={(event, data) => this.props.updatePeriod(data.value)}
         />
    </Table.Cell>

            <Table.Cell>
    <p>Yep thats right I'm some text!</p>
   </Table.Cell>
   </Table.Row>

   <Table.Row>
    <Table.Cell>
    <Dropdown
          placeholder='Region'
          selection
          options={this.genRegionOptions()}
          onChange={(event, data) => this.props.updateRegion(data.value)}
        />
    </Table.Cell>
        <Table.Cell>
   <PostCodeSearch updatePostCode={this.props.updatePostCode}/>
    </Table.Cell>
    </Table.Row>
 </Table>
{/* <Grid columns='2' >
<Grid.Row>
   <Grid.Column floated='left'>      
    <Dropdown
         placeholder='Period'
         selection='2'
         options={this.periodOptions}
         onChange={(event, data) => this.props.updatePeriod(data.value)}
         />
       </Grid.Column>
       <Grid.Column floated='left'>
   <PostCodeSearch updatePostCode={this.props.updatePostCode}/>
   </Grid.Column>
</Grid.Row>
<Grid.Row>
    <Grid.Column floated='left'>      
    <Dropdown
          placeholder='Region'
          selection
          options={this.genRegionOptions()}
          onChange={(event, data) => this.props.updateRegion(data.value)}
        />
        </Grid.Column>
        <Grid.Column floated='left'>
    <p>Yep thats right I'm some text!</p>
    </Grid.Column>
 </Grid.Row>
 </Grid> */}



</div>


<Divider horizontal>Carbon Levels</Divider>

<div id="summary-chart" >

<SummaryChart aggedVals={this.controlSort()} sortTrigger={this.state.sortByLevel} mobileUser={this.props.mobileUser}/>
</div>
<button class="ui button" onClick={this.handleSortButton}>Sort By {this.state.sortByLevel ? 'Time' : 'Intensity Level'}</button>



</div>
        );
    }
}

export default Forecast;
