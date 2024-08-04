---
title: "classic DP on Palindrome Algo-647,5,516,1312"
publishedAt: 2024-04-08
description: "palindrome Substring and Subsequence "
slug: "36-dpOnPalindrome"
isPublish: true
---

647.Palindromic Substrings
Given a string s, return the number of palindromic substrings in it.

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".

```js
function countSubstrings(s: string): number {
  const n = s.length;
  // s in [i,j] is palindromic or not
  const dp = Array.from({ length: n }, () => Array(n).fill(false));
  let res = 0;
  // form bottom to up and left to right
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] == s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
        res++;
        dp[i][j] = true;
      }
    }
  }

  return res;
}
```

5.Longest Palindromic Substring
Given a string s, return the longest palindromic substring
in s.

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

```js
function longestPalindrome(s: string): string {
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(false));
  let maxStart = 0;
  let maxEnd = 0;
  let maxLen = 1;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (s[i] == s[j] && (j - i <= 1 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
        if (j - i + 1 > maxLen) {
          maxLen = j - i + 1;
          maxStart = i;
          maxEnd = j;
        }
      }
    }
  }

  return s.slice(maxStart, maxEnd + 1);
}
```

516.Longest Palindromic Subsequence
Given a string s, find the longest palindromic subsequence's length in s.

Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".

```js
function longestPalindromeSubseq(s: string): number {
  const n = s.length;
  // dp[i][j]: The length of the longest palindromic subsequence within the range [i, j] of string s is dp[i][j]
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  // When i and j are the same, then dp[i][j] must be equal to 1, meaning: the length of a palindromic subsequence of a single character is 1.
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = 1;
  }
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
}
```

1312.Minimum Insertion Steps to Make a String Palindrome

```js
function minInsertions(s: string): number {
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i + 1][j], dp[i][j - 1]) + 1;
      }
    }
  }

  return dp[0][n - 1];
}
```
