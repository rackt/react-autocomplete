var React = require('react');
var ComboboxListOption = require('./ComboboxListOption');
var ComboboxKeysMixin = require('./ComboboxKeysMixin');

var getActiveDescendantId = require('./getActiveDescendantId');

var ComboboxList = React.createClass({

  mixins: [ComboboxKeysMixin],

  propTypes: {
    listId: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number.isRequired,
    getLabelForValue: React.PropTypes.func.isRequired,
    onRequestSelect: React.PropTypes.func.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onRequestNext: React.PropTypes.func.isRequired,
    onRequestPrevious: React.PropTypes.func.isRequired
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.selectedIndex != prevProps.selectedIndex &&
        this.props.selectedIndex != null) {
      this.refs[this.props.selectedIndex].getDOMNode().focus();
    }
  },

  handleOptionFocus: function() {
    clearTimeout(this.blurTimer);
  },

  handleOptionBlur: function() {
    this.blurTimer = setTimeout(this.props.onRequestClose, 0);
  },

  render: function() {
    return (
      <div className="ComboboxList">
        {this.props.options.map((option, index) => {
          return (
            <ComboboxListOption 
              key={index}
              id={getActiveDescendantId(this.props.listId, index)}
              ref={index}
              isSelected={index === this.props.selectedIndex}
              onKeyDown={this.handleKeyDownIfPossible}
              onFocus={this.handleOptionFocus}
              onBlur={this.handleOptionBlur}>
              {this.props.getLabelForValue(option)}
            </ComboboxListOption>
          );
        })}
      </div>
    );
  }

});

module.exports = ComboboxList;