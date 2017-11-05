const curry = (len) => {
  const results = []

  return function _curry(el) {
    results.push(el);

    if (results.length === len) {
      return results;
    } else {
      return _curry
    }
  }
}
