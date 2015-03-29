var React = require('react');
var Combobox = require('../../src/Combobox');

var throttle = require('./throttle');

const FLICKR_URL = 'http://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

var FlickrInput = React.createClass({

  getOptionsForInput: throttle(500, function(inputValue, callback) {
    $.getJSON(
      FLICKR_URL, 
      {tags: inputValue, format: 'json'},
      (results) => callback(results.items)
    );
  }),

  getRenderedOption: function(option) {
    return <img src={option.media.m} height="50" />;
  },

  getLabelForOption: function(option) {
    return '';
  },

  render: function() {
    return (
      <Combobox
        {...this.props}
        getOptionsForInput={this.getOptionsForInput}
        getRenderedOption={this.getRenderedOption}
        getLabelForOption={this.getLabelForOption}
      />
    );
  }

});

module.exports = FlickrInput;