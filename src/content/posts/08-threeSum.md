---
title: "Algorithm-15,18"
publishedAt: 2023-12-04
description: "two pointers in sorted array"
slug: "08-threeSum"
isPublish: true
---

15:Given an integer array nums, return all the triplets [ nums[i], nums[j], nums[k] ] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

```js
function threeSum(nums: number[]): number[][] {
  //sorting the input array in asc order,then we can use the two pointers to find the trplets.
  nums = nums.sort((a, b) => a - b);
  let res: number[][] = [];
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) return res;
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] + nums[i + 1] + nums[i + 2] > 0) break;

    let j = i + 1;
    let k = len - 1;

    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];

      if (sum > 0) {
        k--;
      } else if (sum < 0) {
        j++;
      } else {
        res.push([nums[i], nums[j], nums[k]]);
        while (nums[k] === nums[k - 1]) k--;
        while (nums[j] === nums[j + 1]) j++;
        j++;
        k--;
      }
    }
  }
  return res;
}
```

18.4Sum:Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

- 0 <= a, b, c, d < n
- a, b, c, and d are distinct.
- nums[a] + nums[b] + nums[c] + nums[d] == target
- You may return the answer in any order.

```js
function fourSum(nums: number[], target: number): number[][] {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  const res: number[][] = [];
  for (let i = 0; i < len - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;

    for (let j = i + 1; j < len - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let l = j + 1;
      let r = len - 1;

      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          res.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++;
          r--;
        } else if (sum < target) {
          l++;
        } else {
          r--;
        }
      }
    }
  }
  return res;
}
```
