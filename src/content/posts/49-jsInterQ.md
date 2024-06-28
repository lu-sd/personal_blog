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

- Data privacy

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

Closure variables are live references to the outer-scoped variable, not a copy. This means that if you change the outer-scoped variable, the change will be reflected in the closure variable, and vice versa, which means that other functions declared in the same outer function will have access to the changes.
