/**
 * 1. Object Property Access
 * Tasks:
    Access and print the student's name
    Access and print the first subject
    Change the age to 21
    Add a new property "city" with value "New York"
 */

// const student = {
//     name: "Alice",
//     age: 20,
//     grade: "A",
//     subjects: ["Math", "Science", "English"]
// };
// console.log(student.name)
// console.log(student.subjects[0])
// student.age = 21
// console.log(student)
// student.city = "New York"
// console.log(student)

/**
 * 2. Count Object Properties
 * Expected Output: 5 (total number of properties)
 * Use a for...in loop to count properties
 */
// const car = {
//     brand: "Toyota",
//     model: "Camry",
//     year: 2020,
//     color: "blue",
//     mileage: 45000
// };
// let output = []
// for (let key in car) {
//     output.push(key)
// }
// console.log(output.length)

/**
 * 3. Object to Array Conversion
 * Expected Output: [85, 92, 78, 88] (array of values)
 * Extract all values into an array using loops
 */
const scores = {
  math: 85,
  english: 92,
  science: 78,
  history: 88,
};
let output = [];
for (let key in scores) {
  output.push(scores[key]);
}
console.log(output);
