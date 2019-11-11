import _ from 'lodash'
import PostcodeJsLkp from '../content/PostcodeJsLkp';
import React, { Component } from 'react'
import { Search, Button, Table, Input, Grid, Header, Segment } from 'semantic-ui-react'

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
    let valueCheck = this.state.value.toUpperCase()
     
    if (typeof valueCheck !== 'undefined' && valueCheck !== '' && !valueCheck.includes(" ")) {
      console.log('confirming')
    let result = source.filter(postcode => valueCheck === postcode.title)[0].title
    if (typeof result !== 'undefined'){
      console.log(result)
      //this.setState({confirmResult: result})
    this.props.updatePostCode(result)
    
    }
    }else{(console.log('Search error'))}
  }




  render() {
    const { isLoading, value, results } = this.state

    return (
        <div >
 <Segment.Group style={{background: 'none'}} horizontal>
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
//   render() {
//     const { isLoading, value, results } = this.state

//     return (
//         <div>
//  <Table fixed unstackable singleLine celled compact>
// {/* <Table fixed unstackable singleLine celled > */}
// <Table.Row>
//   <Table.Cell textAlign='left' id="searchInputCell">
//           <Search 
//             loading={isLoading}
//             onResultSelect={this.handleResultSelect}
//             onSearchChange={_.debounce(this.handleSearchChange, 500, {
//               leading: true,
//             })}
//             results={results}
//             value={value}
//             {...this.props} 
//           />
//           </Table.Cell>
//           <Table.Cell textAlign='left' id="searchBtnCell">
//           <Button id="searchBtn" onClick={event => this.confirmResult()}>Submit</Button>

// </Table.Cell>
//         </Table.Row>
// </Table>
//           </div>
//     )
//   }
// }
