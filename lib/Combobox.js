var ComboboxList = require('./ComboboxList');
var ComboboxListEmpty = require('./ComboboxListEmpty');
var ComboboxInput = require('./ComboboxInput');
var React = require('react/addons');

var assign = require('object-assign');
var joinClasses = require('react/lib/joinClasses');
var cloneWithProps = React.addons.cloneWithProps;

require('./Combobox.css');

var guid = 0;

var Combobox = React.createClass({

  propTypes: {

    /**
     * The type of autocompletion behavior:
     *   - `inline` autocompletes the first matched value into the text box,
     *   - `list` displays a list of choices,
     *   - `both` displays both.
     * Default is `both`.
     * @type {string}
     */
    autocomplete: React.PropTypes.oneOf(['both', 'inline', 'list']),

    /**
     * Represents the current content value of the combobox:
     *  - `inputValue` is the text that the user typed in the combobox.
     *    Defaults to ''.
     *  - `focusedIndex` is the autocomplete result ID selected in the list.
     *    Defaults to null when nothing is selected.
     *  - `value` is the selected value in the combobox.
     *    Defaults to null when nothing is selected.
     * @type {object}
     */
    value: React.PropTypes.shape({
      inputValue: React.PropTypes.string,
      value: React.PropTypes.any
    }),

    /**
     * Handler fired whenever the `value` changes with the updated value object.
     * @type {function}
     */
    onChange: React.PropTypes.func.isRequired,

    /**
     * For a given input value and autocomplete value label, returns the 
     * selection range that should be highlighted in blue.
     * @type {function}
     */
    getLabelSelectionRange: React.PropTypes.func,

    /**
     * For a given autocomplete value, returns the text that should be shown
     * in the input textbox of the autocomplete. Default is the value coerced
     * to a string.
     * @type {function}
     */
    getLabelForValue: React.PropTypes.func,

    /**
     * For a given input string typed by the user, calls a callback when
     * new autocompletion results are available.
     * @type {function}
     */
    getValuesForInput: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      autocomplete: 'both',
      value: {inputValue: '', focusedIndex: null, value: null},
      getLabelSelectionRange: function(inputValue, label) {
        inputValue = inputValue.toLowerCase();
        label = label.toLowerCase();

        if (inputValue === '' || inputValue === label) {
          return null;
        } else if (label.indexOf(inputValue) === -1) {
          return null;
        } else {
          return {start: inputValue.length, end: label.length};
        }
      },
      getLabelForValue: (value) => value,
      getOptionsForInput: (inputValue, callback) => callback([])
    };
  },

  getInitialState: function() {
    return {
      autocompleteValue: null,
      isOpen: false, 
      listId: 'rf-combobox-list-'+(++guid),
      optionIndex: null,
      options: []
    };
  },

  fetchListOptions: function(inputValue, callback) {
    this.props.getOptionsForInput(
      inputValue, 
      (options) => this.setState({options: options}, callback)
    );
  },

  handleButtonClick: function() {
    this.setState({isOpen: !this.state.isOpen});
  },

  handleRequestChange: function(inputValue) {
    this.setState({
      isOpen: ['list', 'both'].indexOf(this.props.autocomplete) !== -1, 
      optionIndex: null
    });

    this.props.onChange(assign({}, this.props.value, {inputValue}));
    
    this.fetchListOptions(inputValue, () => {
      this.state.options.length > 0 && this.setState({
        autocompleteValue: this.state.options[0]
      });
    });
  },

  handleRequestClose: function() {
    this.setState({isOpen: false});
  },

  handleRequestSelect: function(value, isFromOptions) {
    if (!isFromOptions && this.state.optionIndex != null) {
      return;
    }

    this.props.onChange({
      inputValue: this.props.getLabelForValue(value),
      value: value
    });

    this.setState({isOpen: false});
  },

  handleRequestFocus: function(optionIndex) {
    this.setState({optionIndex});
  },

  handleRequestFocusNext: function() {
    var currentIndex = this.state.optionIndex;
    var lastIndex = this.state.options.length - 1;

    this.handleRequestFocus(
      (currentIndex == null || currentIndex >= lastIndex)
        ? 0 : currentIndex + 1
    );
  },

  handleRequestFocusPrevious: function() {
    var currentIndex = this.state.optionIndex;
    var lastIndex = this.state.options.length - 1;

    this.handleRequestFocus(
      (currentIndex == null || currentIndex <= 0)
        ? lastIndex : currentIndex - 1
    );
  },

  renderPopup: function() {
    var className = 'rf-combobox-list';
    var content = <ComboboxListEmpty/>;

    if (this.state.isOpen) {
      className = joinClasses(className, 'rf-combobox-list--is-open');
    }

    if (this.state.options && this.state.options.length > 0) {
      content = (
        <ComboboxList
          aria-expanded={this.state.isOpen+''}
          getLabelForValue={this.props.getLabelForValue}
          inputValue={this.props.value.inputValue}
          listId={this.state.listId}
          onRequestClose={this.handleRequestClose}
          onRequestFocus={this.handleRequestFocus}
          onRequestFocusNext={this.handleRequestFocusNext}
          onRequestFocusPrevious={this.handleRequestFocusPrevious}
          onRequestSelect={this.handleRequestSelect}
          optionIndex={this.state.optionIndex}
          options={this.state.options}
          role="listbox"
        />
      );
    }

    return (
      <div className={className}>
        {content}
      </div>
    );
  },

  render: function() {
    var {value, className} = this.props;

    return (
      <div className={joinClasses('rf-combobox', className)}>
        <ComboboxInput
          autocomplete={this.props.autocomplete}
          autocompleteValue={this.state.autocompleteValue}
          getLabelSelectionRange={this.props.getLabelSelectionRange}
          getLabelForValue={this.props.getLabelForValue}
          inputValue={value.inputValue}
          listId={this.state.listId}
          onRequestChange={this.handleRequestChange}
          onRequestClose={this.handleRequestClose}
          onRequestFocus={this.handleRequestFocus}
          onRequestFocusNext={this.handleRequestFocusNext}
          onRequestFocusPrevious={this.handleRequestFocusPrevious}
          onRequestSelect={this.handleRequestSelect}
          optionIndex={this.state.optionIndex}
        />
        <span
          aria-hidden="true"
          className="rf-combobox-button"
          onClick={this.handleButtonClick}>
          ▾
        </span>
        {this.renderPopup()}
      </div>
    );
  }
});

module.exports = Combobox;

