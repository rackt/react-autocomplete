var React = require('react');

require('./ComboboxButton.css');

var ComboboxButton = React.createClass({

  render: function() {
    return (
      <span
        aria-hidden="true"
        className="rf-combobox-button"
        {...this.props}>
        ▾
      </span>
    );
  }

});

module.exports = ComboboxButton;