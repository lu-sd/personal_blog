---
title: "Two Pointers-283,239,11,543,2461,209"
publishedAt: 2024-02-19
description: "can convert O(n**2) to O(n)"
slug: "27-twoPointers"
isPublish: true
---

Since "two pointers" is kind of a broad topic, there is no singular way to implement it. Depending on the questions you encounter, you need to implement the answer differently.

The two-pointer technique is not limited to arrays. Two pointer can be done on other structures, like linked list, as long as they are iterable.

Generally speaking, two pointer algorithm has three kinds:

### 1:Same Directions

283:Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

```js
function moveZeroes(nums: number[]): void {
  let l = 0;

  for (let r = 0; r < nums.length; r++) {
    if (nums[r] !== 0) {
      nums[l] = nums[r];
      l++;
    }
  }

  //    for(let r = l; r < nums.length; r++){
  //        nums[r] = 0
  //    }
  while (l < nums.length) {
    nums[l++] = 0;
  }
}
```

239:Sliding Window Maximum

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

```js
function maxSlidingWindow(nums: number[], k: number): number[] {
  const stack = [];
  const res = [];
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    while (stack.length > j && item > stack[stack.length - 1]) {
      stack.pop();
    }
    stack.push(item);
    if (i >= k - 1) {
      res.push(stack[j]);
      if (nums[i - k + 1] === stack[j]) {
        j++;
      }
    }
  }
  return res;
}
```

### 2:Opposite Directions

11:You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

```js
function maxArea(height: number[]): number {
  let ans = 0;
  let l = 0;
  let r = height.length - 1;

  while (l < r) {
    const area = (r - l) * Math.min(height[l], height[r]);
    ans = Math.max(area, ans);

    if (height[l] < height[r]) {
      l += 1;
    } else {
      r -= 1;
    }
  }

  return ans;
}
```

543:Reverse String
Given a string s and an integer k, reverse the first k characters for every 2k characters counting from the start of the string.

If there are fewer than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and leave the other as original.

Input: s = "abcdefg", k = 2
Output: "bacdfeg"

```js
function reverseStr(s: string, k: number): string {
  function reverse(s: string[], l: number, r: number) {
    while (l < r) {
      [s[l], s[r]] = [s[r], s[l]];
      l++;
      r--;
    }
  }

  const sArr = s.split("");
  const len = sArr.length;

  for (let i = 0; i < len; i += 2 * k) {
    let left = i;
    let right = i + k <= len ? i + k - 1 : len - 1;
    reverse(sArr, left, right);
  }

  return sArr.join("");
}
```

### 3.Sliding Window

The sliding window technique combined with two pointers is a powerful approach for solving problems related to substrings or subarrays, especially when you're dealing with questions that ask for the longest/shortest substring, maximum/minimum sum subarray, or similar constraints within a contiguous block of elements in an array or string.

The essence of the sliding window technique is to maintain a window that satisfies the problem's condition and then slide the window to explore other possibilities. The two pointers typically represent the start and end of the window, and they move according to the problem's requirements, often in one direction but sometimes in opposite directions within the same loop.

### Fixed Fize Window

Given an array (list) nums consisted of only non-negative integers, find the largest sum among all subarrays of length k in nums.

For example, if the input is nums = [1, 2, 3, 7, 4, 1], k = 3, then the output would be 14 as the largest length 3 subarray sum is given by [3, 7, 4] which sums to 14.

The code below is a basic implementation for finding the maximum sum of any subarray of length k without checking if all elements in the subarray are distinct.

```js
function maximumSubarraySum(nums: number[], k: number): number {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  let max = sum;
  for (let r = k; r < nums.length; r++) {
    let l = r - k;
    max = max - nums[l] + nums[r];
    max = Math.max(max, sum);
  }

  return max;
}

function maximumSubarraySum2(nums: number[], k: number): number {
  let right = 0;
  let left = 0;
  let ans = 0;
  let sum = 0;

  while (right != nums.length) {
    sum += nums[right++];

    if (right - left == k) {
      ans = Math.max(ans, sum);
      sum -= nums[left++];
    }
  }
  return ans;
}
```

2461:You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:

1:The length of the subarray is k, and
2:All the elements of the subarray are distinct.

Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.

A subarray is a contiguous non-empty sequence of elements within an array.

```js
function maximumSubarraySum(nums: number[], k: number): number {
  let right = 0;
  let left = 0;
  let set = new Set();
  let ans = 0;
  let sum = 0;

  while (right != nums.length) {
    while (set.has(nums[right])) {
      set.delete(nums[left]);
      sum -= nums[left++];
    }

    set.add(nums[right]);
    sum += nums[right++];

    if (right - left == k) {
      ans = Math.max(ans, sum);
      set.delete(nums[left]);
      sum -= nums[left++];
    }
  }
  return ans;
}
```

To adhere to the condition that all elements in the subarray must be distinct, you will need to add a mechanism to check for the uniqueness of elements within each subarray of length k. Here's how you can modify the function to meet the problem's requirements:

Sliding Window with Uniqueness Check: Use a sliding window to consider each subarray of length k, and within that window, verify if all elements are distinct.

Set or Hash Map for Tracking Uniqueness: Utilize a Set (or Hash Map) to track the elements in the current window. A Set naturally ensures that all its elements are unique.

### Flexible Size Sliding Window Template - Longest

```js
function slidingWindowFlexibleLongest(input) {
    initialize window, ans

    let left = 0;

    for (let right = 0; right < input.length; right++) {
        append input[right] to window
        while (invalid(window)) {// update left until window is valid again
            remove input[left] from window
            ++left;
        }
        ans = max(ans, window);// window is guaranteed to be valid here
    }
    return ans;
}
```

3:

### Flexible Size Sliding Window Template - shortest

```js
function slidingWindowFlexibleShortest(input) {
    initialize window, ans

    let left = 0;

    for (let right = 0; right < input.length; ++right) {
        append input[right] to window
        while (valid(window)) {
            ans = min(ans, window);   // window is guaranteed to be valid here
            remove input[left] from window
            ++left;
        }
    }
    return ans;
}

```

209: Minimum Size Subarray Sum
Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

```js
function minSubArrayLen(target: number, nums: number[]): number {
  let l = 0;
  let ans = Infinity;
  let sum = 0;

  for (let r = 0; r < nums.length; r++) {
    sum += nums[r];

    while (sum >= target) {
      ans = Math.min(ans, r - l + 1);
      sum -= nums[l];
      l++;
    }
  }

  return ans === Infinity ? 0 : ans;
}
```
