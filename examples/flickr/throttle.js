function throttle(delay, fn){
  var context, timeout, result, args,
    cur, diff, prev = 0;
  function delayed(){
    prev = Date.now();
    timeout = null;
    result = fn.apply(context, args);
  }
  function throttled(){
    context = this;
    args = arguments;
    cur = Date.now();
    diff = delay - (cur - prev);
    if (diff <= 0) {
      clearTimeout(timeout);
      prev = cur;
      result = fn.apply(context, args);
    } else if (! timeout) {
      timeout = setTimeout(delayed, diff);
    }
    return result;
  }
  throttled.cancel = function(){
    clearTimeout(timeout);
  };
  return throttled;
}

module.exports = throttle;