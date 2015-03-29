var React = require('react');

var joinClasses = require('react/lib/joinClasses');

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

    return (
      <div
        tabIndex="-1"
        role="option"
        className={joinClasses(
          'ComboboxListOption', 
          this.props.isSelected && 'ComboboxListOption--isSelected',
          className
        )}
        {...otherProps}>
        {children}
      </div>
    );
  }

});

module.exports = ComboboxListOption;
