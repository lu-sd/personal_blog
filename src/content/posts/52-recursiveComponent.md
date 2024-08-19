---
title: "Recursive component in React"
publishedAt: 2024-07-21
description: "Can be particularly useful for rendering hierarchical data structures like trees."
slug: "52-recursiveComponent"
isPublish: true
---

This example demonstrates how to create a recursive component to handle nested data structures, making it a powerful tool for dealing with hierarchical data in React.

```js
const RecursiveList = ({ data }) => {
  if (!data || !data.length) {
    return null;
  }

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          {item.name}
          {item.children && <RecursiveList data={item.children} />}
        </li>
      ))}
    </ul>
  );
};

export default RecursiveList;
```
