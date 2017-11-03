const p1 = () => new Promise((res, rej) => setTimeout(() => res('result 1'), 1500))
const p2 = () => new Promise((res, rej) => setTimeout(() => res('result 2'), 1000))
const p3 = () => new Promise((res, rej) => setTimeout(() => res('result 3'), 500))

const promises = [p1, p2, p3];

const curry = (len) => {
  const results = [];

  return function _curry(el) {
    results.push(el);

    if (results.length === len) {
      return results;
    } else {
      return _curry
    }
  }
}

const myPromiseAll = (promises) => new Promise((resolve, reject) => {
  const len = promises.length;
  let results = curry(len);

  for (let i = 0; i < len; i++) {
    promises[i]().then((result) => {
      results = results([result, i]);

      if (typeof results !== 'function') {
        results = results.sort((a,b) => a[1] - b[1]).map(r => r[0]);
        resolve(results)
      };
    })
  }
})

myPromiseAll(promises).then(res => console.log(res))
