var React = require('react');

var ComboboxEmpty = React.createClass({

  render: function() {
    return (
      <div className="ComboboxEmpty" aria-live="polite">
        No matches.
      </div>
    );
  }

});

module.exports = ComboboxEmpty;
