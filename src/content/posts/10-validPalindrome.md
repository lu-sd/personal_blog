---
title: "Algorithm-680"
publishedAt: 2023-12-05
description: "two pointers in string"
slug: "10-validPalindrome"
isPublish: true
---

Given a string s, return true if the s can be palindrome after deleting at most one character from it.

```js
function validPalindrome(s: string): boolean {
  const len = s.length;
  let i = 0,
    j = len - 1;
  while (i < j && s[i] === s[j]) {
    i++;
    j--;
  }
  if (isvalid(s, i + 1, j)) return true;
  if (isvalid(s, i, j - 1)) return true;
  return false;
}
function isvalid(str: string, s: number, e: number): boolean {
  while (s < e) {
    if (str[s] !== str[e]) return false;
    s++;
    e--;
  }
  return true;
}
```
