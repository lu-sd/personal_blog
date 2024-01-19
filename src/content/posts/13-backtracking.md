---
title: "Algorithm-46"
publishedAt: 2024-01-18
description: "Backtracking with additional states "
slug: "13-backtracking"
isPublish: true
---

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
