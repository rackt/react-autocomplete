import React, { Component } from 'react'
import DOM from 'react-dom'
import Autocomplete from '../../lib/index'
import { getStates, matchStateToTerm, styles } from '../../lib/utils'

const STATES = getStates()

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      autoSelect: true
    }
  }

  render() {
    const { state } = this
    return (
      <div>
        <h1>Manage select behavior with autoSelect</h1>
        <p>
          By default Autocomplete will select value when user clicks on dropdown item or selects it with keyboard.
          But what if you have requirement to select highlighted value when user click somewhere
          outside of Autocomplete component. To enable this mode you can set to true
          <code>props.autoSelect</code>.
        </p>
        <label htmlFor="states">Choose a US state</label>
        <Autocomplete
          value={state.value}
          inputProps={{ id: 'states' }}
          items={STATES}
          autoSelect={state.autoSelect}
          shouldItemRender={matchStateToTerm}
          getItemValue={item => item.name}
          onSelect={value => this.setState({ value }) }
          onChange={e => this.setState({ value: e.target.value })}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.abbr}
            >
              {item.name}
            </div>
          )}
          renderMenu={children =>
              <div style={{ ...styles.menu, position: 'absolute', width: '100%' }}>
                  {children}
              </div>
          }
          wrapperStyle={{ position: 'relative', display: 'inline-block' }}
        />
        <label style={{ display: 'inline-block', marginLeft: 20 }}>
          <input
            type="checkbox"
            checked={state.autoSelect}
            onChange={() => this.setState({ autoSelect: !state.autoSelect })}
          />
          autoSelect enabled
        </label>
      </div>
    )
  }
}

DOM.render(<App/>, document.getElementById('container'))

if (module.hot) { module.hot.accept() }
