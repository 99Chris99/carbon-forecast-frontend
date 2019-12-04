import _ from 'lodash'
import PostcodeJsLkp from '../content/PostcodeJsLkp';
import React, { Component } from 'react'
import { Search, Button, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [{title:''}], value: '', confirmResult: ''}


const source = (
    PostcodeJsLkp.postcodes
)



export default class PostCodeSearch extends Component {
  state = initialState


  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  

  confirmResult = () => {
    let valueCheck = this.state.value.toUpperCase()
     
    if (typeof valueCheck !== 'undefined' && valueCheck !== '' && !valueCheck.includes(" ")) {
      console.log('confirming')
    let result = source.filter(postcode => valueCheck === postcode.title)[0].title
    if (typeof result !== 'undefined'){
      console.log(result)
      //this.setState({confirmResult: result})
    this.props.updatepostcode(result)
    
    }
    }else{(console.log('Search error'))}
  }




  render() {
    const { isLoading, value, results } = this.state

    return (
        <div style={{background: 'none', marginTop:'1rem'}}>
          Post Code
 <Segment.Group style={{background: 'none', marginTop:'0'}} horizontal>
 
          <Search 
            // style={{maxwidth: "2vw"}}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props} 
          />
  
          <Button id="searchBtn" onClick={event => this.confirmResult()}>Submit</Button>
          </Segment.Group>
          </div>
    )
  }
}
