// 1. Sum of Array Elements
// Array: [5, 12, 8, 3, 17, 21]
// Expected Output: 66

// let arr = [5, 12, 8, 3, 17, 21];
// let totalSum = 0
// for (let i = 0; i < arr.length; i++) {
//     totalSum += arr[i]
// }
// console.log(totalSum)

// 2. Find Maximum Value
// Array: [23, 67, 12, 89, 45, 34, 91, 56]
// Expected Output: 91
// function maxNumer(...val) {
//     let maxNum = val[0];
//     for (let i = 0; i < val.length; i++) {
//         if (maxNum < val[i]) {
//             maxNum = val[i]
//         }
//     }
//     console.log(maxNum)
// }
// maxNumer(23, 67, 12, 89, 45, 34, 91, 56)

// 3. Count Even Numbers
// Array: [14, 7, 22, 9, 18, 31, 46, 55, 12, 73]
// Expected Output: 5 (even numbers: 14, 22, 18, 46, 12)

// function countEventNumber(...num) {
//     let countEvent = []
//     for (let i = 0; i < num.length; i++) {
//         if (num[i] % 2 === 0) {
//             countEvent.push(num[i])
//         }
//     }
//     return countEvent.length
// }
// console.log(countEventNumber(14, 7, 22, 9, 18, 31, 46, 55, 12, 73))

// 4. Reverse an Array
// Array: ["apple", "banana", "cherry", "date", "elderberry"]
// Expected Output: ["elderberry", "date", "cherry", "banana", "apple"]

// function reverseElements(...val) {
//     let i = 0;
//     let j = val.length - 1;
//     while (i != j) {
//         // [val[i], val[j]] = [val[j], val[i]];
//         let temp = val[i];
//         val[i] = val[j]
//         val[j] = temp
//         i++;
//         j++;
//     }
//     return val
// }
// // reverseElements("apple", "banana", "cherry", "date", "elderberry")
// reverseElements(14, 7, 22, 9, 18, 31, 46, 55, 12, 73)
// console.log(reverseElements())

// 5. Find All Indices of a Value
// Array: [3, 7, 3, 9, 3, 12, 7, 3]
// Target Value: 3
// Expected Output: [0, 2, 4, 7]

// function findAllInices(...num) {
//     let target = 3;
//     let output = []
//     for (let i = 0; i < num.length; i++) {
//         if (num[i] === target) {
//             output.push(i)
//         }
//     }
//     return output;
// }
// console.log(findAllInices(3, 7, 3, 9, 3, 12, 7, 3))

// 6. Remove Duplicates
// Array: [1, 3, 2, 3, 4, 2, 5, 1, 6]
// Expected Output: [1, 3, 2, 4, 5, 6] (order of first occurrence preserved)

// function removeDuplicates(...num) {
//     let unique = [];
//     for (let i = 0; i < num.length; i++) {
//         if (!unique.includes(num[i])) {
//             unique.push(num[i]);
//         }
//     }
//     console.log(unique);
// }
// removeDuplicates(1, 3, 2, 3, 4, 2, 5, 1, 6);

// 7. Array Intersection
// Array 1: [1, 4, 7, 9, 12, 15]
// Array 2: [3, 7, 9, 11, 12, 18]
// Expected Output: [7, 9, 12]

// let arr1 = [1, 4, 7, 9, 12, 15];
// let arr2 = [3, 7, 9, 11, 12, 18];
// let margedArr = arr1.concat(arr2);
// let output = []
// for (let i = 0; i < margedArr.length; i++) {
//     for (let j = 1; j < i; j++) {
//         if (margedArr[i] < margedArr[j]) {
//             [margedArr[i], margedArr[j]] = [margedArr[j], margedArr[i]]
//         }
//     }
// }
// let i = 0;
// let j = 1;
// for (let k = 0; k < margedArr.length; k++) {
//     if (margedArr[i] === margedArr[j]) {
//         output.push(margedArr[k])
//     }
//     i++;
//     j++
// }
// console.log(output)

// 8. Move Zeros to End
// Array: [0, 5, 0, 3, 8, 0, 12, 7]
// Expected Output: [5, 3, 8, 12, 7, 0, 0, 0]
// let arr = [0, 5, 0, 3, 8, 0, 12, 7];
// let i = 0;
// let j = 0;
// while (i < arr.length) {
//     if (arr[i] === 0) {
//         [arr[j], arr[i]] = [arr[i], arr[j]];
//         j++
//     }
//     i++;
// }

// console.log(arr)

// 09. Sliding Window Maximum
// Array: [1, 3, 2, 5, 8, 4, 7, 6]
// Window Size: 3
// Expected Output: [3, 5, 8, 8, 8, 7]

// function slidingWindowMax(nums, k) {
//     let result = [];
//     for (let i = 0; i <= nums.length - k; i++) {
//         let window = nums.slice(i, i + k);
//         result.push(Math.max(...window));
//     }
//     return result;
// }

// console.log(slidingWindowMax([1, 3, 2, 5, 8, 4, 7, 6], 3));

//node js

