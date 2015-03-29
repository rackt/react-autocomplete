# react-combobox

A flexible autocompleting combobox for React. 

Intially derived from Ryan Florence's [react-autocomplete](https://github.com/rackt/react-autocomplete), but there's been a lot of different changes made since then.

## Installation

`npm install hellojwilde/react-combobox`

You'll need to make sure you're including the `styles.css` file in the root of the npm module in your app somehow.

## Demo

http://jwilde.me/react-combobox/example/

## How do you use it?

The same way you would use an input component in React.

```js
var Combobox = require('react-combobox');

var AWESOME_PEOPLE = [
  'Ryan Florence',
  'Pete Hunt', 
  'Jonathan Wilde'
];

var MyAppWithACombobox = React.createClass({

  getInitialState: function() {
    return {value: {selectedValue: null, inputValue: ''}};
  },

  getOptionsForInputValue: function(inputValue, callback) {
    inputValue = inputValue.toLowerCase();

    callback(
      AWESOME_PEOPLE
        .map((person) => person.toLowerCase())
        .filter((person) => person.indexOf(inputValue) === 0)
    );
  },

  handleChange: function(newValue) {
    this.setState({value: newValue});
  },

  render: function() {
    <div className="app">
      <Combobox
        getOptionsForInputValue={this.getOptionsForInputValue}
        onChange={this.handleChange}
        value={this.state.value}
      />
      <p>Selection: {this.state.value.selectedValue}</p>
    </div>
  }

});
```

Check out more [examples](https://github.com/hellojwilde/react-combobox/tree/master/examples).

