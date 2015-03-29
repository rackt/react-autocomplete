var React = require('react');

var joinClasses = require('react/lib/joinClasses');

require('./ComboboxListOption.css');

var ComboboxListOption = React.createClass({

  propTypes: {
    /**
     * Whether or not this combobox option is currently visible selected.
     * @type {boolean}
     */
    isSelected: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      isSelected: false,
    };
  },

  getClassName: function() {
    var className = 'rf-combobox-option';
    if (this.props.isSelected) {
      className = joinClasses(className, 'rf-combobox-option--isSelected');
    }
    return className;
  },

  render: function() {
    var {className, children, ...otherProps} = this.props;

    return (
      <div
        tabIndex="-1"
        role="option"
        className={joinClasses(this.getClassName(), className)}
        {...otherProps}>
        {children}
      </div>
    );
  }

});

module.exports = ComboboxListOption;
