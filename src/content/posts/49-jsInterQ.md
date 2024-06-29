---
title: "JS interview questions"
publishedAt: 2024-06-27
description: "you are your own worst critic"
slug: "49-jsInterQ"
isPublish: true
---

### 1. What is a Closure?

Closure is basically defining a function inside of some parent scope, and the function can access the things that are defined or inside it's parent scope.

A closure gives you access to an outer function’s scope from an inner function. When functions are nested, the inner functions have access to the variables declared in the outer function scope, even after the outer function has returned.

A closure has three scope chains:

It has access to its own scope (variables defined between its curly braces {}).
It has access to the outer function's variables.
It has access to the global variables.

Common use cases for closures include:

- Data Encapsulation and Privacy

```js
const createCounter = () => {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
};
```

- Currying and partial applications

```js
// A curried function takes multiple arguments one at a time.
const add = (a) => (b) => a + b;

// A partial application is a function that has been applied to some,
// but not yet all of its arguments.
const increment = add(1); // partial application

increment(2); // 3
```

- Sharing data with event handlers and callbacks

```js
function fetchData(url) {
  let cache = {};

  return function () {
    if (cache[url]) {
      console.log("Returning cached data");
      return Promise.resolve(cache[url]);
    } else {
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          cache[url] = data;
          return data;
        });
    }
  };
}

const fetchUserData = fetchData("https://api.example.com/user");

fetchUserData().then((data) => console.log(data)); // Fetches from network
fetchUserData().then((data) => console.log(data)); // Returns cached data
```

Closure variables are live references to the outer-scoped variable, not a copy. This means that if you change the outer-scoped variable, the change will be reflected in the closure variable, and vice versa, which means that other functions declared in the same outer function will have access to the changes.

```js
function outerFunction() {
  let counter = 0;

  function innerFunction() {
    counter++;
    console.log(counter);
  }

  return innerFunction;
}

const increment = outerFunction();

increment(); // 1
increment(); // 2
increment(); // 3
```

In this example:

- outerFunction declares a variable counter and defines an innerFunction that increments and logs counter.

- outerFunction returns the innerFunction, creating a closure that captures the reference to counter.

* Each time increment is called, it references the same counter variable from outerFunction's scope, incrementing its value.

If closures captured copies of the variables, each call to increment would work with a different counter value, and the output would always be 1:

```js
function outerFunction() {
  let counter = 0;

  function innerFunction() {
    let localCounter = counter; // Hypothetical copy of `counter`
    localCounter++;
    console.log(localCounter);
  }

  return innerFunction;
}

const increment = outerFunction();

increment(); // Hypothetical output: 1
increment(); // Hypothetical output: 1
increment(); // Hypothetical output: 1
```
