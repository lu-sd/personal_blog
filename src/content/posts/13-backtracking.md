---
title: "Algorithm-257,46"
publishedAt: 2024-01-18
description: "Backtracking with additional states "
slug: "13-backtracking"
isPublish: true
---

## Basic Backing

257: Give all paths of a Binary tree,form root to leaf in any order

```js
function binaryTreePaths(root) {
  let res = [];

  function dfs(root, path) {
    if (!root.left && !root.right) {
      path.push(root.val);
      const curr = path.join("->");
      res.push(curr);
      path.pop();
      return;
    }
    for (const node of [root.right, root.left]) {
      if (node) {
        path.push(node.val);
        dfs(node, path);
        path.pop();
      }
    }
  }
  if (root) {
    dfs(root, []);
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

## Template for backtracking 1

```js
function dfs(startIndex, path, res, [...additional states]) {
    if (isLeaf(path)) {
        res.push(new Array(path));
        return;
    }
    for (const edge of getEdges(startIndex, [...additional states])) {
        if (condition)
        path.push(choice);
        if (...additional states) update(...additional states)
        dfs(startIndex + edge.length, path, res, [...addtional states]);
        path.pop();
        // revert(...additional states) if necessary, e.g. permutations
    }
}
```

46:Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

```js
function permute(nums: number[]): number[][] {
  function dfs(
    start: number,
    path: number[],
    used: boolean[],
    res: number[][]
  ) {
    if (start === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      //skip used used letter
      if (used[i]) continue;
      // add letter to permutation and mark as used
      path.push(nums[i]);
      used[i] = true;
      dfs(start + 1, path, used, res);
      path.pop();
      // need revert the state
      used[i] = false;
    }
  }
  const ans: number[][] = [];
  dfs(0, [], new Array(nums.length).fill(false), ans);
  return ans;
}
```

## Template for backtracking 2

```js
function dfs(startIndex, target) {
    if (isLeaf(startIndex)) {
        return 1
    }
    int ans = initialValue;
    for (const edge of getEdges(startIndex, [...additional states])) {
        if (additional states) {
            update([...additional states]);
        }
        ans = aggregate(ans, dfs(startIndex + edge.length(), [...additional states]))
        if (additional states) {
            revert([...additional states]);
        }
    }
    return ans;
}
```

Given a string and a list of words, determine if the string can be constructed from concatenating words from the list of words. A word can be used multiple times.

Input:

target = "algomonster"
words = ["algo", "monster"]

Output: true

```js
function wordBreak(s, words) {
  const memo = {};

  function dfs(startIndex) {
    if (startIndex === s.length) return true;

    if (startIndex in memo) return memo[startIndex];

    let ans = false;
    for (const word of words) {
      if (s.slice(startIndex).startsWith(word)) {
        if (dfs(startIndex + word.length)) {
          ans = true;
          break;
        }
      }
    }
    memo[startIndex] = ans;
    return ans;
  }

  return dfs(0);
}
```
