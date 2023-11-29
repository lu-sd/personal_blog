---
title: "Algorithm-75"
publishedAt: 2023-11-27
description: "base on bubble sorting in array"
slug: "05-sortColor"
isPublish: true
tag:Algorithm
---

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

```js
function sortColors(nums: number[]): void {
  let left = 0;
  let right = nums.length - 1;
  let i = 0;
  while (i <= right) {
    if (nums[i] === 2) {
      swap(nums, i, right);
      right--;
    } else if (nums[i] === 0) {
      swap(nums, i, left);
      left++;
      i++;
    } else {
      i++;
    }
  }
}

function swap(nums: number[], i: number, j: number) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
```
