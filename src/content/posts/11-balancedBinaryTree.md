---
title: "Algorithm-104,110,543,701,235"
publishedAt: 2024-01-08
description: "DFS-divide and conquer(return value) vs fire and go(global varible) "
slug: "11-balancedBinaryTree,maxDepth,diameter"
isPublish: true
---

104:Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

```js
function maxDepth(root: TreeNode | null): number {
  function dfs(node: TreeNode | null) {
    if (!node) return 0;
    let l = dfs(node.left);
    let r = dfs(node.right);
    let ans = Math.max(r, l) + 1;
    return ans;
  }
  return dfs(root);
}
```

110:Given a binary tree, determine if it is height-balanced.

To find whether a tree is balanced, and to find out about its height, we look at the two subtrees and see whether they are balanced, so need to return the height of the current tree to the parents so that current node's parent can decide whether its subtrees' height difference is no more than 1.

```js
function isBalanced(root: TreeNode | null): boolean {
  function dfs(node: TreeNode | null) {
    if (!node) return 0;
    let l = dfs(node.left);
    if (l === -1) return -1;
    let r = dfs(node.right);
    if (r === -1) return -1;
    if (Math.abs(r - l) > 1) return -1;
    let ans = Math.max(r, l) + 1;
    return ans;
  }
  return dfs(root) === -1 ? false : true;
}
```

543:Given the root of a binary tree, return the length of the diameter of the tree.

The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

```js
function diameterOfBinaryTree(root: TreeNode | null): number {
  let res = 0;
  function dfs(node: TreeNode | null) {
    if (!node) return 0;
    let l = dfs(node.left);
    let r = dfs(node.right);

    let ans = Math.max(r, l) + 1;
    res = Math.max(res, l + r);
    return ans;
  }
  dfs(root);
  return res;
}
```

### Difference

In maxDepth, the function simply finds the maximum depth by comparing the depth of the left and right subtrees.

In isBalanced, the function not only computes the depth but also checks if the tree is balanced at every step. If an imbalance is found, it returns -1.

In diameterOfBinaryTree, the function calculates the diameter by keeping track of the maximum sum of the depths of the left and right subtrees (l + r) at each node.

701:You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

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

235:Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

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
