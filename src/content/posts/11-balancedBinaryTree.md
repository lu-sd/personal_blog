---
title: "Algorithm-110,701"
publishedAt: 2024-01-08
description: "DFS"
slug: "11-balancedBinaryTree,inserIntoBST"
isPublish: true
---

110:Given a binary tree, determine if it is height-balanced.

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

701 You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

```js
function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  if (root === null) return new TreeNode(val);
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val);
  } else if (root.val < val) {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
}
```

However, you maybe made a mistake like this

```js
function insertBst(bst, val) {
  if (bst === null) return new Node(val);
  if (bst.val > val) {
    return insertBst(bst.left, val);
  } else if (bst.val < val) {
    return insertBst(bst.right, val);
  }
  return bst;
}
```

Missing Link Assignment: In the recursive calls insertBst(bst.left, val) and insertBst(bst.right, val), the result of the recursive call (which is potentially a new node) is returned, but not linked back to the bst. This means that your function will not properly insert the new value into the BST.
