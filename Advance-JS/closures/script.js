function x() {
  const a = 10;
  function child() {
    a++;
    console.log(a);
  }
  return child;
}
let y = x();
// console.dir(y);
