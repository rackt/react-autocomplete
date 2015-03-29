var React = require('react');
var ComboboxKeyDownMixin = require('./ComboboxKeyDownMixin');

var getActiveDescendantId = require('./getActiveDescendantId');

require('./ComboboxInput.css');

const KEYDOWN_BACKSPACE = 8;

var ComboboxInput = React.createClass({

  mixins: [ComboboxKeyDownMixin],

  propTypes: {
    autocomplete: React.PropTypes.oneOf(['both', 'inline', 'list']).isRequired,
    autocompleteValue: React.PropTypes.any,
    getLabelSelectionRange: React.PropTypes.func.isRequired,
    getLabelForValue: React.PropTypes.func.isRequired,
    inputValue: React.PropTypes.string.isRequired,
    listId: React.PropTypes.string.isRequired,
    onRequestChange: React.PropTypes.func.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestFocusNext: React.PropTypes.func.isRequired,
    onRequestFocusPrevious: React.PropTypes.func.isRequired,
    onRequestSelect: React.PropTypes.func.isRequired,
    optionIndex: React.PropTypes.number
  },

  getInitialState: function() {
    return {
      isBackspacing: false
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.autocompleteValue == null ||
        this.state.isBackspacing) {
      return;
    }

    var input = this.refs.input.getDOMNode();
    var inputValue = input.value;
    var label = this.props.getLabelForValue(this.props.autocompleteValue);
    var range = this.props.getLabelSelectionRange(inputValue, label);

    if (range) {
      input.value = label;
      input.setSelectionRange(range.start, range.end);
    }
  },

  requestSelect: function() {
    if (this.props.autocompleteValue != null) {
      this.props.onRequestSelect(this.props.autocompleteValue);
    }
  },

  handleChange: function(event) {
    this.props.onRequestChange(event.target.value);
  },

  handleBlur: function() {
    this.requestSelect();
  },

  handleKeyDown: function(event) {
    this.setState({isBackspacing: event.keyCode === KEYDOWN_BACKSPACE});
    this.handleStandardKeyDown(event, {onRequestSelect: this.requestSelect});
  },

  render: function() {
    return (
      <input
        ref="input"
        className="rf-combobox-input"
        value={this.props.inputValue}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        role="combobox"
        aria-activedescendant={getActiveDescendantId(
          this.props.listId,
          this.props.optionIndex
        )}
        aria-autocomplete={this.props.autocomplete}
        aria-owns={this.props.listId}
      />
    );
  }

});

module.exports = ComboboxInput;