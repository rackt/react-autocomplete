var React = require('react');
var ComboboxKeysMixin = require('./ComboboxKeysMixin');

var getActiveDescendantId = require('./getActiveDescendantId');

require('./ComboboxInput.css');

var ComboboxInput = React.createClass({

  mixins: [ComboboxKeysMixin],

  propTypes: {
    listId: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    selectedLabel: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    onRequestChange: React.PropTypes.func.isRequired,
    onRequestSelect: React.PropTypes.func.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestNext: React.PropTypes.func.isRequired,
    onRequestPrevious: React.PropTypes.func.isRequired
  },

  handleChange: function(event) {
    this.props.onRequestChange(event.target.value);
  },

  handleBlur: function() {

  },

  handleFocus: function() {

  },

  render: function() {
    return (
      <input
        ref="input"
        className="rf-combobox-input"
        value={this.props.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDownIfPossible}
        role="combobox"
        aria-activedescendant={getActiveDescendantId(
          this.props.listId,
          this.props.selectedIndex
        )}
        aria-autocomplete={this.props.autocomplete}
        aria-owns={this.props.listId}
      />
    );
  }

});

module.exports = ComboboxInput;