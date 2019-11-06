import _ from 'lodash'
import PostcodeJsLkp from '../content/PostcodeJsLkp';
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

const initialState = { isLoading: false, results: [], value: '' }




// const source = ([{
//   title: `faker.company.companyName()`,
//   description: 'faker.company.catchPhrase()',
//   //image: 'faker.internet.avatar()',
//   price: 100},
//   {title: `A`,
//   description: 'AAaaaa',
// //   image: 'faker.internet.avatar()',
//   price: 234,
// }]

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

  componentDidUpdate (prevProps, prevState) {

    if (this.state.results ==! prevState.results && this.state.results.length === 1)
    {
      return  this.props.updatePostCode(this.state.value)
    }
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      
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
        
    )
  }
}
