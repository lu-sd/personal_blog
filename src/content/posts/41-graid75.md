---
title: "grand75-53"
publishedAt: 2024-05-22
description: "this is kind of  a classic aglo problems"
slug: "41-graid75"
isPublish: true
---

53:Given an integer array nums, find the subarray with the largest sum, and return its sum.

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

```js
function maxSubArray(nums: number[]): number {
  let sum = 0;
  let ans = nums[0];
  for (let r = 0; r < nums.length; r++) {
    if (sum > 0) {
      sum += nums[r];
    } else {
      sum = nums[r];
    }
    ans = Math.max(sum, ans);
  }

  return ans;
}
```
