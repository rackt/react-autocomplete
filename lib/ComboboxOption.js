var React = require('react');

var joinClasses = require('react/lib/joinClasses');

require('./ComboboxOption.css');

var ComboboxOption = React.createClass({

  propTypes: {
    /**
     * The value that will be sent to the `onSelect` handler of the parent 
     * Combobox when this option is selected.
     * @type {any}
    */
    value: React.PropTypes.any.isRequired,

    /**
     * The value that will be put into the input element of the parent Combobox 
     * when this option is selected. Defaults to the ComboboxOptions's children, 
     * coerced to a string.
     * @type {string}
     */
    label: React.PropTypes.string,

    /**
     * Whether or not this combobox option is currently visible selected.
     * @type {boolean}
     * @internal
     */
    isSelected: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      isSelected: false,
      label: null
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

module.exports = ComboboxOption;
