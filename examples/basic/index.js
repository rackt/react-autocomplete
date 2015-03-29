var React = require('react');
var StateInput = require('./StateInput');

var App = React.createClass({

  getInitialState: function() {
    return {
      comboboxValue: {
        inputValue: 'California', 
        selectedValue: {id: 'CA', name: 'California'}
      } 
    };
  },

  handleComboboxChange: function(comboboxValue) {
    this.setState({comboboxValue});
  },

  render: function() {
    return (
      <div>
        <h1>React Combobox</h1>
        <p><a href="https://github.com/hellojwilde/react-combobox/blob/master/examples/basic/index.js">Demo Source</a></p>
        <p>Selected State: {this.state.comboboxValue.selectedValue.id}</p>
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
