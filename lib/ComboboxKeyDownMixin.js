const KEYDOWN_HANDLERS = {
  13: 'onRequestSelect',
  27: 'onRequestClose',
  38: 'onRequestFocusPrevious',
  40: 'onRequestFocusNext'
};

var ComboboxKeyMixin = {
  handleStandardKeyDown: function(event, overrides={}) {
    var handlerName = KEYDOWN_HANDLERS[event.keyCode];
    if (!handlerName) {
      return;
    }

    event.preventDefault();

    if (overrides[handlerName]) {
      overrides[handlerName]();
    } else {
      this.props[handlerName]();
    } 
  }
};

module.exports = ComboboxKeyMixin;
