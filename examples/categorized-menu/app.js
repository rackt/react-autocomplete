import React from 'react'
import DOM from 'react-dom'
import Autocomplete from '../../lib/index'
import { fakeCategorizedRequest } from '../../lib/utils'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      unitedStates: [],//fakeCategorizedRequest(''),
      loading: false
    }
    this.requestTimer = null
    this.renderItems = this.renderItems.bind(this)
  }

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
          inputProps={{ id: 'states-autocomplete' }}
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
                className="item item-header"
                key={item.header}
                id={item.header}
                disabled={true}
              >{item.header}</div>
            : <div
                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                key={item.abbr}
                id={item.abbr}
              >{item.name}</div>
          )}
          renderMenu={(items, value) => (
            <div className="menu">
              {value === '' ? (
                <div className="item">Type of the name of a United State</div>
              ) : this.state.loading ? (
                <div className="item">Loading...</div>
              ) : items.length === 0 ? (
                <div className="item">No matches for {value}</div>
              ) : this.renderItems(items)}
            </div>
          )}
          isItemSelectable={(item) => this._headerCheck(item)}
        />
      </div>
    )
  }

  _headerCheck(item) {
    return !item.header
  }

  renderItems(items) {
    return items
  }
}

DOM.render(<App/>, document.getElementById('container'))

if (module.hot) { module.hot.accept() }
