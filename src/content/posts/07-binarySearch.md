---
title: "Algorithm-704,34"
publishedAt: 2023-11-28
description: "only can ben used in sorted array"
slug: "07-binarySearch"
isPublish: true
---

Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

```js
function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;
  do {
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    } else {
      return mid;
    }
  } while (left < right);
  return -1;
}
```

First, we define the search space using two boundary indexes, left and right, all possible indexes are within the range [left, right).We shall continue searching over the search space as long as it is not empty. A general way is to use a while loop with the condition left < right.

<mark>Notice:when we difine different boundary condition:left <= right not left < right. `right` = num.length - 1 </mark>

### Algorithm

- Initialize the boundaries of the search space as left = 0 and right = nums.length - 1.
- If there are elements in the range [left, right), we find the middle index `mid` and compare the middle value nums[mid] with target:

  - If nums[mid] = target, return mid.
  - If nums[mid] < target, let left = mid + 1 and repeat step 2.
  - If nums[mid] > target, let right = mid and repeat step 2.
    ( <mark>if use (left <= right) as condition , right = mid-1 </mark> )

- We finish the loop without finding target, return -1.

### Complexity Analysis

Let n be the size of the input array nums.

- Time complexity: O(log⁡n)

nums is divided into half each time. In the worst-case scenario, we need to cut nums until the range has no element, and it takes logarithmic time to reach this break condition.

- Space complexity: O(1)

During the loop, we only need to record three indexes, left, right, and mid, they take constant space.

34:Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

```js
function searchRange(nums: number[], target: number): number[] {
  function lowBound(nums: number[], target: number): number {
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      if (nums[mid] >= target) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    return l;
  }

  const start = lowBound(nums, target);
  // Check if start is out of bounds or if the target isn't at the start index
  if (start === nums.length || nums[start] !== target) return [-1, -1];
  // Use target + 1 to find the upper bound, then subtract 1 to get the last occurrence of target
  const end = lowBound(nums, target + 1) - 1;

  return [start, end];
}
```

method II

```js
function searchRange(nums: number[], target: number): number[] {
  let l = 0;
  let r = nums.length - 1;

  let firstIdx = -1;
  let lastIdx = -1;

  // Find the first index of the target
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] < target) {
      l = mid + 1;
    } else {
      r = mid - 1;
      if (nums[mid] === target) firstIdx = mid;
    }
  }

  // Reset l and r for finding the last index
  l = 0;
  r = nums.length - 1;

  // Find the last index of the target
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    if (nums[mid] <= target) {
      l = mid + 1;
      if (nums[mid] === target) lastIdx = mid;
    } else {
      r = mid - 1;
    }
  }

  // If firstIdx is still -1, the target is not found
  if (firstIdx === -1) return [-1, -1];

  return [firstIdx, lastIdx];
}
```
