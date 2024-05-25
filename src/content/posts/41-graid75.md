---
title: "grand75-53,542"
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