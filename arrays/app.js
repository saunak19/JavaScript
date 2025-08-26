/**
 * What is array ?
 * -> array is collection of values
 */

// let arr = [];
// for (let i = 0; i < 10; i++) {
//   arr.push(i ** 2);
// }
// arr[15] = 100;
// console.log(arr);

let users = [
  ["admin shiv", "test@test.com", "Ahir@9890", "6355061658", "55", "male"],
  ["Saunak Ahir", "ahishiv@gmail.com", "Ahir@9890", "6355061658", "22", "male"],
];
let minutes = 1;
// if (minutes >= 58 || minutes == 59) {
//   minutes = 0;
// }
minutes = minutes == 58 ? 3 : minutes == 59 ? 2 : minutes + 2;
// console.log(minutes);

async function hashSHA256(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPassword(inputPassword) {
  const storedHash = localStorage.getItem("userPassword");
  const inputHash = await hashSHA256(inputPassword);
  return storedHash === inputHash;
}

document.getElementById("submitUpdate").addEventListener("click");
