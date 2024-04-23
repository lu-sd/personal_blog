---
title: "sliding Window Algorithm-3,438,239,159"
publishedAt: 2024-02-21
description: "make use of  map,set and stack"
slug: "28-slidingWindows"
isPublish: true
---

### Using Set for Uniqueness Check

Suppose you want to find the longest substring without repeating characters. Here, a Set can track unique characters:

```js
function longestUniqueSubstr(s) {
  let windowChars = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    let c = s[right];
    // Move right pointer and update the window until a repeat character is found
    while (windowChars.has(c)) {
      windowChars.delete(s[left]);
      left++;
    }
    windowChars.add(c);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

## Flexible Size Sliding Window Template - Longest

```js
function slidingWindowFlexibleLongest(input) {
    initialize window, ans
    let left = 0;
    for (let right = 0; right < input.length; right++) {
        append input[right] to window
        while (invalid(window)) {     // update left until window is valid again
            remove input[left] from window
            ++left;
        }
        ans = max(ans, window);       // window is guaranteed to be valid here
    }
    return ans;
}
```

### Using Map for Frequency Count

If you need to find the minimum window substring that contains all the characters of another string, a Map could track the frequency of characters required and seen:

```js
function findAnagrams(original, check) {
  const originalLen = original.length;
  const checkLen = check.length;

  if (originalLen < checkLen) return [];

  let result = [];
  let checkMap = new Map(); // Frequency map for 'check'
  let windowMap = new Map(); // Frequency map for the current window in 'original'

  // Initialize frequency map for 'check'
  for (let char of check) {
    checkMap.set(char, (checkMap.get(char) || 0) + 1);
  }

  let left = 0;
  // Sliding window pointers
  for (let right = 0; right < originalLen; right++) {
    let char = original[right];
    windowMap.set(char, (windowMap.get(char) || 0) + 1);
    // If the window size matches 'check' length, start checking for anagram
    if (right - left + 1 === checkLen) {
      if (compareMaps(checkMap, windowMap)) {
        result.push(left);
      }
      // Move the window: remove the leftmost character from the windowMap
      let leftChar = original[left];
      if (windowMap.get(leftChar) === 1) {
        windowMap.delete(leftChar);
      } else {
        windowMap.set(leftChar, windowMap.get(leftChar) - 1);
      }
      left++; // Slide the window to the right
    }
  }

  return result;
}
// Helper function to compare two maps
function compareMaps(map1, map2) {
  if (map1.size !== map2.size) return false;
  for (let [key, val] of map1) {
    if (!map2.has(key) || map2.get(key) !== val) {
      return false;
    }
  }
  return true;
}
```

There is anther methods using String.charCodeAt()

```js
function findAnagrams(original: string, check: string): number[] {
  const originalLen = original.length;
  const checkLen = check.length;

  if (originalLen < checkLen) return [];

  const res = [];
  const checkCounter = Array(26).fill(0);
  const window = Array(26).fill(0);
  const a = "a".charCodeAt(0);

  for (let i = 0; i < checkLen; i++) {
    checkCounter[check.charCodeAt(i) - a]++;
    window[original.charCodeAt(i) - a]++;
  }

  if (equals(window, checkCounter)) res.push(0);

  for (let i = checkLen; i < originalLen; i++) {
    window[original.charCodeAt(i - checkLen) - a]--;
    window[original.charCodeAt(i) - a]++;
    if (equals(window, checkCounter)) res.push(i - checkLen + 1);
  }
  return res;
}
function equals(arr1: number[], arr2: number[]) {
  return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i]);
}
```

Both checkCounter and window are arrays that likely have a length of 26, assuming the task is limited to lowercase alphabetic characters. Each index in these arrays corresponds to a letter in the alphabet ('a' to 'z'), with the index determined by subtracting the char code of 'a' from the char code of the character in question. This effectively maps 'a' to index 0, 'b' to index 1, ..., 'z' to index 25.

159:
Given a string s, return the length of the longest substring that contains at most two distinct characters.

Input: s = "ccaabbb"
Output: 5
Explanation: The substring is "aabbb" which its length is 5.

```js
function lengthOfLongestSubstringTwoDistinct(s: string): number {
    // This will store the counts of characters within the current window
    let map = new Map<string, number>();

    let left: number = 0;
    let maxLen: number = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        map.set(rightChar, (map.get(rightChar) || 0) + 1);

        // When we have more than two distinct characters
        while (map.size > 2) {
            const leftChar = s[left];
            const count = map.get(leftChar);
            if (count === 1) {
                map.delete(leftChar);
            } else {
                map.set(leftChar, count - 1);
            }
            left++;
        }

        // Calculate the max length of the window
        maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
};
```

239:You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

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
