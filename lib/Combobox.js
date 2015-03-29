var ComboboxButton = require('./ComboboxButton');
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
     * 
     *   - `inline` autocompletes the first matched value into the text box,
     *   - `list` displays a list of choices,
     *   - `both` displays both.
     *   
     * Default is `both`.
     * 
     * @type {string}
     */
    autocomplete: React.PropTypes.oneOf(['both', 'inline', 'list']),

    /**
     * Represents the current content value of the combobox:
     *
     *  - `inputValue` is the text that the user typed in the combobox.
     *    Defaults to ''.
     *  - `selectedIndex` is the autocomplete result ID selected in the list.
     *    Defaults to null when nothing is selected.
     *  - `value` is the selected value in the combobox.
     *    Defaults to null when nothing is selected.
     * 
     * @type {object}
     */
    value: React.PropTypes.shape({
      inputValue: React.PropTypes.string,
      selectedIndex: React.PropTypes.number,
      value: React.PropTypes.any
    }),

    /**
     * Handler fired whenever the `value` changes with the updated value object.
     * Arguments are an updated value object and a callback to be fired when
     * the relevant state setting process has been completed.
     * 
     * @type {function}
     */
    onChange: React.PropTypes.func.isRequired,

    /**
     * For a given autocomplete value, returns the text that should be shown
     * in the input textbox of the autocomplete. Default is the value coerced
     * to a string.
     * 
     * @type {function}
     */
    getLabelForValue: React.PropTypes.func,

    /**
     * For a given input string typed by the user, calls a callback when
     * new autocompletion results are available.
     * 
     * @type {function}
     */
    getValuesForInput: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      autocomplete: 'both',
      value: {inputValue: '', selectedIndex: null, value: null},
      getLabelForValue: (value) => value,
      getOptionsForInput: (inputValue, callback) => callback([])
    };
  },

  getInitialState: function() {
    return {
      isOpen: false, 
      listId: 'rf-combobox-list-'+(++guid),
      options: [],
      usingKeyboard: false
    };
  },

  fetchListOptions: function(inputValue) {
    this.props.getOptionsForInput(
      inputValue, 
      (options) => this.setState({options})
    );
  },

  clearSelection: function(cb) {
    this.props.onChange({
      inputValue: this.props.value.inputValue,
      selectedIndex: null,
      value: null
    }, cb);
  },

  handleRequestChange: function(inputValue) {
    this.clearSelection(() => {
      this.fetchListOptions(inputValue);
      this.props.onChange(assign({}, this.props.value, {inputValue}));
      this.setState({isOpen: true});
    });
  },

  handleRequestClose: function() {
    this.setState({isOpen: false});
  },

  handleRequestSelect: function() {
    var value = this.state.options[this.props.value.selectedIndex];

    this.props.onChange({
      inputValue: this.props.getLabelForValue(value),
      selectedIndex: null,
      value: value
    });

    this.setState({isOpen: false});
  },

  handleRequestNext: function() {
    var {selectedIndex} = this.props.value;
    var lastIndex = this.state.options.length - 1;
    var nextIndex = (selectedIndex == null || selectedIndex >= lastIndex)
                  ? 0 : selectedIndex + 1;

    this.props.onChange(assign({}, this.props.value, {
      selectedIndex: nextIndex,
      value: this.state.options[nextIndex]
    }));
  },

  handleRequestPrevious: function() {
    var {selectedIndex} = this.props.value;
    var lastIndex = this.state.options.length - 1;
    var previousIndex = (selectedIndex == null || selectedIndex <= 0)
                      ? lastIndex : selectedIndex - 1

    this.props.onChange(assign({}, this.props.value, {
      selectedIndex: previousIndex,
      value: this.state.options[previousIndex]
    }));
  },

  renderPopup: function() {
    var className = 'rf-combobox-list';
    var content = null;

    if (this.state.isOpen) {
      className = joinClasses(className, 'rf-combobox-list--is-open');
    }

    if (this.state.options && this.state.options.length > 0) {
      content = (
        <ComboboxList
          id={this.state.listId}
          ref="list"
          aria-expanded={this.state.isOpen+''}
          role="listbox"
          selectedIndex={this.props.value.selectedIndex}
          options={this.state.options}
          getLabelForValue={this.props.getLabelForValue}
          onRequestClose={this.handleRequestClose}
          onRequestSelect={this.handleRequestSelect}
          onRequestNext={this.handleRequestNext}
          onRequestPrevious={this.handleRequestPrevious}
        />
      );
    } else {
      content = <ComboboxListEmpty/>;
    }

    return (
      <div className={className}>
        {content}
      </div>
    );
  },

  render: function() {
    var {value, className} = this.props;

    var selectedLabel = value.selectedIndex != null 
      ? this.props.getLabelForValue(this.state.options[value.selectedIndex])
      : null;

    return (
      <div className={joinClasses('rf-combobox', className)}>
        <ComboboxInput
          listId={this.state.listId}
          value={value.inputValue}
          selectedLabel={selectedLabel}
          selectedIndex={value.selectedIndex}
          onRequestChange={this.handleRequestChange}
          onRequestClose={this.handleRequestClose}
          onRequestSelect={this.handleRequestSelect}
          onRequestNext={this.handleRequestNext}
          onRequestPrevious={this.handleRequestPrevious}
        />
        <ComboboxButton onClick={this.handleButtonClick}/>
        {this.renderPopup()}
      </div>
    );
  }
});

module.exports = Combobox;

