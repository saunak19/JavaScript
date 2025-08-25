// scope hai ke aap apne created variables and functions kaha tak use kar sakte ho
// scope - functional scope, global scope and block scope

/**
 * function scope - function ke ander hi use ho sakti hai
 * global scope - poore code mein kahi bhi use ho sakti hai
 * block scope - {} curly braces mein hi use ho sakti hai
 */

// execution context

/**
 * js - lexical scoping -> ki aap kaha par physically available ho ye poori tareeke se depend krta hai
 * ki aap kya access kro paaoge
 */
// dynamic scoping

/**
 * closures -> hote hai functions jo ki kisi parent function ke ander ho aur ander waala function
 * return ho raha ho, and returning function use kare, parent function ka koi variable
 *
 * function ke khatam hone pe aapka function and uske variables khatam ho jaate hai
 * par jab bhi closure banta hai to aapka function aur uske variable ka ek backlink bnaya jaata hau aur
 * uska naam hota haio [[environment]]
 */

// function abc() {
//   let a = 12;
//   return function () {
//     console.log(a);
//   };
// }
// abc();
import { testExportFnc } from "./module.js";
testExportFnc();

function countForMe() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
let fnc = countForMe();
fnc();
fnc();
