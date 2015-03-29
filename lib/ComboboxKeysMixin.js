var COMBOBOX_KEYS = {
  13: 'onRequestSelect',
  27: 'onRequestClose',
  38: 'onRequestPrevious',
  40: 'onRequestNext'
};

var ComboboxKeysMixin = {
  handleKeyDownIfPossible: function(event) {
    var handlerName = COMBOBOX_KEYS[event.keyCode];
    if (handlerName) {
      event.preventDefault();
      this.props[handlerName]();
    }
  }
};

module.exports = ComboboxKeysMixin;