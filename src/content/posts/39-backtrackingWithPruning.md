---
title: "backtracking with pruning-131,93 "
publishedAt: 2024-05-01
description: "add valid function to prun"
slug: "40-backtrackingWithPruning"
isPublish: true
---

131:Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

```js
function partition(s: string): string[][] {
  const res: string[][] = [];
  const path = [];

  function dfs(start: number) {
    if (start === s.length) {
      res.push([...path]);
    }
    for (let i = start; i <= s.length; i++) {
      const pre = s.slice(start, i + 1);
      if (isP(pre)) {
        path.push(pre);
        dfs(i + 1);
        path.pop();
      }
    }
  }
  dfs(0);
  return res;
}

function isP(str: string) {
  let l = 0;
  let r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  s;

  return true;
}
```

93:Restore IP Addresses

A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.

Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]

```js
function restoreIpAddresses(s: string): string[] {
  const res = [];
  const path = [];

  function valid(str: string) {
    if (s[0] === "0" && s.length !== 1) return false;
    if (+s > 255) return false;
    return true;
  }

  function dfs(start: number) {
    if (path.length === 4 && start === s.length) {
      res.push(path.join("."));
      return;
    }

    for (let i = start; i < start + 3 && i < s.length; i++) {
      const pre = s.slice(start, i + 1);
      if (valid(pre)) {
        path.push(pre);
        dfs(i + 1);
        path.pop();
      }
    }
  }

  dfs(0);
  return res;
}
```
