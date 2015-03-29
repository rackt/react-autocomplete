var React = require('react');
var ComboboxListOption = require('./ComboboxListOption');
var ComboboxKeysMixin = require('./ComboboxKeysMixin');

var getActiveDescendantId = require('./getActiveDescendantId');

var ComboboxList = React.createClass({

  mixins: [ComboboxKeysMixin],

  propTypes: {
    listId: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    focusedIndex: React.PropTypes.number,
    getLabelForValue: React.PropTypes.func.isRequired,
    onRequestSelect: React.PropTypes.func.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestFocus: React.PropTypes.func.isRequired,
    onRequestFocusNext: React.PropTypes.func.isRequired,
    onRequestFocusPrevious: React.PropTypes.func.isRequired
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.focusedIndex != prevProps.focusedIndex &&
        this.props.focusedIndex != null) {
      this.refs[this.props.focusedIndex].getDOMNode().focus();
    }
  },

  handleFocus: function() {
    clearTimeout(this.blurTimer);
  },

  handleBlur: function() {
    this.blurTimer = setTimeout(this.props.onRequestClose, 0);
  },

  handleMouseEnter: function(index) {
    this.props.onRequestFocus(index);
  },

  handleClick: function() {
    this.props.onRequestSelect();
  },

  render: function() {
    return (
      <div id={this.props.listId} className="ComboboxList">
        {this.props.options.map((option, index) => {
          return (
            <ComboboxListOption 
              key={index}
              id={getActiveDescendantId(this.props.listId, index)}
              ref={index}
              isSelected={index === this.props.focusedIndex}
              onKeyDown={this.handleKeyDownIfPossible}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onMouseEnter={this.handleMouseEnter.bind(this, index)}
              onClick={this.handleClick}>
              {this.props.getLabelForValue(option)}
            </ComboboxListOption>
          );
        })}
      </div>
    );
  }

});

module.exports = ComboboxList;