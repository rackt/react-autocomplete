var React = require('react');
var StateData = require('./StateData');
var {Combobox} = require('../../lib/index');

var StateInput = React.createClass({

  getOptionsForInput: function(inputValue, callback) {
    if (inputValue === '') {
      callback(StateData);
      return;
    }

    var filter = new RegExp(`^${inputValue}`, 'i');

    // In a real-world scenario, you might defer to a remote server for 
    // your autocompletion. The promise-based API makes it easy to do 
    // asynchronous autocompletion.
    
    setTimeout(() => {
      callback(StateData.filter(function(state) {
        // Allows you to match anything you want, not just the labels.
        return filter.test(state.name) || filter.test(state.id);
      }));
    }, 500);
  },

  getLabelForValue: function(value) {
    return value.name;
  },

  render: function() {
    return (
      <Combobox 
        {...this.props}
        getOptionsForInput={this.getOptionsForInput}
        getLabelForValue={this.getLabelForValue}
      />
    );
  }

});

module.exports = StateInput;