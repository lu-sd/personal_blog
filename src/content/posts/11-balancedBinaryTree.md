---
title: "Algorithm-110"
publishedAt: 2024-01-08
description: "DFS"
slug: "11-balancedBinaryTree"
isPublish: true
---

Given a binary tree, determine if it is height-balanced.

To find whether a tree is balanced, and to find out about its height, we look at the two subtrees and see whether they are balanced, so need to return the height of the current tree to the parents so that current node's parent can decide whether its subtrees' height difference is no more than 1.

```js
function hight(root) {
  if (!root) return 0;
  let left = hight(root.left);
  let right = hight(root.right);
  if (left === -1 || right === -1) return -1;
  if (Math.abs(left - right) > 1) return -1;
  return Math.max(left, right) + 1;
}
function isBalanced(root) {
  return hight(root) !== -1;
}
```
