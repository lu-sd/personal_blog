---
title: "Use DFS on Graph-733,200"
publishedAt: 2024-02-14
description: "dfs pay more atttention on visited node"
slug: "24-dfsInGraph"
isPublish: true
---

733:Flood Fill

```js
function floodFill(
  image: number[][],
  sr: number,
  sc: number,
  color: number
): number[][] {
  const m = image.length;
  const n = image[0].length;
  const oldColor = image[sr][sc];
  const dir = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  if (oldColor === color) return image;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (image[r][c] !== oldColor) return;

    image[r][c] = color;
    for (const [x, y] of dir) {
      dfs(r + x, c + y);
    }
  }

  dfs(sr, sc);
  return image;
}
```

200:Number of Islands

```js
function numIslands(grid: string[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dir = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  let res = 0;

  function dfs(r: number, c: number) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (grid[r][c] === "0") return;

    grid[r][c] = "0"; //mark as visited
    for (const [x, y] of dir) {
      dfs(r + x, c + y);
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        res++; // Increment for a new island
        dfs(i, j); // Start DFS from this new island
      }
    }
  }
  return res;
}
```
