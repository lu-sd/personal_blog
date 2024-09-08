---
title: "What is [] used for in js?"
publishedAt: 2024-09-05
description: "main functionalities"
slug: "59-jsBasic"
isPublish: true
---

In JavaScript, [] is used to denote an array or to perform operations related to arrays or object property access. Here are the main functionalities:

### Array Literal Notation,Accessing Array Elements and Setting Array Elements

```js
let arr = []; // Creates an empty array
let numbers = [1, 2, 3, 4, 5]; // Creates an array with the elements 1, 2, 3, 4, 5
console.log(numbers[0]); // Outputs 1 (arrays are 0-indexed)
numbers[2] = 10; // Changes the value at index 2 (third element)
```

### Array Destructuring

```js
let numbers = [1, 2, 3];
let [a, b, c] = numbers; // Assigns 1 to a, 2 to b, and 3 to c
console.log(a, b, c); // Outputs 1 2 3
```

### Object Literal

When using [] in an object literal, it tells JavaScript to evaluate the expression inside the brackets and use the result as the property key. This allows you to dynamically define property keys within an object literal based on an expression.

```js
// Basic Computed Property Name
let propName = "dynamicKey";
let obj = {
  [propName]: "value",
};
console.log(obj); // { dynamicKey: "value" }

//Using an Expression
let obj = {
  ["key" + 1]: "value1",
  ["key" + 2]: "value2",
};
console.log(obj); // { key1: "value1", key2: "value2" }

// Using Functions or Operations
function getKey(index) {
  return `key${index}`;
}

let obj = {
  [getKey(1)]: "firstValue",
  [getKey(2)]: "secondValue",
};

console.log(obj); // { key1: "firstValue", key2: "secondValue" }
```

### Accessing Object Properties,Adding Properties to an Object

You can use [] to access properties of an object, especially if the property name is dynamic or not a valid identifier (e.g., has spaces).

```js
let obj = { name: "John", age: 30 };
console.log(obj["name"]); // Outputs "John" , also you can use obj.name

let property = "name";
console.log(obj[property]); // Outputs "John"

let obj = {};
obj["newProp"] = "newValue"; // Adds a new property 'newProp' with value 'newValue'
console.log(obj.newProp); // Outputs "newValue"
```
