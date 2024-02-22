---
title: "Using Map or Set in Sliding Window Algorithm-3,438"
publishedAt: 2024-02-21
description: "can convert O(n**2) to O(n)"
slug: "28-slidingWindows"
isPublish: true
---

### Using Set for Uniqueness Check

Suppose you want to find the longest substring without repeating characters. Here, a Set can track unique characters:

```js
function longestUniqueSubstr(s) {
  let windowChars = new Set();
  let left = 0;
  let right = 0;
  let maxLen = 0;

  while (right < s.length) {
    let c = s[right];
    // Move right pointer and update the window until a repeat character is found
    while (windowChars.has(c)) {
      windowChars.delete(s[left]);
      left++;
    }
    windowChars.add(c);
    maxLen = Math.max(maxLen, right - left + 1);
    right++;
  }

  return maxLen;
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
  let right = 0; // Sliding window pointers
  while (right < originalLen) {
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
    right++;
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
  const originalLen = original.length,
    checkLen = check.length;

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
