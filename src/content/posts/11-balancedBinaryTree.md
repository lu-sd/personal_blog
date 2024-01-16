---
title: "Algorithm-110,701"
publishedAt: 2024-01-08
description: "DFS Backtracking "
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

Missing Link Assignment: In the recursive calls insertBst(bst.left, val) and insertBst(bst.right, val), the result of the recursive call (which is potentially a new node) is returned, but not linked back to the bst. This means that your function will not properly insert the new value into the BST.So that's the importance of reference.

257: Give all paths of a Binary tree,form root to leaf in any order

```js
function dfs(root, path, res) {
  if (!root.left && !root.right) {
    path.push(root.val);
    const curr = path.join("->");
    res.push(curr);
    path.pop();
    return;
  }
  for (const node of [root.right, root.left]) {
    if (node) {
      path.push(root.val);
      dfs(node, path, res);
      path.pop();
    }
  }
}

function binaryTreePaths(root) {
  let res = [];
  if (root) {
    dfs(root, [], res);
  }
  return res;
}
```

257+: Given a ternary tree (each node of the tree has at most three children), find all root-to-leaf paths.

```js
class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}
function dfs(root, path, res) {
  // exit condition, reached leaf node, append paths to results
  if (root.children.length === 0) {
    path.push(root.val);
    const cur_path = path.join("->");
    res.push(cur_path);
    path.pop();
    return;
  }
  // dfs on each non-null child
  for (const child of root.children) {
    if (child) {
      path.push(root.val);
      dfs(child, path, res);
      path.pop();
    }
  }
}

function ternaryTreePaths(root) {
  let res = [];
  if (root) dfs(root, [], res);
  return res;
}
```

Given a non-negative integer n, find all n-letter words composed by 'a' and 'b', return them in a list of strings in lexicographical order.

```js
function dfs(n, path, starIndex, res) {
  // Base case: if the length of the path equals n, join the path and add to results
  if (starIndex === n) {
    const currentPath = path.join("");
    res.push(currentPath);
    return;
  }

  // Recursive case: iterate over 'a' and 'b', explore further, and backtrack
  for (const letter of ["a", "b"]) {
    path.push(letter);
    dfs(n, path, starIndex + 1, res);
    path.pop();
  }
}

function letterCombination(n) {
  const res = [];
  dfs(n, [], 0, res);
  return res;
}
```

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

```js
function lcaOnBst(bst, p, q) {
  let min = Math.min(p, q);
  let max = Math.max(p, q);
  if (bst.val < min) {
    return lcaOnBst(bst.right, p, q);
  } else if (bst.val > max) {
    return lcaOnBst(bst.left, p, q);
  } else return bst.val;
}
```

104 Given the root of a binary tree, return its maximum depth.

```js
function maxDepth(root: TreeNode | null): number {
  function hight(root) {
    if (!root) return 0;
    const left = hight(root.left);
    const right = hight(root.right);
    return Math.max(left, right) + 1;
  }
  return root === null ? 0 : hight(root);
}
```
