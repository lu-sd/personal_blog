---
title: "Algorithm-39,40"
publishedAt: 2024-01-24
description: "Combination Sum"
slug: "15-backtrackingAndDeduplication"
isPublish: true
---

Can you tell the difference between them:

39:Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the
frequency
of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.

```js
function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const res: number[][] = [];

  function dfs(start: number, remain: number, path: number[]) {
    if (remain === 0) {
      res.push([...path]);
      return;
    }
    if (remain < 0) return;

    for (let index = start; index < candidates.length; index++) {
      let num = candidates[index];
      path.push(num);
      dfs(index, remain - num, path);
      path.pop();
    }
  }
  dfs(0, target, []);
  return res;
}
```

40:Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

```js
function combinationSum2(candidates: number[], target: number): number[][] {
  const res: number[][] = [];
  candidates.sort((a, b) => a - b);
  function dfs(start: number, remain: number, path: number[]) {
    if (remain === 0) {
      res.push([...path]);
      return;
    }
    if (remain < 0) return;
    for (let index = start; index < candidates.length; index++) {
      let num = candidates[index];
      if (index > start && candidates[index] === candidates[index - 1])
        continue;
      path.push(num);
      dfs(index + 1, remain - num, path);
      path.pop();
    }
  }
  dfs(0, target, []);
  return res;
}
```
