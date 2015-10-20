function createFunctionWithTimeout(callback, opt_timeout) {
  var called = false;
  function execCallback() {
    if (!called) { called = true; callback(); }
  }
  setTimeout(execCallback, opt_timeout || 1000);
  return execCallback;
}
