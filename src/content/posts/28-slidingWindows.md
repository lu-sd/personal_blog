---
title: "sliding Window Algorithm-3,438,239,159,76"
publishedAt: 2024-02-21
description: "make use of  map,set and stack"
slug: "28-slidingWindows"
isPublish: true
---

### Using Set for Uniqueness Check

Set can track unique characters.

3:Given a string s, find the length of the longest substring without repeating characters.

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

438:Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Input: s = "abab", p = "ab"
Output: [0,1,2]

```js
function findAnagrams(original: string, check: string): number[] {
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
function findAnagrams(s: string, p: string): number[] {
  const m = s.length;
  const n = p.length;
  if (m < n) return [];

  const res = [];
  const original = new Array(26).fill(0);
  const check = new Array(26).fill(0);

  for (let i = 0; i < n; i++) {
    check[p.charCodeAt(i) - 97]++;
  }

  let l = 0;
  for (let r = 0; r < m; r++) {
    const cur_r = s.charCodeAt(r) - 97;
    original[cur_r]++;
    // Balance the window by removing characters that exceed `p`'s frequency
    while (original[cur_r] > check[cur_r]) {
      const cur_l = s.charCodeAt(l) - 97;
      original[cur_l]--;
      l++;
    }
    // Check if the current window matches the size of `p`
    if (r - l + 1 === n) {
      res.push(l);
    }
  }

  return res;
}
```

Both checkCounter and window are arrays that likely have a length of 26, assuming the task is limited to lowercase alphabetic characters. Each index in these arrays corresponds to a letter in the alphabet ('a' to 'z'), with the index determined by subtracting the char code of 'a' from the char code of the character in question. This effectively maps 'a' to index 0, 'b' to index 1, ..., 'z' to index 25.

159:
Given a string s, return the length ofthe longest substring that contains at most two distinct characters.

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

76:Given two strings s and t of lengths m and n,respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

```js
function minWindow(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return "";
  let l = 0;
  let ansL = -1;
  let ansR = s.length;
  const cntS = new Map();
  const cntT = new Map();

  for (const l of t) {
    cntT.set(l, (cntT.get(l) || 0) + 1);
  }
  s;
  function isCover() {
    for (const [c, count] of cntT.entries()) {
      if ((cntS.get(c) || 0) < count) {
        return false;
      }
    }

    return true;
  }

  for (let r = 0; r < s.length; r++) {
    cntS.set(s[r], (cntS.get(s[r]) || 0) + 1);
    while (isCover()) {
      if (r - l < ansR - ansL) {
        ansR = r;
        ansL = l;
      }
      cntS.set(s[l], cntS.get(s[l]) - 1);
      l++;
    }
  }

  return ansL === -1 ? "" : s.slice(ansL, ansR + 1);
}
```
