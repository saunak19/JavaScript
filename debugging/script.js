// function a() {
//   const x = 5;
//   console.log(origin);
//   function child() {
//     const z = 7;
//     console.log(x);
//     function grandChild() {
//       const q = 4;
//       console.log(x, z, q);
//     }
//     grandChild();
//   }
//   child();
// }
// function b() {
//   const x = 5;
//   console.log(origin);
// }
// a();
// b();

function recursive() {
  console.log("Hello");
  recursive();
}
// recursive();
