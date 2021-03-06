import React, { Component } from 'react';
import { Dropdown, Accordion, Table, Dimmer,Loader, Card, Button,} from 'semantic-ui-react';
import SummaryChart from './SummaryChart';
import TitleContent from '../content/TitleContent';
import PostCodeSearch from './PostCodeSearch';

export class Forecast extends Component {


state = {
    period: 48,
    region: 18,
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

}

componentDidUpdate (prevProps, prevState) {
    if (this.props.bestPeriods !== prevProps.bestPeriods){
        this.renderBestPeriods()
    }

    if (this.props.aggedVals !== prevProps.aggedVals) {
    
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
            // console.log(data.value)
            this.setState({
                period: data.value
            })
        }
        setRegion = (event, data) => {
            // console.log(data.value)
            this.setState({
                region: data.value
            })
        }

        controlSort = () => {
            let newProps = this.props.aggedVals
          if (this.state.sortByLevel !== true){
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
        let dayOutputBig = []
        let nightOutputBig = []

        if (typeof bestDay[0] !== 'undefined' && typeof bestDay[1] !== 'undefined' && typeof bestDay[2] !== 'undefined') {
        dayOutput = [
                       { description:  `${this.parseDate(bestDay[0].from)}\n${bestDay[0].level}\n${bestDay[0].text}`},
                       { description:  `${this.parseDate(bestDay[1].from)}\n${bestDay[1].level}\n${bestDay[1].text}`},
                       { description:  `${this.parseDate(bestDay[2].from)}\n${bestDay[2].level}\n${bestDay[2].text}`},
                ]
        dayOutputBig = [
                       { header: `${this.parseDate(bestDay[0].from)}`, description:`${bestDay[0].level}\n${bestDay[0].text}`},
                       { header:  `${this.parseDate(bestDay[1].from)}`, description:`${bestDay[1].level}\n${bestDay[1].text}`},
                       { header:  `${this.parseDate(bestDay[2].from)}`, description:`${bestDay[2].level}\n${bestDay[2].text}`},
                ]
            
            }else{
        dayOutput = [  { description:  `Please increase period to include night-time hours `}]
        dayOutputBig = [  { description:  `Please increase period to include night-time hours `}]
                }


                

        if (typeof bestNight[0] !== 'undefined' && typeof bestNight[1] !== 'undefined' && typeof bestNight[2] !== 'undefined'){
        nightOutput = [
                       { description:  `${this.parseDate(bestNight[0].from)}\n${bestNight[0].level}\n${bestNight[0].text}`},
                       { description:  `${this.parseDate(bestNight[1].from)}\n${bestNight[1].level}\n${bestNight[1].text}`},
                       { description:  `${this.parseDate(bestNight[2].from)}\n${bestNight[2].level}\n${bestNight[2].text}`},
                    ]
                    nightOutputBig = [
                        { header: `${this.parseDate(bestNight[0].from)}`, description:`${bestNight[0].level}\n${bestNight[0].text}`},
                        { header:  `${this.parseDate(bestNight[1].from)}`, description:`${bestNight[1].level}\n${bestNight[1].text}`},
                        { header:  `${this.parseDate(bestNight[2].from)}`, description:`${bestNight[2].level}\n${bestNight[2].text}`},
                 ]

                }else {
                   nightOutput = [  { description:  `Please increase period to include night-time hours `}]
                   nightOutputBig = [  { description:  `Please increase period to include night-time hours `}]

            }
            
        this.setState({
            bestPeriodsDay: this.props.mobileUser ? dayOutput : dayOutputBig ,
            bestPeriodsNight: this.props.mobileUser ? nightOutput : nightOutputBig
        })
        // return output
    } 

  

    handleDropDown = (data) => {
        return (
                this.props.updateRegion(data.value)
                )
            }

    
    render() {
        return (
            
            <div>



<div className="bgPanel">
           <h1> <span className="textHighlight"> Forecast Summary </span> </h1>
      <Accordion defaultActiveIndex={[0]} panels={TitleContent.forecastSummaryTitle} exclusive={false}/>
      </div>

            <div>
                <div className="bgPanel">
    <h2><span className="textHighlight">Top 3 Periods</span></h2>
    
    <p>Top 3 times to use electricity duiring this period:
    </p>
 <Card.Group itemsPerRow={3} items={this.state.bestPeriodDisplayDay ? this.state.bestPeriodsDay : this.state.bestPeriodsNight} />
    
   
<br></br>
        <Button size='small'  attached='left'
        active={this.state.bestPeriodDisplayDay}
        toggle
        onClick={this.handleDayNightButton}
        >Day</Button>
        <Button size='small' attached='right'
        active={!this.state.bestPeriodDisplayDay}
        toggle
        onClick={this.handleDayNightButton}
        >Night</Button>

</div>


<div className="bgPanel">


    <h2>Options</h2>
    <h4>Selected: Period: {this.props.setPeriod <= 48 ? `+${this.props.setPeriod/2} hrs` : 'Max'}  |  Region: {this.props.useId ? this.props.regionName : this.props.setPostCode} </h4>

    
     <Dimmer active={this.props.loading} page>
        <Loader>Loading</Loader>
    </Dimmer> 

<Table   columns={2}>
    <Table.Body>
<Table.Row>
<Table.Cell>
    Period:
    <br />
    <Dropdown
         compact={this.props.mobileUser ? true : false}
         placeholder={this.props.setPeriod <= 48 ? `+${this.props.setPeriod/2} hrs` : 'Max'}
         selection
         options={this.periodOptions}
         onChange={(event, data) => this.props.updatePeriod(data.value)}
         />
</Table.Cell>

            <Table.Cell>
  
   </Table.Cell>
   </Table.Row>

   <Table.Row>
    <Table.Cell>
        Region
        <br/>
    <Dropdown
          placeholder={this.props.useId ? this.props.regionName : 'Select Region'}
          selection
          options={this.genRegionOptions()}
          onChange={(event, data) => {this.handleDropDown(data)}}
          //onChange={(event, data) => {this.props.updateRegion(data.value)}}
        />
    </Table.Cell>
        <Table.Cell>
           
   <PostCodeSearch updatepostcode={this.props.updatePostCode}/>
    </Table.Cell>
    </Table.Row>
    </Table.Body>
 </Table>

 </div>


</div>


{/* <Divider horizontal>Carbon Levels</Divider> */}

<div id="summary-chart" className="bgPanel">
<h2>Summary Chart</h2>
<SummaryChart aggedVals={this.controlSort()} sortTrigger={this.state.sortByLevel} mobileUser={this.props.mobileUser}/>
<button className="ui button" onClick={this.handleSortButton}>Sort By {this.state.sortByLevel ? 'Time' : 'Intensity Level'}</button>
</div>


</div>
        );
    }
}

export default Forecast;
