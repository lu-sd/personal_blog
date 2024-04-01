---
title: "Use prefix sum to deal with sums related within an array."
publishedAt: 2024-02-22
description: "prefix Sum VS sliding widows"
slug: "preSum"
isPublish: true
---

## Prefix Sum

The Prefix Sum technique involves creating an array (or map) that stores the cumulative sum of elements from the beginning of the array up to a given index. This technique is particularly useful in problems that involve querying the sum of elements in a subarray repeatedly.

### Advantages:

Efficient Queries: Once the prefix sum array is computed, querying the sum of elements in any subarray can be done in constant time by a simple subtraction: prefixSum[j] - prefixSum[i-1], where i and j are the start and end indices of the subarray, respectively.

Handling Negative Numbers: Works well with both positive and negative numbers, making it versatile for a wide range of problems.

### Use Cases:

Calculating the sum of ranges within an array.
Finding subarrays with a given sum, especially when the array contains negative numbers.

Given an array of integers and an integer target, find a subarray that sums to target and return the start and end indices of the subarray.

Input: arr: [1, -20, -3, 30, 5, 4] target: 7

Output: [1, 4]

```js
function subarraySum(arr, target) {
  let prefixSum = 0;
  let hashMap = new Map(); // Stores prefix sums and their corresponding indices
  hashMap.set(0, -1); // Initialize with sum 0 at index -1 to handle the case where the subarray starts from index 0

  for (let i = 0; i < arr.length; i++) {
    prefixSum += arr[i]; // Update the running total (prefix sum)
    // Check if the current prefix sum minus the target exists in the map
    if (hashMap.has(prefixSum - target)) {
      // If it does, a subarray summing to target has been found
      return [hashMap.get(prefixSum - target) + 1, i + 1]; // Return the indices of the subarray
    }
    // If not, add the current prefix sum and its index to the map
    else {
      hashMap.set(prefixSum, i);
    }
  }

  return [-1, -1]; // If no subarray is found, return [-1, -1]
}
```

if return the total number of subarrays that sums up to target.

```js
function subarraySumTotal(arr, target) {
  let prefixSums = new Map();
  let curSum = 0;
  let count = 0; // Initialize counter for subarrays summing to target

  // Add a base case to handle sum from the start
  prefixSums.set(0, 1); // There's one way to have a sum of 0 (with no elements)

  for (let i = 0; i < arr.length; i++) {
    curSum += arr[i]; // Update current sum

    if (prefixSums.has(curSum - target)) {
      count += prefixSums.get(curSum - target); // Add the number of those subarrays to count
    } else {
      prefixSums.set(curSum, (prefixSums.get(curSum) || 0) + 1);
    }
  }

  return count; // Return the total count of subarrays summing to target
}
```

## Sliding Window

The Sliding Window algorithm involves maintaining a subset of items from the array as a window and sliding this window across the array to find a subarray that satisfies a certain condition, such as a specific sum or length. This technique is highly efficient for problems that involve contiguous sequences with a given property because it reduces the need for nested loops, thus lowering the time complexity.

### Advantages:

Efficiency: Often allows for solving problems in linear time by avoiding unnecessary re-computation for overlapping parts of the array.

Simplicity: The logic is generally straightforward and involves expanding and shrinking the window based on the current sum or condition relative to the target.

### Use Cases:

Finding the longest/shortest subarray with a sum equal to or greater/less than a given value.

Problems requiring the checking of every contiguous subarray for a condition, such as maximum sum or specific character frequency in a string.

# Choosing Between Them

Prefix Sum is more suited for static arrays where the sum of ranges is frequently queried, or when dealing with finding exact sums in arrays that include negative numbers.

Sliding Window is ideal for finding subarrays that satisfy certain conditions based on sums or other criteria, particularly when the array consists of positive numbers, or the problem involves optimizing for the length of the subarray (e.g., finding the smallest subarray with a sum greater than a given value).

Both strategies are fundamental in algorithm design and problem-solving in coding interviews and competitive programming, offering efficient solutions for a variety of complex problems.
