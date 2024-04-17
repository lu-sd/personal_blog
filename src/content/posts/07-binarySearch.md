---
title: "Algorithm-34,540"
publishedAt: 2023-11-28
description: "only can ben used in sorted array"
slug: "07-binarySearch"
isPublish: true
---

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
  // Helper function to find the leftmost (first occurrence) index of the target
  function findStartingIndex() {
    let index = -1;
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) {
        index = mid; // Potential start found, but keep looking left
        r = mid - 1;
      } else if (nums[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return index;
  }

  // Helper function to find the rightmost (last occurrence) index of the target
  function findEndingIndex() {
    let index = -1;
    let l = 0;
    let r = nums.length - 1;

    while (l <= r) {
      let mid = Math.floor((l + r) / 2);
      if (nums[mid] === target) {
        index = mid; // Potential end found, but keep looking right
        l = mid + 1;
      } else if (nums[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }

    return index;
  }

  let start = findStartingIndex();
  let end = findEndingIndex();

  // If the start index is -1, the target is not present in the array
  if (start === -1) return [-1, -1];
  return [start, end];
}
```

### Complexity Analysis

Let n be the size of the input array nums.

- Time complexity: O(log⁡n)

nums is divided into half each time. In the worst-case scenario, we need to cut nums until the range has no element, and it takes logarithmic time to reach this break condition.

- Space complexity: O(1)

During the loop, we only need to record three indexes, left, right, and mid, they take constant space.

540:Single Element in a Sorted Array

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.

```js
function singleNonDuplicate(nums: number[]): number {
  // It checks if the current index (idx) is at a valid position such that the element at idx is the start of a pair or a single non-duplicate element.
  function firstT(idx: number) {
    if (idx === nums.length - 1) return true;

    if (idx % 2 === 0) {
      return nums[idx] !== nums[idx + 1];
    } else {
      return nums[idx] !== nums[idx - 1];
    }
  }

  let l = 0;
  let r = nums.length - 1;
  let ans = -1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (firstT(mid)) {
      ans = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  return nums[ans];
}
```
