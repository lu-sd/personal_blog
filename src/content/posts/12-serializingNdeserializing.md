---
title: "Algorithm-297"
publishedAt: 2024-01-16
description: "DFS "
slug: "12-Serialize and Deserialize Binary Tree"
isPublish: true
---

## Serialize and Deserialize Binary Tree

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

### Encodes a tree to a single string.

```js
function dfs(root, res) {
  if (!root) {
    res.push("x");
    return;
  }
  res.push(root.val);
  dfs(root.left, res);
  dfs(root.right, res);
}
function serialize(root: TreeNode | null): string {
  const res = [];
  dfs(root, res);
  return res.join(" ");
}
```

if you don't want to use pass down a state,you can write this way:

```js
function serialize(root) {
  const res = [];

  function dfs(root) {
    if (!root) {
      res.push("x");
      return;
    }
    res.push(root.val);
    dfs(root.left);
    dfs(root.right);
  }

  dfs(root);
  return res.join(" ");
}
```

Also ,you can use divide and conquer like this:

```js
function serialize(root) {
  function dfs(root) {
    if (!root) {
      return "x";
    }
    const left = dfs(root.left);
    const right = dfs(root.right);
    return root.val + " " + left + " " + right;
  }

  return dfs(root);
}
```

### Decodes your encoded data to tree.

```js
function deserialize(data: string): TreeNode | null {
  const nodes = data.split(" ")[Symbol.iterator]();
  function dfs(nodes) {
    let val = nodes.next().value;
    if (val === "x") return null;
    const cur = new TreeNode(parseInt(val, 10));
    cur.left = dfs(nodes);
    cur.right = dfs(nodes);
    return cur;
  }
  return dfs(nodes);
}
```

#### Here's a breakdown of how [Symbol.iterator]() works:

The [Symbol.iterator] method in JavaScript is a fundamental part of the language's iteration protocol.The Every object that is intended to be iterable must implement the Symbol.iterator method.

The method [Symbol.iterator]() must return an object, which is the iterator for the implementing object. This iterator must conform to the iterator protocol, which means it must have a next() method.

The next() Method: The next() method, when called, returns an object with two properties:

value: The next value in the iteration sequence.
done: A boolean indicating whether or not the iteration is complete (i.e., whether there are more values to iterate over). When the iteration is finished, done is true.

Usage in for...of Loop: When a for...of loop is used on an iterable object, JavaScript automatically calls the object's [Symbol.iterator]() method to get the iterator. Then, it repeatedly calls the iterator's next() method to get values until done is true.

If you dont't know too much about Symbol,that's OK. we can try another way to conquer it .

```js
function deserialize(s) {
  const nodes = s.split(" ");
  function dfs(nodes) {
    let val = nodes.shift();
    if (val === "x") return;
    const cur = new Node(parseInt(val));
    cur.left = dfs(nodes);
    cur.right = dfs(nodes);
    return cur;
  }
  return dfs(nodes);
}
```
