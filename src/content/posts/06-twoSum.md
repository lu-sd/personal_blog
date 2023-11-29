---
title: "Algorithm-01"
publishedAt: 2023-11-27
description: " use map to store calculations"
slug: "06-twoSum"
isPublish: true
---

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

```js
function twoSum(nums: number[], target: number): number[] {
  let nummap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (nummap.has(diff)) {
      return [nummap.get(diff), i];
    }
    nummap.set(nums[i], i);
  }
  return [];
}
```
