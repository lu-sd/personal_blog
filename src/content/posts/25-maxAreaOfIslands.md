---
title: "Use DFS and BFS on Graph-695"
publishedAt: 2024-02-15
description: " mark visited node is important"
slug: "25-maxAreaOfIslands"
isPublish: true
---

695:You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

```js
function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function bfs(r: number, c: number): number {
    const queue = [[r, c]];
    grid[r][c] = 0;
    let ans = 0;

    while (queue.length > 0) {
      const [curI, curJ] = queue.shift();
      ans++;
      for (const [x, y] of dir) {
        const nr = curI + x;
        const nc = curJ + y;
        if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
        if (grid[nr][nc] === 0) continue;
        queue.push([nr, nc]);
        grid[nr][nc] = 0;
      }
    }
    return ans;
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        res = Math.max(res, bfs(i, j));
      }
    }
  }

  return res;
}
```

```js
function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  // Correct directions: up, down, left, right
  const dir = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];
  let res = 0;

  function dfs(r: number, c: number): number {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) {
      return 0;
    }

    grid[r][c] = 0; // mark as visited
    let area = 1; // current cell's area
    for (const [dx, dy] of dir) {
      area += dfs(r + dx, c + dy); // explore adjacent cells
    }
    return area;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        res = Math.max(res, dfs(i, j)); // update the maximum area found
      }
    }
  }
  return res;
}
```
