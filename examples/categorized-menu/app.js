import React from 'react'
import DOM from 'react-dom'
import Autocomplete from '../../lib/index'
import { styles, fakeCategorizedRequest } from '../../lib/utils'

let App = React.createClass({

  getInitialState() {
    return {
      value: '',
      unitedStates: fakeCategorizedRequest(''),
      loading: false
    }
  },

  render() {
    return (
      <div>
        <h1>Categorized Menu</h1>
        <p>
          In some cases, headers may already be included in the item list.
          We can accomplish rendering this by disabling specific items.
        </p>
        <label htmlFor="states-autocomplete">Choose a state from the US</label>
        <Autocomplete
          value={this.state.value}
          inputProps={{ name: 'US state', id: 'states-autocomplete' }}
          items={this.state.unitedStates}
          getItemValue={(item) => item.name || item.header}
          onSelect={(value, state) => this.setState({ value, unitedStates: [state] }) }
          onChange={(event, value) => {
            this.setState({ value, loading: true })
            fakeCategorizedRequest(value, (items) => {
              this.setState({ unitedStates: items, loading: false })
            })
          }}
          renderItem={(item, isHighlighted) => (
            item.header ?
              <div
                style={styles.header}
                key={item.header}
                id={item.header}
                disabled={true}
              >{item.header}</div>
            : <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={item.abbr}
                id={item.abbr}
              >{item.name}</div>
          )}
          renderMenu={(items, value, style) => (
            <div style={{ ...styles.menu, ...style }}>
              {value === '' ? (
                <div style={{ padding: 6 }}>Type of the name of a United State</div>
              ) : this.state.loading ? (
                <div style={{ padding: 6 }}>Loading...</div>
              ) : items.length === 0 ? (
                <div style={{ padding: 6 }}>No matches for {value}</div>
              ) : this.renderItems(items)}
            </div>
          )}
          isItemSelectable={(item) => this._headerCheck(item)}
        />
      </div>
    )
  },

  _headerCheck(item) {
    return !item.header
  },

  renderItems(items) {
    return items
  }
})

DOM.render(<App/>, document.getElementById('container'))

if (module.hot) { module.hot.accept() }
