var React = require('react');
var FlickrInput = require('./FlickrInput');

var App = React.createClass({

  getInitialState: function() {
    return {
      value: {
        inputValue: '', 
        value: ''
      },
      selections: []
    };
  },

  handleChange: function(value) {
    this.setState({value});
  },

  handleSelect: function(selection) {
    this.setState({
      selections: this.state.selections.concat(selection)
    });
  },

  renderSelections: function() {
    return this.state.selections.map(function(image, key) {
      return <img key={key} src={image.media.m}/>;
    });
  },

  render: function() {
    return (
      <div>
        <h1>React Combobox</h1>
        <p><a href="https://github.com/rpflorence/react-combobox/blob/master/examples/flickr/main.js">Demo Source</a></p>
        <FlickrInput
          value={this.state.value}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        />
        <div>
          {this.renderSelections()}
        </div>
      </div>
    );
  }
});

React.render(<App/>, document.body);


