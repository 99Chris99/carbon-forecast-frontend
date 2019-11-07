import _ from 'lodash'
import PostcodeJsLkp from '../content/PostcodeJsLkp';
import React, { Component } from 'react'
import { Search, Button, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [{title:''}], value: '', confirmResult: ''}


const source = (
    PostcodeJsLkp.postcodes
)


//handleResultSelect = (e, { result }) => this.setState({ value: result.title },this.confrimResult(result.title))

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
    let valueCheck = this.state.value
    if (typeof valueCheck !== 'undefined' && valueCheck !== '') {
      console.log('confirming')
    let result = source.filter(postcode => valueCheck === postcode.title)[0].title
    if (typeof result !== 'undefined'){
      console.log(result)
      //this.setState({confirmResult: result})
    this.props.updatePostCode(result)
    }
    }
  }




  render() {
    const { isLoading, value, results } = this.state

    return (
        <div>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
          />

          <Button onClick={event => this.confirmResult()}>Submit</Button>
          </div>
    )
  }
}
