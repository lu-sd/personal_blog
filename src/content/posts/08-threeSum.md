---
title: "Algorithm-007"
publishedAt: 2023-12-04
description: "two pointers in sorted array"
slug: "08-threeSum"
isPublish: true
---

Given an integer array nums, return all the triplets [ nums[i], nums[j], nums[k] ] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

```js
function threeSum(nums: number[]): number[][] {
  //sorting the input array in asc order,then we can use the two pointers to find the trplets.
  nums = nums.sort((a, b) => a - b);
  let res: number[][] = [];
  const len = nums.length;
  //loop through the array, and for each element at index i, we use two pointers (j and k) to find all possible triplets that sum to zero.because we have j and k pointer,so i < len -2, not < len.
  for (let i = 0; i < len - 2; i++) {
    let j = i + 1;
    let k = len - 1;
    // If there are repeated elements, just skip.
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];
      if (sum > 0) {
        k--;
        // skip duplicates by checking if the current element is equal to the previous element
        while (nums[k] === nums[k + 1]) k--;
      } else if (sum < 0) {
        j++;
        while (nums[j] === nums[j - 1]) j++;
      } else {
        res.push([nums[i], nums[j], nums[k]]);
        j++;
        k--;
        while (nums[k] === nums[k + 1]) k--;
        while (nums[j] === nums[j - 1]) j++;
      }
    }
  }
  return res;
}
```
