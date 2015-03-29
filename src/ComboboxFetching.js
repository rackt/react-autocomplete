var React = require('react');

var ComboboxFetching = React.createClass({

  render: function() {
    return (
      <div className="ComboboxFetching" aria-live="polite">
        Loading...
      </div>
    );
  }

});

module.exports = ComboboxFetching;
