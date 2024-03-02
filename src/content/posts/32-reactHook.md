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

current: Initially, it’s set to the initialValue you have passed. You can later set it to something else. If you pass the ref object to React as a ref attribute to a JSX node, React will set its current property.On the next renders, useRef will return the same object.You instruct React to put a DOM node into myRef.current by passing <div ref={myRef}>.

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

## useEffect()
