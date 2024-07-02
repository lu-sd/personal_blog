---
title: "JS interview questions"
publishedAt: 2024-06-27
description: "you are your own worst critic"
slug: "49-jsInterQ"
isPublish: true
---

### What is a Closure?

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

### What is a Promise?

A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation.

Stateful: A Promise is in one of three states:

- Pending: Initial state, neither fulfilled nor rejected.
- Fulfilled: The operation completed successfully.
- Rejected: The operation failed.

Immutable: Once a Promise is fulfilled or rejected, its state cannot change. It becomes immutable, permanently holding its result. This makes Promises reliable in asynchronous flow control.

#### Creat a custom promise

```js
const demoPromise = new Promise((resolve) => {
  // Do some sort of asynchronous work, and then
  // call `resolve()` to fulfill the Promise.
});
demoPromise.then(() => {
  // This callback will be called when
  // the Promise is fulfilled!
});
```

```js
function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
const timeoutPromise = wait(1000);
timeoutPromise.then(() => {
  console.log("1 second later!");
});
```

- We have a new utility function, wait. This function takes a single parameter, duration. Our goal is to use this function as a sort of sleep function, but one that works fully asynchronously.
- Inside wait, we’re creating and returning a new Promise. Promises don’t do anything on their own; we need to call the resolve function when the async work is completed.
- Inside the Promise, we start a new timer with setTimeout. We’re feeding it the resolve function we got from the Promise, as well as the duration supplied by the user.
- When the timer elapses, it will invoke the supplied callback. This creates a sort of chain reaction: setTimeout calls resolve, which signals that the Promise is fulfilled, which causes the .then() callback to be fired as well.

### What is TypeScript?

TypeScript is a superset of JavaScript, developed and maintained by Microsoft. It adds static typing to JavaScript, which is a dynamically typed language. Static typing helps developers catch errors early in the development process, improving code quality and maintainability.

Interfaces: Interfaces allow you to specify abstract contracts that objects and functions must satisfy.

```js
interface User {
  id: number;
  name: string;
}

type GetUser = (userId: number) => User;

const getUser: GetUser = (userId) => {
  // Fetch user data from a database or API
  return {
    id: userId,
    name: "John Doe",
  };
};
```

### what is hoisting?

Hoisting is the default behaviour of javascript where all the variable and function declarations are moved on top.

### what is DOM?

The Document Object Model (DOM) is a programming interface for web documents.The DOM represents the document as a tree of nodes, where each node corresponds to a part of the document. When the browser tries to render an HTML document, it creates an object based on the HTML document called DOM. Using this DOM, we can manipulate or change various elements inside the HTML document.

### what is react virtual DOM

The React Virtual DOM is an in-memory representation of the real DOM elements generated by React components. It acts as a middle layer between the actual DOM and React’s render function.

React components describe how the UI should look, and React uses the virtual DOM to efficiently update the real DOM.

The virtual DOM allows React to batch updates and minimize direct manipulation of the real DOM, leading to better performance. React calculates the difference between the current and previous states of the virtual DOM and updates only the changed parts in the real DOM.

#### Key Differences :

- Direct vs. Abstracted Manipulation:

DOM: Developers manipulate the DOM directly.
Virtual DOM: React abstracts the manipulation process, updating the real DOM in an optimized way based on changes in the virtual DOM.

- Performance Optimization:

DOM: Direct manipulation can lead to performance issues, especially with frequent updates.
Virtual DOM: React minimizes performance issues by batching updates and only applying necessary changes to the real DOM.

- Rendering Approach:

DOM: Imperative approach, where developers describe how to change the UI.
Virtual DOM: Declarative approach, where developers describe what the UI should look like, and React handles the changes.
