var React = require('react');
var ComboboxKeyDownMixin = require('./ComboboxKeyDownMixin');

var getActiveDescendantId = require('./getActiveDescendantId');

require('./ComboboxInput.css');

const KEYDOWN_BACKSPACE = 8;

var ComboboxInput = React.createClass({

  mixins: [ComboboxKeyDownMixin],

  propTypes: {
    autocomplete: React.PropTypes.oneOf(['both', 'inline', 'list']).isRequired,
    autocompleteOption: React.PropTypes.any,
    getLabelForOption: React.PropTypes.func.isRequired,
    getLabelSelectionRange: React.PropTypes.func.isRequired,
    inputValue: React.PropTypes.string.isRequired,
    onRequestChange: React.PropTypes.func.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestFocusNext: React.PropTypes.func.isRequired,
    onRequestFocusPrevious: React.PropTypes.func.isRequired,
    onRequestSelect: React.PropTypes.func.isRequired,
    optionIndex: React.PropTypes.number,
    popupId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      isBackspacing: false
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.autocompleteOption == null ||
        this.state.isBackspacing) {
      return;
    }

    // Provided that we have an autocomplete option, and we're not currently
    // trying getting rid of text from the box, inset a possible autocompletion
    // result and highlight the part that was inserted.

    var input = this.refs.input.getDOMNode();
    var {inputValue, autocompleteOption} = this.props;
    var label = this.props.getLabelForOption(autocompleteOption);
    var range = this.props.getLabelSelectionRange(inputValue, label);

    if (range) {
      input.value = label;
      input.setSelectionRange(range.start, range.end);
    }
  },

  requestSelect: function() {
    if (this.props.autocompleteOption != null) {
      this.props.onRequestSelect(this.props.autocompleteOption);
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
        className="ComboboxInput"
        value={this.props.inputValue}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        role="combobox"
        aria-activedescendant={getActiveDescendantId(
          this.props.popupId,
          this.props.optionIndex
        )}
        aria-autocomplete={this.props.autocomplete}
        aria-owns={this.props.popupId}
      />
    );
  }

});

module.exports = ComboboxInput;