---
title: "React Hook"
publishedAt: 2024-02-28
description: "About some tips about useful hook"
slug: "32-reactHook"
isPublish: true
---

## useId()

--useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.

In React, components can be reused multiple times, which means an ID that is unique in a single instance of a component might not be unique when the component is used multiple times on a page.

The useId hook generates a unique ID that is stable across server and client rendering, making it perfect for cases where you need a unique identifier for elements within components, particularly in scenarios involving accessibility, form controls, and labels.

Math.random() can be used for generating unique IDs in simpler, client-only rendering scenarios, it's generally not recommended for complex applications, especially those using SSR or needing stable identifiers across re-renders. Using React's useId hook or other deterministic ID generation methods is a more reliable and efficient approach.

## useRef(initialValue)

In React, a ref is a feature that allows you to access the underlying DOM nodes or React elements directly.Changes to refs do not trigger re-renders. They're a way to interact with DOM nodes or React elements directly outside the regular data flow.

Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.

useRef returns an object with a single property:current

current: Initially, it’s set to the initialValue you have passed. You can later set it to something else. If you pass the ref object to React as a ref attribute to a JSX node, React will set its current property.On the next renders, useRef will return the same object.You instruct React to put a DOM node into myRef.current by passing by passing "myRef" as a prop to a React element using the ref attribute.

When you change the ref.current property, React does not re-render your component. React is not aware of when you change it because a ref is a plain JavaScript object.

By using a ref, you ensure that:

- You can store information between re-renders (unlike regular variables, which reset on every render).
- Changing it does not trigger a re-render (unlike state variables, which trigger a re-render).
- The information is local to each copy of your component (unlike the variables outside, which are shared).

Do not write or read ref.current during rendering.

```js
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  myRef.current = 123;
  // ...
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>;
}
```

You can read or write refs from event handlers or effects instead ,and also use the built-in browser APIs defined on it.

```js
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123;
  });
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current);
  }
  // ...
}
```

## useEffect(setup, dependencies?)

You need to pass two arguments to useEffect:

A setup function with setup code that connects to that system.

It should return a cleanup function with cleanup code that disconnects from that system.

A list of dependencies including every value from your component used inside of those functions.

React calls your setup and cleanup functions whenever it’s necessary, which may happen multiple times:

- Your setup code runs when your component is added to the page (mounts).

- After every re-render of your component where the dependencies have changed:
  First, your cleanup code runs with the old props and state.
  Then, your setup code runs with the new props and state.
- Your cleanup code runs one final time after your component is removed from the page (unmounts).

## useMemo

- Purpose: useMemo is used to memoize expensive calculations or values. If you have a computation that is expensive and doesn't need to be recalculated every time your component re-renders, you can use useMemo to remember the last calculated value and only recalculate it when one of its dependencies changes.

- Usage: You pass a function that returns the value you want to compute and an array of dependencies to useMemo. React will only recompute the memoized value when one of the dependencies has changed.

## useCallback

- Purpose: useCallback is used to memoize functions themselves. This is particularly useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders. If you create a new function on every render, the child component will re-render every time because the function prop has changed. useCallback will return a memoized version of the callback that only changes if one of its dependencies changes.

- Usage: You pass the function you want to memoize and an array of dependencies. React will give you back a memoized version of the function that only changes when one of the dependencies has changed.

Key Differences between useMemo and useCallback

What They Memoize: The key difference lies in what they are used for memoizing. useMemo is for memoizing values resulting from a function, while useCallback is for memoizing the function itself.

Use Cases:
Use useMemo to avoid expensive calculations on every render.
Use useCallback to pass stable functions to components that require them, thus preventing unnecessary re-renders due to function reference changes.
