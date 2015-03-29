var React = require('react');
var ComboboxListOption = require('./ComboboxListOption');
var ComboboxKeyDownMixin = require('./ComboboxKeyDownMixin');

var getActiveDescendantId = require('./getActiveDescendantId');

var ComboboxList = React.createClass({

  mixins: [ComboboxKeyDownMixin],

  propTypes: {
    getLabelForValue: React.PropTypes.func.isRequired,
    inputValue: React.PropTypes.string,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestFocus: React.PropTypes.func.isRequired,
    onRequestFocusNext: React.PropTypes.func.isRequired,
    onRequestFocusPrevious: React.PropTypes.func.isRequired,
    onRequestSelect: React.PropTypes.func.isRequired,
    optionIndex: React.PropTypes.number,
    options: React.PropTypes.array.isRequired,
    popupId: React.PropTypes.string.isRequired
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.optionIndex != prevProps.optionIndex &&
        this.props.optionIndex != null) {
      this.refs[this.props.optionIndex].getDOMNode().focus();
    }
  },

  requestSelect: function() {
    this.props.onRequestSelect(
      this.props.options[this.props.optionIndex], 
      true
    )
  },

  handleFocus: function() {
    clearTimeout(this.blurTimer);
  },

  handleBlur: function() {
    this.blurTimer = setTimeout(() => this.props.onRequestClose(), 0);
  },

  handleKeyDown: function() {
    this.handleStandardKeyDown(event, {onRequestSelect: this.requestSelect});
  },

  render: function() {
    return (
      <div id={this.props.popupId} className="ComboboxList">
        {this.props.options.map((option, index) => {
          var label = this.props.getLabelForValue(option);

          return (
            <ComboboxListOption 
              key={index}
              id={getActiveDescendantId(this.props.popupId, index)}
              isSelected={this.props.inputValue === label}
              onBlur={this.handleBlur}
              onClick={this.requestSelect}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyDown}
              onMouseEnter={() => this.props.onRequestFocus(index)}
              ref={index}>
              {label}
            </ComboboxListOption>
          );
        })}
      </div>
    );
  }

});

module.exports = ComboboxList;