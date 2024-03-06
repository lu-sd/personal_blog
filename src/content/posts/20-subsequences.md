---
title: "Backtracking solve subsets and subsequences - 78,90,491 "
publishedAt: 2024-02-06
description: "basic and conditonal problems"
slug: "20-subsequences"
isPublish: true
---

78:Given an integer array nums of unique elements, return all possible
subsets.

The solution set must not contain duplicate subsets. Return the solution in any order.

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

```js
function subsets(nums: number[]): number[][] {
  const res: number[][] = [];

  function dfs(start: number, path: number[]) {
    res.push([...path]);

    for (let idx = start; idx < nums.length; idx++) {
      path.push(nums[idx]);
      dfs(idx + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return res;
}
```

90:Given an integer array nums that may contain duplicates, return all possible subsets

The solution set must not contain duplicate subsets. Return the solution in any order.

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

```js
function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];

  function dfs(start: number, path: number[]) {
    res.push([...path]);

    for (let idx = start; idx < nums.length; idx++) {
      if (idx > start && nums[idx] === nums[idx - 1]) continue;

      path.push(nums[idx]);
      dfs(idx + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return res;
}
```

491:Given an integer array nums, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.

Examples:

Input: nums = [4,6,7,7]
Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]

Input: nums = [4,4,3,2,1]
Output: [[4,4]]

Before slove this problem, we should be appreciate the difference between subsets and subsequeces:

### Subsequence

- A subsequence of a sequence is a new sequence that can be derived from the original sequence by removing some (or no) elements without changing the order of the remaining elements.
- Order Matters: The order of elements in a subsequence must follow the order they appear in the original sequence.
- Example: Given the sequence [1, 2, 3], the subsequences include [1, 2], [1, 3], and [2, 3] among others, including the sequence itself and an empty sequence. Notice that [2, 1] is not a subsequence of [1, 2, 3] because it does not maintain the original ordering.

### Subsets

- A subset of a set is a set formed from the original set's elements, including the empty set and the set itself. A subset can contain any combination of the original set's elements, regardless of their order.
- Order Does Not Matter: Since a set is an unordered collection of unique elements, the order of elements in a subset is not considered.
- Example: Given the set {1, 2, 3}, the subsets include {}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, and {1, 2, 3}. Here, {2, 1} is considered the same subset as {1, 2} because sets do not account for the order of elements.

In summary: Subsequences are derived from sequences (where order matters and duplicates may exist), while subsets are derived from sets (where order does not matter and duplicates do not exist).

So we can not use sort() to deal with duplucation problem.

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
