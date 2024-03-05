---
title: "Backtracking solve perputation and subsequences with duplication - 47,491 "
publishedAt: 2024-03-04
description: "use set or array to mark used element"
slug: "33-permutationAndSubsequence"
isPublish: true
---

47:Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.

```js
function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const seen = new Array(nums.length).fill(false);

  function dfs(start: number, path: number[]) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (seen[i]) continue;

      if (i > 0 && nums[i] === nums[i - 1] && !seen[i - 1]) continue;

      path.push(nums[i]);
      seen[i] = true;
      dfs(start + 1, path);
      path.pop();
      seen[i] = false;
    }
  }

  dfs(0, []);

  return res;
}
```

491:Given an integer array nums, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.

Input: nums = [4,6,7,7]
Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

```js
function findSubsequences(nums: number[]): number[][] {
   const res: number[][] = []

   function dfs(start: number, path: number[]){
       if (path.length > 1) res.push([...path])
       // Use a set for uniqueness checks in the current level
       const used = new Set<number>()
       for (let idx = start; idx < nums.length; idx++) {
           // If the current element is smaller than the last element in the path, skip it
           // Also, skip if the element is already used in this recursion level
           if ((path.length > 0 && nums[idx] < path[path.length - 1]) || used.has(nums[idx])) continue
           // Mark this number as used in the current level
           used.add(nums[idx]);
           path.push(nums[idx])
           dfs(idx + 1, path)
           path.pop()
       }
   }

   dfs(0,[])
   return res
};
```
