// function greetings(greting){
//     console.log(greting)
// }

// setTimeout(function(){
// greetings("Good Morning");
// greetings("Good afternoon");

// },5000)

/**
 * Jab arguments kai saare ho to humein utne hi parameter banaane padene, issey bachne ke liye, hum rest ka use karte hai ... agar ... function ke
 * parameter space mein lage to wo rest operator hai and agar wo arrays and objects mein lage to wo spread operator
 */

// function example(...val){
// console.log(val)
// }
// example(1,2,3,4,5)

// return matlab jaha se aaye ho wahi daal denge

// first class function -> functions ko values ki tarah treat kar sakte hai

// function abcd(val) {
//     val()
// }
// abcd(function () {
//     console.log('first class function')
// })

// high order function -> hof wo function hota hai jo ki return kare function 

/**
 * pure vs impure functions
 * -> aisa function jon ki baahar ki value ko naa badle wo hai pure function
 * -> aisa function jo baahar ki value ko badal de wo hai impure functions
 */

/**
 * closures -> ek function jo return kare ek aur function aur return hone waala function humesha use karega parent function ka koi variable
 */

// function getScore(...score) {
//     let total = 0;
//     score.forEach(function (val) {
//         total += val
//     })
//     return total
// }

// console.log(getScore(10, 20, 40, 50, 5))