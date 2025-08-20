// Q1. What's the difference between function declaration and expression in term of hoisting?

// functon declaration is hoisted
example()
function example() {
}

// function expression is not hoisted
let fnc = function () {

}