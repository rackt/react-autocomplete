var Combobox = require('../../src/Combobox');
var React = require('react');
var StateData = require('./StateData');

var StateInput = React.createClass({

  getOptionsForInput: function(inputValue, callback) {
    if (inputValue === '') {
      callback(StateData);
      return;
    }

    // In a real-world scenario, you might defer to a remote server for 
    // your autocompletion. The promise-based API makes it easy to do 
    // asynchronous autocompletion.
    
    setTimeout(() => {
      var search = inputValue.toLowerCase();
      
      callback(StateData.filter(function(state) {
        // Allows you to match anything you want, not just the labels.
        return (
          state.name.toLowerCase().indexOf(search) === 0 || 
          state.id.toLowerCase().indexOf(search) === 0
        );
      }));
    }, 500);
  },

  getLabelForOption: function(value) {
    return value.name;
  },

  render: function() {
    return (
      <Combobox 
        {...this.props}
        getOptionsForInput={this.getOptionsForInput}
        getLabelForOption={this.getLabelForOption}
        getRenderedOption={this.getLabelForOption}
      />
    );
  }

});

module.exports = StateInput;