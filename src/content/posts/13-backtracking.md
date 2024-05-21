---
title: "Algorithm-257,988,112,113,437,139,46"
publishedAt: 2024-01-18
description: "Backtracking with additional states "
slug: "13-backtracking"
isPublish: true
---

## Basic Backing

### Template 1

```js
let res: number[][] = [];
let path: number[] = [];

// General path:
function dfs(root: TreeNode | null): void {
  if (!root) return; // If the root is null, return immediately

  path.push(root.val);

  if (!root.left && !root.right) {
    // If it's a leaf node
    res.push([...path]); // Push a copy of the path to results
    // no return!;
  }

  dfs(root.left);
  dfs(root.right);

  path.pop();
}
```

Why no return?

Path State Management: In your DFS function, you push to the path array and recursively call the DFS for the left and right children. After exploring both children, you need to ensure that the state of the path is correctly managed by popping the last element after the recursive calls. This is necessary to backtrack correctly when you return from a leaf to a parent node and move to another subtree. You've already added the path.pop() call after both recursive calls, which is correct.

257: Give all paths of a Binary tree,form root to leaf in any order

```js
function binaryTreePaths(root: TreeNode | null): string[] {
  const res: string[] = [];

  function dfs(root: TreeNode | null, path: number[]): void {
    if (!root) return;

    path.push(root.val);

    if (!root.left && !root.right) {
      // If it's a leaf node
      res.push(path.join("->")); // Push a copy of the path to results
    }

    dfs(root.left, path); // Continue recursion on the left child
    dfs(root.right, path); // Continue recursion on the right child
    path.pop();
  }

  dfs(root, []);
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

988.Smallest String Starting From Leaf

You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.

Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

As a reminder, any shorter prefix of a string is lexicographically smaller.

For example, "ab" is lexicographically smaller than "aba".
A leaf of a node is a node that has no children.

```js
function smallestFromLeaf(root: TreeNode | null): string {
  let smallestString: string = "~"; // Using '~' because it's after 'z' in ASCII table

  function dfs(node: TreeNode, currentString: string) {
    if (!node) return;
    // Convert node's value to corresponding character
    // const char = String.fromCharCode('a'.charCodeAt(0) + node.val);
    const char = String.fromCharCode(97 + node.val);

    // Update the current path by prepending current node's char (building string leaf to root)
    currentString = char + currentString;

    // If it's a leaf node
    if (!node.left && !node.right) {
      // If the current path is smaller than the smallest recorded, update smallestString
      if (currentString < smallestString) {
        smallestString = currentString;
      }
    }

    // Recursively visit left and right children
    if (node.left) dfs(node.left, currentString);
    if (node.right) dfs(node.right, currentString);
  }

  dfs(root, "");
  return smallestString;
}
```

### Template 2

```js
// Path with a given sum:
function dfsWithSum(root: TreeNode | null, sum: number): void {
  if (!root) return;

  sum += root.val;
  path.push(root.val);

  if (!root.left && !root.right && sum === targetSum) {
    res.push([...path]);
  }

  dfsWithSum(root.left, sum);
  dfsWithSum(root.right, sum);
  path.pop();
}
```

112:Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.

A leaf is a node with no children.

```js
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  function dfs(node: TreeNode | null, sum: number) {
    if (!node) return false;

    sum += node.val;

    if (node.left === null && node.right === null && sum === targetSum)
      return true;

    return dfs(node.left, sum) || dfs(node.right, sum);
  }
  return dfs(root, 0);
}
```

113:Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.

A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.

```js
function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const res: number[][] = [];
  const path = [];

  function dfs(node: TreeNode | null, sum: number) {
    if (!node) return;

    path.push(node.val);
    sum += node.val;

    if (!node.left && !node.right && sum === targetSum) {
      res.push([...path]);
    }

    dfs(node.left, sum);
    dfs(node.right, sum);
    path.pop();
  }
  dfs(root, 0);
  return res;
}
```

437:Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

```js
function pathSum(root: TreeNode | null, targetSum: number): number {
  let ans = 0;

  function dfs(node: TreeNode | null, sum: number) {
    if (!node) return;
    sum += node.val;
    if (sum === targetSum) {
      ans++;
    }
    dfs(node.left, sum);
    dfs(node.right, sum);
  }

  function traverseAndStartDFS(node: TreeNode | null) {
    if (!node) return;
    dfs(node, 0); // Start a new DFS to count paths for each node
    traverseAndStartDFS(node.left);
    traverseAndStartDFS(node.right);
  }

  traverseAndStartDFS(root); // Start traversal from the root
  return ans;
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

139:Given a string and a list of words, determine if the string can be constructed from concatenating words from the list of words. A word can be used multiple times.

Input:

target = "algomonster"
words = ["algo", "monster"]

Output: true

```js
function wordBreak(s: string, wordDict: string[]): boolean {
    const set = new Set(wordDict)
    const memo = new Map<number, boolean>()

    function dfs(start: number) {
        if (start === s.length) return true

        if (memo.has(start)) return memo.get(start)
        
        for (let i = start; i < s.length; i++) {
            const pre = s.slice(start, i + 1)
            if (set.has(pre)) {
                if (dfs(i + 1)) {
                    memo.set(start, true)
                    return true
                }
            }
        }
        memo.set(start,false)
        return false
    }

    return dfs(0)
};

function wordBreak(s: string, wordDict: string[]): boolean {
    const memo = new Map()

    function dfs(start: number) {
        if(start === s.length) return true
        if(start > s.length) return false
        if(memo.has(start)) return memo.get(start)

        let ans = false
        for (const item of wordDict) {
            if (s.slice(start).startsWith(item)) {
                ans = ans || dfs(start + item.length)
            }
        }
        memo.set(start,ans)
        return ans
    }

    return dfs(0)

};
```
