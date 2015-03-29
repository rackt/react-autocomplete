var React = require('react');
var StateInput = require('./StateInput');

var App = React.createClass({

  getInitialState: function() {
    return {
      comboboxValue: {
        inputValue: 'California', 
        selectionIndex: null, 
        value: {id: 'CA', name: 'California'}
      } 
    };
  },

  handleComboboxChange: function(comboboxValue, callback) {
    this.setState({comboboxValue}, callback);
  },

  render: function() {
    return (
      <div>
        <h1>React Combobox</h1>
        <p><a href="https://github.com/hellojwilde/react-autocomplete/blob/master/examples/basic/main.js">Demo Source</a></p>
        <p>Selected State: {this.state.comboboxValue.value}</p>
        <StateInput 
          value={this.state.comboboxValue} 
          onChange={this.handleComboboxChange}
        />
        <div><button>something else to focus</button></div>
      </div>
    );
  }

});

React.render(<App/>, document.body);
