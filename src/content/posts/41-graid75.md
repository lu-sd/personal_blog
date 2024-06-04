---
title: "grand75-53,542,207,49,271,383,409,994,133"
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

542:Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.

```js
function updateMatrix(mat: number[][]): number[][] {
  const m = mat.length;
  const n = mat[0].length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
      } else {
        mat[i][j] = -1;
      }
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();
    for (const [r, c] of dir) {
      const nr = x + r;
      const nc = y + c;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && mat[nr][nc] === -1) {
        mat[nr][nc] = mat[x][y] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  return mat;
}
```

207:

```js
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new Map();
  for (let task = 0; task < numCourses; task++) {
    graph.set(task, []);
  }
  for (let req of prerequisites) {
    graph.get(req[1]).push(req[0]);
  }
  return check(graph);
}

function bulildInDegree(graph) {
  const inDegree = new Map();
  for (const node of graph.keys()) {
    inDegree.set(node, 0);
  }
  for (const node of graph.keys()) {
    for (const pre of graph.get(node)) {
      inDegree.set(pre, inDegree.get(pre) + 1);
    }
  }
  return inDegree;
}

function check(graph) {
  const res = [];
  const q = [];
  const inDegree = bulildInDegree(graph);
  for (const node of inDegree.keys()) {
    if (inDegree.get(node) == 0) {
      q.push(node);
    }
  }
  while (q.length > 0) {
    const node = q.shift();
    res.push(node);
    for (const neighbor of graph.get(node)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        q.push(neighbor);
      }
    }
  }
  return graph.size === res.length;
}
```

49:Group anagtams

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

```js
function groupAnagrams(strs: string[]): string[][] {
  const map: Map<string, Array<string>> = new Map();
  for (const i of strs) {
    let key = i.split("").sort().join("");

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(i);
  }
  return [...map.values()];
}
```

271:Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

```js
/**
 * Encodes a list of strings to a single string.
 */
function encode(strs: string[]): string {
  let res = "";
  for (const s of strs) {
    res += `${s.length}#${s}`;
  }
  return res;
}

/**
 * Decodes a single string to a list of strings.
 */
function decode(s: string): string[] {
  const res = [];
  let i = 0;

  while (i < s.length) {
    let j = i;

    while (s[j] !== "#") {
      j++;
    }
    let len = parseInt(s.slice(i, j), 10);
    i = j + 1;
    j = i + len;
    res.push(s.slice(i, j));
    i = j;
  }
  return res;
}
```

383:Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

```js
function canConstruct(ransomNote: string, magazine: string): boolean {
  for (const i of ransomNote) {
    if (!magazine.includes(i)) return false;
    magazine = magazine.replace(i, "");
  }

  return true;
}
// use map
function canConstruct(ransomNote: string, magazine: string): boolean {
    const map1 = new Map<string, number>();

    for (const c of magazine) {
        map1.set(c, 1 + ((map1.get(c)) ?? 0));
    }

    for (const c of ransomNote) {
        if (!map1.has(c)) {
            return false
        } else {
            map1.set(c, -1 + ((map1.get(c)) ?? 0));
            if (map1.get(c) < 0) return false;
        }
    }
    return true;

};
```

409: built longest palindrome

```js
function longestPalindrome(s: string): number {
  const set = new Set();
  let ans = 0;
  for (let l of s) {
    if (set.has(l)) {
      set.delete(l);
      ans += 2;
    } else {
      set.add(l);
    }
  }
  if (set.size > 0) ans += 1;
  return ans;
}
```

994:rotting oranges

```js
function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [];
  let fresh = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      }
      if (grid[i][j] === 1) {
        fresh++;
      }
    }
  }
  if (fresh === 0) return 0;

  let time = -1;
  while (queue.length > 0) {
    let len = queue.length;

    while (len--) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of dir) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
          if (grid[nr][nc] === 1) {
            queue.push([nr, nc]);
            grid[nr][nc] = 2;
            fresh--;
          }
        }
      }
    }
    time++;
  }

  return fresh === 0 ? time : -1;
}
```

133:clone gragh

```js
function cloneGraph(node: _Node | null): _Node | null {
  const map = new Map();

  function dfs(root: _Node | null) {
    if (root === null) return;
    if (map.has(root)) {
      return map.get(root);
    }
    const clone = new _Node(root.val, []);
    map.set(root, clone);
    for (const n of root.neighbors) {
      clone.neighbors.push(dfs(n));
    }

    return clone;
  }

  return dfs(node);
}
```
