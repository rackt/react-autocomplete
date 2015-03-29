var React = require('react');

require('./ComboboxListEmpty.css');

var ComboboxListEmpty = React.createClass({

  render: function() {
    return (
      <div className="ComboboxListEmpty" aria-live="polite">No matches.</div>
    );
  }

});

module.exports = ComboboxListEmpty;