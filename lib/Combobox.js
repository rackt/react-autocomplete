var ComboboxList = require('./ComboboxList');
var ComboboxEmpty = require('./ComboboxEmpty');
var ComboboxFetching = require('./ComboboxFetching');
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
    getLabelForOption: React.PropTypes.func,

    /**
     * For a given autocomplete value, returns the contents that should be
     * rendered in the popup list. Default is the value coerced to a string.
     * @type {function}
     */
    getRenderedOption: React.PropTypes.func,

    /**
     * For a given input string typed by the user, calls a callback when
     * new autocompletion results are available.
     * @type {function}
     */
    getValuesForInput: React.PropTypes.func,

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
     * Handler fired whenever the user selects a given option.
     * @type {function}
     */
    onSelect: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      autocomplete: 'both',
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
      getLabelForOption: (value) => ''+value,
      getRenderedOption: (value) => ''+value,
      getOptionsForInput: (inputValue, callback) => callback([]),
      value: {inputValue: '', value: null},
      onSelect: () => {}
    };
  },

  getInitialState: function() {
    return {
      autocompleteOption: null,
      isOpen: false,
      isFetching: false,
      optionIndex: null,
      options: [],
      popupId: 'Combobox-list-'+(++guid)
    };
  },

  fetchListOptions: function(inputValue, callback) {
    this.setState({isFetching: true});
    this.props.getOptionsForInput(
      inputValue, 
      (options) => this.setState({
        isFetching: false,
        options: options
      }, callback)
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
        autocompleteOption: this.state.options[0]
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

    this.props.onSelect(value);
    this.props.onChange({
      inputValue: this.props.getLabelForOption(value),
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
    var content = null;

    if (this.state.isFetching) {
      content = <ComboboxFetching/>;
    } else if (this.state.options && this.state.options.length > 0) {
      content = (
        <ComboboxList
          aria-expanded={this.state.isOpen+''}
          getLabelForOption={this.props.getLabelForOption}
          getRenderedOption={this.props.getRenderedOption}
          inputValue={this.props.value.inputValue}
          onRequestClose={this.handleRequestClose}
          onRequestFocus={this.handleRequestFocus}
          onRequestFocusNext={this.handleRequestFocusNext}
          onRequestFocusPrevious={this.handleRequestFocusPrevious}
          onRequestSelect={this.handleRequestSelect}
          optionIndex={this.state.optionIndex}
          options={this.state.options}
          popupId={this.state.popupId}
          role="listbox"
        />
      );
    } else {
      content = <ComboboxEmpty/>;
    }

    return (
      <div className={joinClasses(
        'Combobox-popup',
        this.state.isOpen && 'Combobox-popup--is-open'
      )}>
        {content}
      </div>
    );
  },

  render: function() {
    var {value, className} = this.props;

    return (
      <div className={joinClasses('Combobox', className)}>
        <ComboboxInput
          autocomplete={this.props.autocomplete}
          autocompleteOption={this.state.autocompleteOption}
          getLabelForOption={this.props.getLabelForOption}
          getLabelSelectionRange={this.props.getLabelSelectionRange}
          inputValue={value.inputValue}
          onRequestChange={this.handleRequestChange}
          onRequestClose={this.handleRequestClose}
          onRequestFocus={this.handleRequestFocus}
          onRequestFocusNext={this.handleRequestFocusNext}
          onRequestFocusPrevious={this.handleRequestFocusPrevious}
          onRequestSelect={this.handleRequestSelect}
          optionIndex={this.state.optionIndex}
          popupId={this.state.popupId}
        />
        <span
          aria-hidden="true"
          className="Combobox-button"
          onClick={this.handleButtonClick}>
          ▾
        </span>
        {this.renderPopup()}
      </div>
    );
  }
});

module.exports = Combobox;

