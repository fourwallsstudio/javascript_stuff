const thing = (strings, aFn, bFn) => {
  console.log(strings);
  console.log('aFn', aFn());
  console.log('bFn', bFn());
}

const a = () => 'a';
const b = () => 'b';

thing`check this out: ${a} + ${b} end`;
