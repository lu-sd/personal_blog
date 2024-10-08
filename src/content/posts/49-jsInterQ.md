---
title: "JS and React interview questions"
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

The DOM (Document Object Model) is like a tree structure that represents all the content and elements on a webpage. It helps the browser understand and display the page, and it allows JavaScript to interact with the page—such as changing text, updating styles, or handling user input—while the page is running.

In simple terms, the DOM is a bridge between the webpage's structure (HTML) and how you can control or update it using JavaScript.

### what is react virtual DOM

The React Virtual DOM (VDOM) is a concept and technology used by React to optimize and manage the rendering of UI components efficiently. It acts as a middle layer between the actual DOM and React’s render function.

React components describe how the UI should look, and React uses the virtual DOM to efficiently update the real DOM.

The virtual DOM allows React to batch updates and minimize direct manipulation of the real DOM, leading to better performance. React calculates the difference between the current and previous states of the virtual DOM and updates only the changed parts in the real DOM.

React's declarative approach allows developers to describe what the UI should look like at any given state. React handles the rest by ensuring the actual DOM matches the virtual DOM.

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

### what is callback

A callback is a function that you pass into another function as an argument, and this callback function gets executed (or "called back") after the completion of that function.

Why Use Callbacks?

- Asynchronous Operations:JavaScript is single-threaded, meaning it can execute only one task at a time. To handle tasks that take time (like network requests, file reading, or timers) without blocking the main thread, JavaScript uses asynchronous operations. Callbacks allow these asynchronous operations to be handled efficiently.

- Event Handling:JavaScript is widely used in web development where handling user events (like clicks, key presses, or mouse movements) is essential. Callbacks are used to define what should happen when these events occur.

* Modular and Reusable Code:Callbacks help in writing modular and reusable code by allowing functions to be more flexible. You can pass different callback functions to the same function to perform various tasks.

### Design a useDebounce hook

```js
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // Inside the effect, setTimeout is called to delay the update of debouncedValue.
  useEffect(() => {
    // Set up the debounce timer
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the previous timer if value or delay changes.This prevents multiple timeouts from running simultaneously and ensures that only the latest change is debounced.

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Effect runs when 'value' or 'delay' changes

  return debouncedValue;
}

export default useDebounce;
```

```js
import useDebounce from "./useDebounce";

function SearchInput() {
  const [inputValue, setInputValue] = useState("");

  // useDebounce hook is used to get the debouncedValue, which updates 500 milliseconds after the user stops typing.
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      // Mock API call
      fetchSearchResults(debouncedValue);
    } else {
      .....
    }
  }, [debouncedValue]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />
      <p>{debouncedValue}</p>
    </div>
  );
}

export default SearchInput;
```

### what is state and useState

Components often need to change what’s on the screen as a result of an interaction. In React, this kind of component-specific memory is called state.

Use a state variable when a component needs to “remember” some information between renders.

State is local to a component instance on the screen. In other words, if you render the same component twice, each copy will have completely isolated state! Changing one of them will not affect the other.

This is what makes state different from regular variables that you might declare at the top of your module. State is not tied to a particular function call or a place in the code, but it’s “local” to the specific place on the screen.

Unlike props, state is fully private to the component declaring it. The parent component can’t change it. This lets you add state to any component or remove it without impacting the rest of the components.

State variables are declared by calling the useState Hook.

To update a component with new data, two things need to happen:

1.Retain the data between renders.
2.Trigger React to render the component with new data (re-rendering).

The useState Hook provides those two things:

1.A state variable to retain the data between renders.
2.A state setter function to update the variable and trigger React to render the component again.

In React, hooks are matched by their order in the component, so they must be called at the top level of your function components, not inside loops, conditions, or nested functions.

### what is rendering in react?

“Rendering” is React calling your components.

On initial render, React will call the root component.
For subsequent renders, React will call the function component whose state update triggered the render.

Any screen update in a React app happens in three steps:
Trigger
Render
Commit

## To display an array in random order in JavaScript

```js
const arr = [1, 2, 3, 4, 5];

// Shuffle the array
const shuffledArray = arr.sort(() => Math.random() - 0.5);
```

Explanation:
Math.random() generates a random floating-point number between 0 and 1.

Subtracting 0.5 from Math.random() makes the result either positive or negative, which allows the sort() method to randomly decide the order of elements.

If the result is negative, the elements are swapped.
If the result is positive, the elements stay in place.
This gives a randomized ordering of the array elements.
