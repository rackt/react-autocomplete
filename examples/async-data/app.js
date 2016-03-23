import React from 'react'
import ReactDOM from 'react-dom'
import Autocomplete from '../../lib/index'
import { getStates, matchStateToTerm, sortStates, styles, fakeRequest } from '../../lib/utils'

let App = React.createClass({

  getInitialState () {
    return {
      unitedStates: getStates(),
      loading: false,
      valueEntered: ''
    }
  },

  render () {
    return (
      <div>
        <h1>Async Data</h1>
        <p>
          Autocomplete works great with async data by allowing you to pass in
          items. The <code>onChange</code> event provides you the value to make
          a server request with, then change state and pass in new items, it will
          attempt to autocomplete the first one.
        </p>
        <Autocomplete {...this.getAutocompleteProps()} />
        {this.renderMessage()}
      </div>
    )
  },

  renderMessage () {
    let dataToRender = null;

    if (this.state.valueEntered) {
      dataToRender = <p>Your search {this.state.valueEntered} is not in the list of states. Making service call...</p>;
    }

    return dataToRender;
  },

  getAutocompleteProps () {
    return {
      labelText: "Choose a state from the US",
      inputProps: { name: "US state" },
      ref: "autocomplete",
      items: this.state.unitedStates,
      getItemValue: (item) => item.name,
      onSelect: (value, item) => {
        // set the menu to only the selected item
        this.setState({ unitedStates: [ item ] })
        // or you could reset it to a default list again
        // this.setState({ unitedStates: getStates() })
      },
      onChange: (event, value) => {
        this.setState({loading: true})
        fakeRequest(value, (items) => {
          this.setState({unitedStates: items, loading: false})
        })
      },
      onSearch: (value) => {
        this.setState({valueEntered: value})
      },
      renderItem: (item, isHighlighted) => (
        <div
          style={isHighlighted ? styles.highlightedItem : styles.item}
          key={item.abbr}
          id={item.abbr}
        >{item.name}</div>
      )
    };
  }
})

ReactDOM.render(<App/>, document.getElementById('container'))

