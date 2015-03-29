var React = require('react/addons');

var joinClasses = require('react/lib/joinClasses');
var cx = React.addons.classSet;

require('./ComboboxListOption.css');

var ComboboxListOption = React.createClass({

  propTypes: {
    isSelected: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      isSelected: false,
    };
  },

  render: function() {
    var {className, children, ...otherProps} = this.props;
    var classes = {
      'rf-combobox-option': true,
      'rf-combobox-option--isSelected': this.props.isSelected
    };

    return (
      <div
        tabIndex="-1"
        role="option"
        className={joinClasses(cx(classes), className)}
        {...otherProps}>
        {children}
      </div>
    );
  }

});

module.exports = ComboboxListOption;
