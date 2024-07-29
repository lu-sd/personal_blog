---
title: "Use prefix sum to deal with sums related within an array-523"
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

  // can simplfied as hashMap = new Map([[0,-1]]), the reason can be found below
  for (let i = 0; i < arr.length; i++) {
    prefixSum += arr[i]; // Update the running total (prefix sum)
    // Check if the current prefix sum minus the target exists in the map
    const diff = prefixSum - target;
    if (hashMap.has(diff)) {
      // If it does, a subarray summing to target has been found
      return [hashMap.get(diff) + 1, i + 1]; // Return the indices of the subarray
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
  let hashMap = new Map();
  let prefixSum = 0;
  let count = 0; // Initialize counter for subarrays summing to target

  // Add a base case to handle sum from the start
  hashMap.set(0, 1); // There's one way to have a sum of 0 (with no elements)

  for (let i = 0; i < arr.length; i++) {
    prefixSum += arr[i]; // Update current sum
    const diff = prefixSum - target;

    if (hashMap.has(diff)) {
      count += hashMap.get(diff); // Add the number of those subarrays to count
    }

    hashMap.set(prefixSum, (hashMap.get(prefixSum) || 0) + 1);
  }

  return count; // Return the total count of subarrays summing to target
}
```

523:Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

A good subarray is a subarray where:

- its length is at least two, and
- the sum of the elements of the subarray is a multiple of k.

```js
function checkSubarraySum(nums: number[], k: number): boolean {
  const map = new Map([[0, -1]]);
  let sum = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    let rem = sum % k;

    if (map.has(rem)) {
      if (i - map.get(rem) > 1) {
        return true;
      }
    } else {
      map.set(rem, i);
    }
  }

  return false;
}
```

#### the relationship between Map and Arrray

```js
const kvArray = [
  ["key1", "value1"],
  ["key2", "value2"],
];

// Use the regular Map constructor to transform a 2D key-value Array into a map
const myMap = new Map(kvArray);

console.log(myMap.get("key1")); // "value1"

// Use Array.from() to transform a map into a 2D key-value Array
console.log(Array.from(myMap)); // Will show you exactly the same Array as kvArray

// A succinct way to do the same, using the spread syntax
console.log([...myMap]);

// Or use the keys() or values() iterators, and convert them to an array
console.log(Array.from(myMap.keys())); // ["key1", "key2"]

//
```
